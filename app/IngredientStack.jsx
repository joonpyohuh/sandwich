'use client';
import {useEffect,useRef} from 'react';
import {clamp,easeLayer,follow,scrollProgress} from './motion.mjs';
const ingredients = [
  ['HANDMADE BREAD / 수제 빵', <><path fill="#dfa04f" d="M25 47Q150 20 275 47L265 77Q150 108 35 77Z"/><path fill="#fff0ce" d="M25 47Q150 20 275 47Q150 80 25 47Z"/></>],
  ['GREENS / 채소', <><path fill="#508b3d" d="M17 54Q22 21 52 39Q72 10 98 35Q120 15 145 35Q180 8 200 34Q231 14 250 39Q282 24 285 54L265 76Q239 62 214 79Q189 64 165 79Q130 65 108 80Q77 64 52 77Z"/><path fill="none" stroke="#286537" d="M42 53Q150 81 260 49"/></>],
  ['TOMATO / 토마토', <><ellipse fill="#ce322a" cx="90" cy="58" rx="70" ry="25"/><ellipse fill="#ee5e42" cx="90" cy="50" rx="68" ry="21"/><ellipse fill="#ce322a" cx="211" cy="62" rx="69" ry="25"/><ellipse fill="#ee5e42" cx="211" cy="54" rx="67" ry="21"/><path fill="none" stroke="#ffca83" strokeWidth="4" d="m53 46 25 8m25 -13 13 12m64 -3 20 8m24 -9 15 8"/></>],
  ['CHEESE / 치즈', <><path fill="#edb63c" d="m22 45 187 -15 72 26 -68 34 -36 -13 -39 18 -44 -23 -49 5Z"/><path fill="none" stroke="#ffdb77" d="m40 45 161 -10 50 19"/></>],
  ['HAM / 햄', <><path fill="#d87a73" d="M23 45Q59 17 92 43Q124 65 153 38Q185 15 216 41Q248 65 277 39L276 65Q240 92 208 66Q174 43 146 69Q115 91 81 67Q46 44 23 71Z"/><path fill="none" stroke="#ffd0b1" strokeWidth="5" d="M30 49Q58 29 91 51Q121 76 153 49Q185 27 216 52Q245 75 270 49"/></>],
  ['TOP BREAD / 완성!', <><path fill="#e9ad57" d="M22 66Q22 22 72 24Q107 3 151 17Q201 5 226 30Q277 25 278 66L265 86Q151 112 35 86Z"/><path fill="#fff0cf" d="M24 64Q150 91 277 64L265 86Q151 112 35 86Z"/><path fill="none" stroke="#b77532" strokeWidth="4" d="m64 43 15 -7m39 4 14 -8m46 13 14 -8m34 15 12 -5"/><g fill="#173f2b" stroke="none"><ellipse cx="124" cy="79" rx="4" ry="5"/><ellipse cx="175" cy="79" rx="4" ry="5"/></g><path fill="none" d="M141 81q9 11 18 0"/></>]
];

export default function IngredientStack({journeyRef}) {
  const root=useRef(null);
  useEffect(()=>{
    const scene=root.current;
    const layers=[...scene.querySelectorAll('[data-layer]')];
    const label=scene.querySelector('[data-label]');
    const meter=scene.querySelector('[data-meter]');
    let frame=0,last=0,current=0,target=0;
    const paint=()=>{
      layers.forEach((layer,i)=>{
        const t=easeLayer(current,i);
        layer.style.transform=`translate3d(${(1-t)*(i%2?45:-45)}px,${-260*(1-t)}px,0) rotate(${(1-t)*(i%2?9:-9)}deg)`;
        layer.style.opacity=clamp(t*4);
      });
      label.textContent=ingredients[Math.min(5,Math.floor(current*6))][0];
      meter.style.transform=`scaleX(${current})`;
      scene.dataset.progress=current.toFixed(3);
    };
    const tick=time=>{
      current=follow(current,target,last?time-last:16);last=time;
      if(Math.abs(current-target)<.0001)current=target;
      paint();
      if(current!==target)frame=requestAnimationFrame(tick);else{frame=0;last=0;}
    };
    const update=()=>{
      const rect=journeyRef.current.getBoundingClientRect();
      target=scrollProgress(rect.top,rect.height,innerHeight);
      if(!frame)frame=requestAnimationFrame(tick);
    };
    const observer=new ResizeObserver(update);observer.observe(journeyRef.current);
    window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
    paint();update();
    return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',update);window.removeEventListener('resize',update)};
  },[journeyRef]);
  return <div ref={root} className="ingredient-scene"><span className="ingredient-kicker">SCROLL TO MAKE YOUR SANDWICH</span><div className="ingredient-stage" role="img" aria-label="스크롤하면 빵, 채소, 토마토, 치즈, 햄, 윗빵이 하나씩 내려앉습니다"><div className="plate"/>{ingredients.map(([name,shape],i)=><svg key={name} data-layer={i} viewBox="0 0 300 115" style={{bottom:20+i*33,zIndex:i+1,opacity:0}} aria-hidden="true"><g stroke="#173f2b" strokeWidth="2.5" strokeLinejoin="round">{shape}</g></svg>)}</div><span className="ingredient-label" data-label>HANDMADE BREAD / 수제 빵</span><div className="stack-meter"><span data-meter/></div><strong>MADE<br/>BY HAND.</strong><small>스크롤할 때마다, 한 겹씩 ↓</small></div>
}
