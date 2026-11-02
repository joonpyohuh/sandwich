import test from 'node:test';
import assert from 'node:assert/strict';
import {easeLayer} from './app/motion.mjs';
test('ingredients arrive in order and stop at their final positions',()=>{for(let i=0;i<6;i++){assert.equal(easeLayer(0,i),0);assert.equal(easeLayer(1,i),1);let previous=0;for(let p=0;p<=1;p+=.01){const value=easeLayer(p,i);assert.ok(value>=previous&&value<=1);if(i>0)assert.ok(value<=easeLayer(p,i-1));previous=value}}});
import {follow,scrollProgress} from './app/motion.mjs';
test('scroll starts empty, progresses through the recipe, and finishes at the end',()=>{assert.equal(scrollProgress(1000,4000,900),0);assert.ok(scrollProgress(-1000,4000,900)>.4);assert.equal(scrollProgress(-4000,4000,900),1);assert.ok(follow(0,1,16)>0&&follow(0,1,16)<.1);assert.ok(follow(1,0,16)<1);let p=0;for(let i=0;i<180;i++)p=follow(p,1,16);assert.ok(p>.999)});
