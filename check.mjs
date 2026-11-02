import test from 'node:test';
import assert from 'node:assert/strict';
import {easeLayer} from './app/motion.mjs';
test('ingredients arrive in order and stop at their final positions',()=>{for(let i=0;i<6;i++){assert.equal(easeLayer(0,i),0);assert.equal(easeLayer(1,i),1);let previous=0;for(let p=0;p<=1;p+=.01){const value=easeLayer(p,i);assert.ok(value>=previous&&value<=1);if(i>0)assert.ok(value<=easeLayer(p,i-1));previous=value}}});
