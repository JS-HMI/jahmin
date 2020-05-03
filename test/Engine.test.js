import {Manager} from '../dist/ServiceManager.js'
import {JsonPollEngine} from '../dist/JsonPollEngine.js'
import {VarStatusCodes, ServiceStatusCodes,ErrorCodes, VarResponse} from '../dist/Types.js'
var fetch_mock = require('jest-fetch-mock');
fetch_mock.enableFetchMocks();



localStorage.clear();
let engine = new JsonPollEngine("test_sys",{})
engine.status = ServiceStatusCodes.Ready;
Manager.AddEngine(engine);
let v0 = {system:"k", name:"var"} ;
let v1 = {system:"k", name:"vario"} ;


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
    expect(p).toEqual({success:false, data:null, error:{code : ErrorCodes.NotFound, message : "Url '/ciao' not found "}});
    
    // 403
    fetch_mock.mockResponseOnce( "{ciao:2}", {status:403});
    p = await engine.postData("ciao",{ciao:1});
    expect(p).toEqual({success:false, data:null, error:{code : ErrorCodes.Unauthorized, message : "Unauthoriazed request."}});

});


test('Pack Data', ()=>{
    expect(engine.packReadData([{name:'a',system:"k"},{name:'b',system:"k"},{name:'c',system:"k"}])).toEqual({names:['a','b','c']});
    expect(engine.packWriteData([{name:'a',system:"k"}], [7])).toEqual({names:['a'], values:[7]});
})

test('Unpack Data Read', ()=>{
    let resp_success = 
    {
        success:true,
        data : [
            {
                Success: true,
                ErrorCode : "",
                Name : "myName",
                Value : 7, 
                Type: "double", 
                Timestamp_ms : Date.now(), 
                Timestamp: new Date().toDateString()
            }
        ]
    }
    let request = [{name:'myName',system:"k"}]
    //let payload = engine.packReadData(request);

    let resp = engine.unpackReadData(resp_success,request);
    expect(resp).toEqual( [{name:"myName", value:7, success:true, error:null, system:"k"}] );

    let resp_fail = { success: false, data:null, error: {code : ErrorCodes.Unauthorized, message : "Unauthoriazed request."}}
    resp = engine.unpackReadData(resp_fail,request);
    expect(resp).toEqual( [{name:"myName", value:null, system:"k", success:false, error:{code : ErrorCodes.Unauthorized, message : "Unauthoriazed request."}}] )
});

test('Unpack Data Write', ()=>{
    let resp_succes = {
        success : true,
        data : [
            {
                Name : "Myvar",
                Value : 90,
                Success : true,
                ErrorCode : "" 
    }]}
    
    let req =  [{name:'myName',system:"k"}] ;//engine.packWriteData(["Myvar"],[90]);
    let resp =  engine.unpackWriteData(resp_succes,req);
    expect(resp).toEqual([new VarResponse(true,"Myvar","k",90)]);
    
    let resp_fail = {
        success : true,
        data : [
            {    
                Name : "Myvar",
                Value : null,
                Success : false,
                ErrorCode : ErrorCodes.BadValue 
            }]}
    resp =  engine.unpackWriteData(resp_fail,req);
    let var_resp = new VarResponse(false,"Myvar","k", null);
    var_resp.setError(ErrorCodes.BadValue);
    expect(resp).toEqual([var_resp]);
})


test('Subscribe New Variable', async ()=>{
    Manager.Subscribe("test_sys",v0);
    Manager.Subscribe("test_sys",v0);
    Manager.Subscribe("test_sys",v1);
        
    fetch_mock.mockResponseOnce( async()=>{
        await new Promise(resolve => setTimeout(resolve, 5));
        return JSON.stringify([{
            Success: true,
            ErrorCode : "",
            Name : "var",
            Value : 7, 
            Type: "double", 
            Timestamp_ms : Date.now(), 
            Timestamp: new Date().toDateString()
        },{
            Success: true,
            ErrorCode : "",
            Name : "vario",
            Value : 7, 
            Type: "double", 
            Timestamp_ms : Date.now(), 
            Timestamp: new Date().toDateString()
        }]);
    });

    let v = Manager.dataTree.GetVar(v0);
    expect(v).toBeNull();  // Manager not ready

    Manager.Init();
    await new Promise(resolve => setTimeout(resolve, 0));
    v = Manager.dataTree.GetVar(v0);
    expect(v).toEqual({value:null, status:VarStatusCodes.Pending})

    await new Promise(resolve => setTimeout(resolve, 20));
    expect(engine.toBeSubscribed.size).toBe(0);  // subscribe list is flushed
    expect(Array.from(engine.subscribedVar.keys()).length).toBe(2); // only submits unique variables
    expect(engine.subscribedVar.get(v0.system + ":"+ v0.name)).toBe(2)
    
    expect(v).toEqual({ value:7, status:VarStatusCodes.Subscribed})
})


test('UpdateVar under Read',async ()=>{
     // var not exist case
     fetch_mock.mockResponseOnce( async()=>{
        return JSON.stringify([{
            Success: false,
            ErrorCode : ErrorCodes.VarNotExist,
            Name : "var",
            Value : null, 
            Type: "", 
            Timestamp_ms : null, 
            Timestamp: null
        }]);
    });
    let resp = await Manager.Read("test_sys",[{name:"var",system:"k"}]);
    let v = Manager.dataTree.GetVar(v0);
    let temp_v = new VarResponse(false,"var","k",null);
    temp_v.setError(ErrorCodes.VarNotExist);
    expect(resp).toEqual([temp_v]);
    expect(v).toEqual({value:7,  status:VarStatusCodes.Error});

    // var exist
    fetch_mock.mockResponseOnce( async()=>{
        return JSON.stringify([{
            Success: true,
            ErrorCode : "",
            Name : "var",
            Value : 10, 
            Type: "double", 
            Timestamp_ms : Date.now(), 
            Timestamp: new Date().toDateString()
        }]);
    });
    resp = await Manager.Read("test_sys",[{name:"var",system:"k"}]);
    expect(resp).toEqual([new VarResponse(true,"var","k",10)]);
    // var gets written
    expect(v).toEqual({ value:10, status:VarStatusCodes.Subscribed});
})


test('UpdateVar under Write',async ()=>{
    // var not exist case
    fetch_mock.mockResponseOnce( async()=>{
       await new Promise(resolve => setTimeout(resolve, 10));
       return JSON.stringify([{
            Name : "var",
            Value : 90,
            Success : true,
            ErrorCode : "" 
        }]);
   });
    
   Manager.Write("test_sys",[{name:"var",system:"k"}],[90])
    .then((resp)=>{
        expect(resp).toEqual([new VarResponse(true,"var","k",90)]);
    });
    await new Promise(resolve => setTimeout(resolve, 0));
   let v = Manager.dataTree.GetVar(v0);
   expect(v).toEqual({value:10, status:VarStatusCodes.Pending});
   await new Promise(resolve => setTimeout(resolve, 20));
   expect(v).toEqual({ value:90, status:VarStatusCodes.Subscribed});

})

test('Read Interval', async()=>{
    // var exist
    fetch_mock.mockResponseOnce( async(req)=>{
        
        let js = JSON.parse(req.body.toString('utf-8'));
        expect(js).toEqual({names:["var","vario"]});

        return JSON.stringify([{
            Success: true,
            ErrorCode : "",
            Name : "var",
            Value : 11, 
            Type: "double", 
            Timestamp_ms : Date.now(), 
            Timestamp: new Date().toDateString()
        },
        {
            Success: true,
            ErrorCode : "",
            Name : "vario",
            Value : 110, 
            Type: "double", 
            Timestamp_ms : Date.now(), 
            Timestamp: new Date().toDateString()
        }]);
    });
    await engine._read_in_intervals();
    let v = Manager.dataTree.GetVar(v0);
    let vv = Manager.dataTree.GetVar(v1);
    expect(v).toEqual({ value:11, status:VarStatusCodes.Subscribed});
    expect(vv).toEqual({value:110, status:VarStatusCodes.Subscribed});

});


test('Unsubscribe', async ()=>{
    await Manager.Unsubscribe("test_sys",v0);
    await Manager.Unsubscribe("test_sys",v0); // double call should not have effect
    await Manager.Unsubscribe("test_sys",v1);
    
    let v = Manager.dataTree.GetVar(v0);
    let _v = Manager.dataTree.GetVar(v1);

    expect(engine.toBeUnsubscribed.size).toBe(2)
    expect(engine.subscribedVar.get(v0.system+":"+v0.name)).toBe(1);
    expect(v.status).toEqual(VarStatusCodes.Subscribed);
    expect(_v.status).toEqual(VarStatusCodes.Subscribed);
    
    await new Promise(resolve => setTimeout(resolve, 20));
    expect(engine.subscribedVar.get(v0.system+":"+v0.name)).toBeUndefined();
    expect(engine.toBeUnsubscribed.size).toBe(0)
    expect(v.status).toBe(VarStatusCodes.Unsubscribed);
    expect(_v.status).toBe(VarStatusCodes.Unsubscribed);

})


