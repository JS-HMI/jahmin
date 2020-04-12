var JsonPollEngine = jashmi.JsonPollEngine;
var dataManager = jashmi.dataManager;
//import {JsonPollEngine} from '../dist/JsonPollEngine.js'
//import {dataManager} from '../dist/DataManager.js'

export default function(){

describe('JSON Poll Engine',()=>{

    it('Subscribe',async ()=>{

        let engine = new JsonPollEngine("test_sys")
        dataManager.AddEngine("test_sys",engine);
    
        for(let i=0; i<10; i++){
            dataManager.Subscribe({ system:"test_sys", name:"vvv"+i})
        }
        await new Promise(r => setTimeout(r, 20));
        
        chai.assert.equal(engine.sub_cache.size, 0,"Should be cleaerd");
        chai.assert.equal(Object.keys(engine.subs_count).length, 10,"Should be subscribed");
    })

});
   

}
