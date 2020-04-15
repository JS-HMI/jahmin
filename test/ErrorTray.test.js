import {ErrorTray} from '../dist/ErrorTray.js'
import { systemError } from '../dist/Types.js';

localStorage.clear();

var er = new ErrorTray("err");

var e0 = new systemError("sys","ERR0","T0", "A0");
e0.message = "Ciao"
var e1 = new systemError("sys","ERR1","T0", "A0");

test('Init',()=>{
    expect(localStorage.getItem('err')).not.toBeNull();
    er.Create(e0);
    expect(er.GetAll().length).toBe(1);
    er.Create(e1);
    expect(er.GetAll()[0]).toEqual(e0);
    expect(er.GetAll()[1]).toEqual(e1);
})

test('Ack', ()=>{

    let unack = er.GetUnack();
    expect(unack).toEqual(er.GetAll());
    er.Acknoweldge(0)
    expect(er.GetUnack()).toEqual([e1]);
    expect(()=>{er.Acknoweldge(2)}).toThrow();
})

test('Clean', async ()=>{
    er.CleanAll();
    expect(er.GetAll().length).toEqual(0);

    er.Create(e0);
    expect(er.GetAll().length).toEqual(1);
    er.setSwipeInterval(1);
    er.errorExpiry_days = 0;
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(er.GetAll().length).toEqual(0);
})