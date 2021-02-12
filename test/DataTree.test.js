import {DataTree} from '../dist/DataModels/DataTree.js'
import { expect } from '@esm-bundle/chai';

describe('Data Tree',()=>{
    localStorage.clear();
    var dt = new DataTree();
    var v0 = {name:"walla", system:"halla"};

    it('init',()=>{
        expect(localStorage.getItem("datatree")).not.null;
    })
    it('Create',async ()=>{

        dt.Create(v0);
        let v = dt.GetVar(v0) ;
        expect(v).to.deep.equal( {status:"PENDING", value: null });

    })

    it('Update',()=>{
        dt.Update( {name:"walla", status:"SUB", value: 7, system:"halla" } );
        let v = dt.GetVar(v0) ;
        expect(v).to.deep.equal( { status:"SUB", value: 7 });

        expect(()=>{dt.Update({name:89, status:"SUB", value: 7, system:"halla" } );}).to.throw()
        expect(()=>{dt.Update({name:"walla", status:"SUB", value: 7, system:"hal" } );}).to.throw()

    })

    it('Update Status',()=>{
        dt.UpdateStatus(v0, "GOT");
        let v = dt.GetVar(v0) ;
        expect(v).to.deep.equal( { status:"GOT", value: 7 });
    })

})
