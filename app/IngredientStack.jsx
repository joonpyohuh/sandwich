'use client';
import {useState} from 'react';
import {motion,AnimatePresence,useScroll,useSpring,useTransform,useReducedMotion,useMotionValueEvent} from 'framer-motion';
import {clamp,easeLayer} from './motion.mjs';
const ingredients = [
  ['HANDMADE BREAD / 수제 빵', <><path fill="#dfa04f" d="M25 47Q150 20 275 47L265 77Q150 108 35 77Z"/><path fill="#fff0ce" d="M25 47Q150 20 275 47Q150 80 25 47Z"/></>],
  ['GREENS / 채소', <><path fill="#508b3d" d="M17 54Q22 21 52 39Q72 10 98 35Q120 15 145 35Q180 8 200 34Q231 14 250 39Q282 24 285 54L265 76Q239 62 214 79Q189 64 165 79Q130 65 108 80Q77 64 52 77Z"/><path fill="none" stroke="#286537" d="M42 53Q150 81 260 49"/></>],
  ['TOMATO / 토마토', <><ellipse fill="#ce322a" cx="90" cy="58" rx="70" ry="25"/><ellipse fill="#ee5e42" cx="90" cy="50" rx="68" ry="21"/><ellipse fill="#ce322a" cx="211" cy="62" rx="69" ry="25"/><ellipse fill="#ee5e42" cx="211" cy="54" rx="67" ry="21"/><path fill="none" stroke="#ffca83" strokeWidth="4" d="m53 46 25 8m25 -13 13 12m64 -3 20 8m24 -9 15 8"/></>],
  ['CHEESE / 치즈', <><path fill="#edb63c" d="m22 45 187 -15 72 26 -68 34 -36 -13 -39 18 -44 -23 -49 5Z"/><path fill="none" stroke="#ffdb77" d="m40 45 161 -10 50 19"/></>],
  ['HAM / 햄', <><path fill="#d87a73" d="M23 45Q59 17 92 43Q124 65 153 38Q185 15 216 41Q248 65 277 39L276 65Q240 92 208 66Q174 43 146 69Q115 91 81 67Q46 44 23 71Z"/><path fill="none" stroke="#ffd0b1" strokeWidth="5" d="M30 49Q58 29 91 51Q121 76 153 49Q185 27 216 52Q245 75 270 49"/></>],
  ['TOP BREAD / 완성!', <><path fill="#e9ad57" d="M22 66Q22 22 72 24Q107 3 151 17Q201 5 226 30Q277 25 278 66L265 86Q151 112 35 86Z"/><path fill="#fff0cf" d="M24 64Q150 91 277 64L265 86Q151 112 35 86Z"/><path fill="none" stroke="#b77532" strokeWidth="4" d="m64 43 15 -7m39 4 14 -8m46 13 14 -8m34 15 12 -5"/><g fill="#173f2b" stroke="none"><ellipse cx="124" cy="79" rx="4" ry="5"/><ellipse cx="175" cy="79" rx="4" ry="5"/></g><path fill="none" d="M141 81q9 11 18 0"/></>]
];
function Layer({index,progress,shape}){
const eased=useTransform(progress,v=>easeLayer(v,index));
const x=useTransform(eased,t=>(1-t)*(index%2?55:-55));
const y=useTransform(eased,t=>(1-t)*-360);
const rotate=useTransform(eased,t=>(1-t)*(index%2?12:-12));
const opacity=useTransform(eased,t=>clamp(t*3));
return <motion.svg viewBox="0 0 300 115" style={{bottom:20+index*33,zIndex:index+1,x,y,rotate,opacity}} aria-hidden="true"><g stroke="#173f2b" strokeWidth="2.5" strokeLinejoin="round">{shape}</g></motion.svg>;
}
export default function IngredientStack({journeyRef}){const [step,setStep]=useState(0);const reduced=useReducedMotion();
const {scrollYProgress}=useScroll({target:journeyRef,offset:['start 0.65','end 1.3']});
const smoothed=useSpring(scrollYProgress,{stiffness:100,damping:20,restDelta:.001});
const progress=reduced?scrollYProgress:smoothed;
useMotionValueEvent(progress,'change',latest=>setStep(Math.min(5,Math.floor(latest*6))));
return <div className="ingredient-scene"><span className="ingredient-kicker">ONE LAYER AT A TIME</span><div className="ingredient-stage" role="img" aria-label="빵 위에 채소, 토마토, 치즈, 햄, 윗빵이 순서대로 쌓이는 샌드위치"><div className="plate"/>{ingredients.map(([name,shape],i)=><Layer key={name} index={i} progress={progress} shape={shape}/>)}</div><span className="ingredient-label"><AnimatePresence mode="wait" initial={false}><motion.span key={step} initial={reduced?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={reduced?{opacity:0,transition:{duration:0}}:{opacity:0,y:-8}} transition={{duration:.25,ease:[.22,1,.36,1]}}>{ingredients[step][0]}</motion.span></AnimatePresence></span><strong>MADE<br/>BY HAND.</strong><small>한 겹씩, 손으로 쌓아요 ↓</small></div>}


