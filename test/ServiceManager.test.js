import {ServiceManager} from "../dist/ServiceManager.js"
import {fakeDataEngine} from "../dist/Engines/fakeDataEngine.js"
import { expect } from '@esm-bundle/chai';

describe("Service Manager",()=>{
    var manager = new ServiceManager();
    var engine1 = new fakeDataEngine("e1");
    var engine2 = new fakeDataEngine("e2");

    before(()=>{
        localStorage.clear();
    });
    after(()=>{
        localStorage.clear();
    });

    it("It Exists",()=>{
        expect(manager).not.to.be.null
        expect(engine1).not.to.be.null
        expect(engine2).not.to.be.null
    });

    it("Add Engines",async ()=>{
        manager.AddEngine(engine1);
        manager.AddEngine(engine2);
        manager.SetDefaultEngine(engine1);
        expect(manager.dataEngines.size).to.equal(2);
        expect(manager.GetEngine("e1")).to.deep.equal(engine1);
        expect(manager.GetEngine("e2")).to.deep.equal(engine2);
    });

    it("Init",async ()=>{
        await manager.Init();
        expect(await manager.isInitialized()).to.be.true
    })

    it("Subscribe",async ()=>{
        await manager.Subscribe("e2",{name:"test1", system:"default"});
        await wait(1000);
        expect(engine2.subscribedVar.get("default:test1")).equal(1);
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