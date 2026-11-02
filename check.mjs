import test from 'node:test';
import assert from 'node:assert/strict';
import {easeLayer,follow} from './app/motion.mjs';
test('ingredients arrive in order and stop at their final positions',()=>{for(let i=0;i<6;i++){assert.equal(easeLayer(0,i),0);assert.equal(easeLayer(1,i),1);let previous=0;for(let p=0;p<=1;p+=.01){const value=easeLayer(p,i);assert.ok(value>=previous&&value<=1);if(i>0)assert.ok(value<=easeLayer(p,i-1));previous=value}}});
test('smoothing is consistent across refresh rates and converges without overshoot',()=>{let a=0,b=0;for(let i=0;i<60;i++)a=follow(a,1,1000/60);for(let i=0;i<120;i++)b=follow(b,1,1000/120);assert.ok(Math.abs(a-b)<1e-10);assert.ok(a>.97&&a<1);assert.ok(follow(.5,0,16)>0);assert.equal(follow(.5,1,0),.5)});
test('reduced motion preserves scroll position instead of completing the sandwich',()=>{for(const p of [0,.1,.3,.5,.8,1]){const current=follow(1,p,16,true);assert.equal(current,p);if(p<5/6)assert.equal(easeLayer(current,5),0)}assert.equal(easeLayer(follow(1,0,16,true),0),0)});
