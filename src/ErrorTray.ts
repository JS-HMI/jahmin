import {StateVariable} from 'impera-js'
import { systemError, systemAlarm } from './Types.js';
import {escape as htmlEscape} from 'html-escaper'

export class ErrorTray extends StateVariable{

    errorExpiry_days: number
    swipe_interval_ID  : number

    constructor(name:string){
        super(name,[]);

        this.errorExpiry_days = 7;
        this.addTransition("create",this._create);
        this.addTransition("ack",this._ack);
        this.addTransition("clean",this._cleanup);

        this.swipe_interval_ID = setInterval(()=>{ this.applyTransition("clean"); }, 10000);
    }

    GetAll(){
        return this.value ; 
    }

    setSwipeInterval(interval_ms:number){
        clearInterval(this.swipe_interval_ID);
        this.swipe_interval_ID = setInterval(()=>{ this.applyTransition("clean"); }, interval_ms);
    }

    Create(error:systemError){
        if(!(error instanceof systemError))throw TypeError("input must be a 'systemError' instance.");
        this.applyTransition("create", error);
    }
    _create(error:systemError){
        let err = {
            code          :    htmlEscape(error.code),
            message       :    htmlEscape(error.message),
            systemName    :    htmlEscape(error.systemName),
            targetName    :    htmlEscape(error.targetName),
            action        :    htmlEscape(error.action),
            timestamp_ms  :    error.timestamp_ms,
            ack           :    error.ack
        };
        this.value.push(err);
    }

    Acknoweldge(ID:number){
        this.applyTransition("ack",ID);
    }

    _ack(ID:number){
        let idx = this.value[ID];
        if(!idx) throw Error(`Error ID '${ID}' does not exist`);
        idx.ack = true;
    }

    GetUnack():systemError[]{
        return this.value.filter( (err:systemError)=>{ return !err.ack } );
    }
    
    CleanAll(){
        this.applyTransition("clean",true);
    }

    _cleanup(cleanAll:boolean){

        if(this.value.lenght === 0) return;
        if(cleanAll) {
            this.value = [];
            return;
        }

        let day_in_ms = 86400000;
        let filtered_errors:systemError[] = this.value.filter(
            (err:systemError)=>{ 
                return (err.timestamp_ms + day_in_ms * this.errorExpiry_days) > Date.now();
        });
        if( filtered_errors.length < this.value.length ) this.value = filtered_errors;
    }
}

// fix
export class AlarmTray extends ErrorTray {
    
    Create(alarm:systemAlarm){
        if(!(alarm instanceof systemAlarm))throw TypeError("input must be a 'systemAlarm' instance.");
        this.applyTransition("create", alarm);
    }

    _create(alarm:systemAlarm){
        let err = {
            code       :    htmlEscape(alarm.code),
            message    :    htmlEscape(alarm.message),
            systemName :    htmlEscape(alarm.systemName),
            targetName :    htmlEscape(alarm.targetName),
            action     :    htmlEscape(alarm.action),
            timestamp_ms  :    alarm.timestamp_ms,
            ack        :    alarm.ack,
            isActive   :    alarm.isActive
        };
        this.value.push(err);
    }

    UpdateOrCreate(){
        // check if an alarm exist and updates it if not create new.
        // update:
        // - if isActive === newIsActive considered same alarm, do nothing
        // - if is active goes down for more than 3 cycles -> and then goes up again consider it new alarm
        // - if is ack don't pop it up again

        // this needs a new transition
    }
    GetActiveAlarms(){

    }

}