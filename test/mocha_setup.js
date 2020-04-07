import  "../node_modules/chai/chai.js"; 
import   "../node_modules/mocha/mocha.js"; 

// here do the asserts imports
import test from './test.js';

mocha.setup('bdd');

// here run asserts
test();

mocha.checkLeaks();
mocha.run();
