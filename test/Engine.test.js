import {JsonPollEngine, Manager} from '../dist/jashmi.js'
import {VarStatusCodes, ServiceStatusCodes,ErrorCodes} from '../dist/Types.js'
//import { enableFetchMocks, FetchMock } from 'jest-fetch-mock'
//enableFetchMocks()
var fetch_mock = require('jest-fetch-mock');
fetch_mock.enableFetchMocks();



localStorage.clear();
let engine = new JsonPollEngine("test_sys",{})
engine.status = ServiceStatusCodes.Ready;
Manager.AddEngine(engine);
let v0 = {system:"test_sys", name:"var"} ;
let v1 = {system:"test_sys", name:"vario"} ;


test('Post function',async()=>{
    // ok
    fetch_mock.mockResponseOnce( JSON.stringify({ciao:2}), {status:200});
    var p = await engine.postData("ciao",{ciao:1});
    expect(p).toEqual({success:true, data:{ciao:2}});
    
    // invalid JSON
    fetch_mock.mockResponseOnce( "{ciao:2}", {status:200});
    p = await engine.postData("ciao",{ciao:1});
    expect(p).toEqual({success:false, data:null, error:{code : ErrorCodes.BadValue, message : "Failed to parse JSON response"}});

    // 404
    fetch_mock.mockResponseOnce( "{ciao:2}", {status:404});
    p = await engine.postData("ciao",{ciao:1});
    expect(p).toEqual({success:false, data:null, error:{code : ErrorCodes.BadValue, message : "Url '/ciao' not found "}});
    
    // 403
    fetch_mock.mockResponseOnce( "{ciao:2}", {status:403});
    p = await engine.postData("ciao",{ciao:1});
    expect(p).toEqual({success:false, data:null, error:{code : ErrorCodes.Unauthorized, message : "Unauthoriazed request."}});
});


test('Subscribe New Variable', async ()=>{
    Manager.Subscribe(v0);
    Manager.Subscribe(v0);
    Manager.Subscribe(v1);

    let v = Manager.dataTree.GetVar(v0);
    expect(v).toBeNull();  // Manager not ready

    Manager.Init();
    await new Promise(resolve => setTimeout(resolve, 0));
    v = Manager.dataTree.GetVar(v0);
    expect(v).toEqual({name:"var", value:null, status:VarStatusCodes.Pending})

    await new Promise(resolve => setTimeout(resolve, 20));
    expect(engine.toBeSubscribed.size).toBe(0);  // subscribe list is flushed
    expect(Array.from(engine.subscribedVar.keys()).length).toBe(2); // only submits unique variables
    expect(engine.subscribedVar.get(v0.name)).toBe(2)
    
    expect(v).toEqual({name:"var", value:null, status:VarStatusCodes.Subscribed})
})

test('Unsubscribe', async ()=>{
    await Manager.Unsubscribe(v0);
    await Manager.Unsubscribe(v0); // double call should not have effect
    await Manager.Unsubscribe(v1);
    
    let v = Manager.dataTree.GetVar(v0);
    let _v = Manager.dataTree.GetVar(v1);

    expect(engine.toBeUnsubscribed.size).toBe(2)
    expect(engine.subscribedVar.get(v0.name)).toBe(1);
    expect(v.status).toEqual(VarStatusCodes.Subscribed);
    expect(_v.status).toEqual(VarStatusCodes.Subscribed);
    
    await new Promise(resolve => setTimeout(resolve, 20));
    expect(engine.subscribedVar.get(v0.name)).toBeUndefined();
    expect(engine.toBeUnsubscribed.size).toBe(0)
    expect(v.status).toBe(VarStatusCodes.Unsubscribed);
    expect(_v.status).toBe(VarStatusCodes.Unsubscribed);

})

