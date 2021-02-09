import {ServiceManager} from "../dist/ServiceManager.js"
import {fakeDataEngine} from "../dist/Engines/fakeDataEngine.js"

describe("Service Manager",()=>{
    var manager = new ServiceManager();
    var engine1 = new fakeDataEngine("e1");
    var engine2 = new fakeDataEngine("e2");

    beforeAll(()=>{
        localStorage.clear();
    });
    afterAll(()=>{
        localStorage.clear();
    });

    test("It Exists",()=>{
        expect(manager).not.toBeNull
        expect(engine1).not.toBeNull
        expect(engine2).not.toBeNull
    });

    test("Add Engines",async ()=>{
        manager.AddEngine(engine1);
        manager.AddEngine(engine2);
        manager.SetDefaultEngine(engine1);
        expect(manager.dataEngines.size).toEqual(2);
        expect(manager.GetEngine("e1")).toEqual(engine1);
        expect(manager.GetEngine("e2")).toEqual(engine2);
    });

    test("Init",async ()=>{
        await manager.Init();
        expect(await manager.isInitialized()).toBeTruthy
    })

    test("Subscribe",async ()=>{
        await manager.Subscribe("e2",{name:"test1", system:"default"});
        await wait(1000);
        expect(engine2.subscribedVar.get("default:test1")).toEqual(1);
    });


});

async function wait(time)
{
    var p = new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        },time)
    })
    return p;
}