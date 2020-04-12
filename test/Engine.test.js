import {JsonPollEngine, dataManager} from '../dist/jashmi.js'
import {LitElement} from 'lit-element'

test('start', async ()=>{
    let engine = new JsonPollEngine("test_sys")
    dataManager.AddEngine("test_sys",engine);

    for(let i=0; i<10; i++){
        dataManager.Subscribe({ system:"test_sys", name:"vvv"+i})
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(engine.sub_cache.size).toBe(0);
    expect(Object.keys(engine.subs_count).length).toBe(10);
    expect(localStorage.getItem("datatree")).not.toBeNull();
    console.log(localStorage.getItem("datatree"));

    class t extends LitElement{
        connectedCallback(){
            super.connectedCallback();
            console.log("connected");
        }
    }
    window.customElements.define("x-t",t);

    let el = document.createElement("x-t");
    document.body.append(el);
    await new Promise(resolve => setTimeout(resolve, 100));

})

