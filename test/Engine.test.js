 // import {jashmi} from '../build/main.js'

export default function(){
    let engine = new jashmi.JsonPollEngine("test_sys")
    jashmi.dataManager.AddEngine("test_sys",engine);

    for(let i=0; i<10; i++){
        jashmi.dataManager.Subscribe({ system:"test_sys", name:"vvv"+i})
    }
}
