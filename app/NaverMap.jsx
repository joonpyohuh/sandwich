'use client';
import {useEffect,useRef,useState} from 'react';
const KEY=process.env.NEXT_PUBLIC_NAVER_MAP_KEY;
const ADDRESS='경기 구리시 체육관로74번길 27';
let loading=null;
const loadSdk=()=>loading??=new Promise((resolve,reject)=>{window.navermap_authFailure=()=>reject(new Error('naver map auth failed'));const s=document.createElement('script');s.src=`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${KEY}&submodules=geocoder`;s.onload=()=>resolve(window.naver.maps);s.onerror=reject;document.head.appendChild(s)});
export default function NaverMap({href}){const el=useRef(null);const [state,setState]=useState(KEY?'loading':'off');
useEffect(()=>{if(!KEY)return;let cancelled=false;const fail=()=>{if(!cancelled)setState('off')};
loadSdk().then(maps=>maps.Service.geocode({query:ADDRESS},(status,res)=>{const a=res?.v2?.addresses?.[0];if(cancelled)return;if(status!==maps.Service.Status.OK||!a)return fail();const pos=new maps.LatLng(+a.y,+a.x);const map=new maps.Map(el.current,{center:pos,zoom:17,scrollWheel:false,mapDataControl:false,scaleControl:false,zoomControl:true,zoomControlOptions:{position:maps.Position.TOP_RIGHT}});new maps.Marker({position:pos,map,icon:{content:'<span class="map-pin">SANDWICH FACTORY</span>',anchor:new maps.Point(0,0)}});setState('ready')})).catch(fail);
return()=>{cancelled=true}},[]);
return <div className={'visit-map '+state}><div ref={el} className="map-canvas" aria-label="샌드위치 팩토리 위치 지도"/>{state==='off'&&<a className="map-fallback" href={href} target="_blank" rel="noreferrer"><span>NAVER MAP</span><strong>네이버지도에서 위치 보기 ↗</strong></a>}</div>}
