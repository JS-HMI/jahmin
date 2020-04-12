import {dataManager} from '../build/DataManager.js'
import {JsonPollEngine} from '../build/JsonPollEngine.js'

export default function(){
    let engine = new JsonPollEngine("test_sys")
    dataManager.AddEngine("test_sys",engine);

    for(let i=0; i<10; i++){
        dataManager.Subscribe({ system:"test_sys", name:"vvv"+i})
    }
}
