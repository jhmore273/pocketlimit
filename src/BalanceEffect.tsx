import { useEffect, useRef, useState } from 'react';

const money=(n:number)=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(n/100);
export default function BalanceEffect({balance}:{balance:number}){
 const previous=useRef(balance);
 const sequence=useRef(0);
 const anchor=useRef<HTMLSpanElement>(null);
 const [effect,setEffect]=useState<{id:number;delta:number}|null>(null);
 const [flash,setFlash]=useState<{id:number;incoming:boolean}|null>(null);
 useEffect(()=>{
  const delta=balance-previous.current;
  previous.current=balance;
  if(!delta)return;
  const id=++sequence.current;
  setFlash({id,incoming:delta>0});
  const flashTimer=setTimeout(()=>setFlash(current=>current?.id===id?null:current),2100);
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){setEffect(null);return;}
  setEffect({id,delta});
  return()=>clearTimeout(flashTimer);
 },[balance]);
 useEffect(()=>{
  if(!effect)return;
  const value=anchor.current?.parentElement;
  const rect=value?.getBoundingClientRect();
  if(rect&&(rect.top<0||rect.bottom>window.innerHeight-100))value?.scrollIntoView({block:'center',behavior:'smooth'});
  const timer=setTimeout(()=>setEffect(null),2200);
  return()=>clearTimeout(timer);
 },[effect]);
 if(!effect&&!flash)return null;
 if(!effect)return <span ref={anchor} className={`pixel-balance-effect balance-flash-marker ${flash?.incoming?'balance-flash-gain':'balance-flash-spend'}`} aria-hidden="true"/>;
 const incoming=effect.delta>0;
 return <span ref={anchor} key={effect.id} className={`pixel-balance-effect ${incoming?'pixel-gain':'pixel-spend'} ${flash?.incoming?'balance-flash-gain':'balance-flash-spend'}`} aria-hidden="true">
  <span className="pixel-balance-label"><span>{incoming?'+':'−'}{money(Math.abs(effect.delta))}</span></span>
  {!incoming&&<span className="pixel-burst">{Array.from({length:8},(_,i)=><i key={i}/>)}</span>}
 </span>;
}

