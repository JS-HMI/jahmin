import {JsonPollEngine, Manager} from '../dist/jashmi.js'
import {VarStatusCodes} from '../dist/Types.js'


beforeEach(()=>{
    localStorage.clear();
})

test('Subscribe New Variable', async ()=>{
    let engine = new JsonPollEngine("test_sys")
    Manager.AddEngine("test_sys",engine);
    let v0 = {system:"test_sys", name:"var"} ;
    let v1 = {system:"test_sys", name:"vario"} ;
    Manager.Subscribe(v0);
    Manager.Subscribe(v0);
    Manager.Subscribe(v1);
    let v = Manager.dataTree.GetVar(v0);
    
    // new var created 
    expect(v).toEqual({name:"var", value:null, status:VarStatusCodes.Pending})
    await new Promise(resolve => setTimeout(resolve, 20));
    expect(engine.sub_cache.size).toBe(0);
    expect(Object.keys(engine.subs_count).length).toBe(2); // only submits unique variables
    
    v = Manager.dataTree.GetVar(v0);
    expect(v).toEqual({name:"var", value:null, status:VarStatusCodes.Subscribed})
})

