import {DataTree} from '../dist/DataTree.js'


describe('Data Tree',()=>{
    localStorage.clear();
    var dt = new DataTree();
    var v0 = {name:"walla", system:"halla"};

    test('init',()=>{
        expect(localStorage.getItem("datatree")).not.toBeNull();
    })
    test('Create',async ()=>{

        dt.Create(v0);
        let v = dt.GetVar(v0) ;
        expect(v).toEqual( {name:"walla", status:"PENDING", value: null });

    })

    test('Update',()=>{
        dt.Update("halla", {name:"walla", status:"SUB", value: 7 } );
        let v = dt.GetVar(v0) ;
        expect(v).toEqual( {name:"walla", status:"SUB", value: 7 });

        expect(()=>{dt.Update("halla", {name:89, status:"SUB", value: 7 } );}).toThrow()
        expect(()=>{dt.Update("hall", {name:"walla", status:"SUB", value: 7 } );}).toThrow()

    })

    test('Update Status',()=>{
        dt.UpdateStatus(v0, "GOT");
        let v = dt.GetVar(v0) ;
        expect(v).toEqual( {name:"walla", status:"GOT", value: 7 });
    })

})
