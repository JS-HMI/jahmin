import {ErrorTray} from '../dist/DataModels/ErrorTray.js'
import { systemError } from '../dist/DataModels/Types.js';
import { expect } from '@esm-bundle/chai';

localStorage.clear();

var er = new ErrorTray("err");

var e0 = new systemError("sys","ERR0","T0", "A0");
e0.message = "Ciao"
var e1 = new systemError("sys","ERR1","T0", "A0");
describe("Error Tray",()=>{
it('Init',()=>{
    expect(localStorage.getItem('err')).not.null;
    er.Create(e0);
    expect(er.GetAll().length).equal(1);
    er.Create(e1);
    expect(er.GetAll()[0]).deep.equal(e0);
    expect(er.GetAll()[1]).deep.equal(e1);
})

it('Ack', ()=>{

    let unack = er.GetUnack();
    expect(unack).to.deep.equal(er.GetAll());
    er.Acknoweldge(0)
    expect(er.GetUnack()).to.deep.equal([e1]);
    expect(()=>{er.Acknoweldge(2)}).to.throw();
})

it('Clean', async ()=>{
    er.CleanAll();
    expect(er.GetAll().length).to.deep.equal(0);

    er.Create(e0);
    expect(er.GetAll().length).to.deep.equal(1);
    er.setSwipeInterval(1);
    er.errorExpiry_days = 0;
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(er.GetAll().length).to.deep.equal(0);
})
})