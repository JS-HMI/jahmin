import {DataTree} from '../dist/DataModels/DataTree.js'


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
        expect(v).toEqual( {status:"PENDING", value: null });

    })

    test('Update',()=>{
        dt.Update( {name:"walla", status:"SUB", value: 7, system:"halla" } );
        let v = dt.GetVar(v0) ;
        expect(v).toEqual( { status:"SUB", value: 7 });

        expect(()=>{dt.Update({name:89, status:"SUB", value: 7, system:"halla" } );}).toThrow()
        expect(()=>{dt.Update({name:"walla", status:"SUB", value: 7, system:"hal" } );}).toThrow()

    })

    test('Update Status',()=>{
        dt.UpdateStatus(v0, "GOT");
        let v = dt.GetVar(v0) ;
        expect(v).toEqual( { status:"GOT", value: 7 });
    })

})
