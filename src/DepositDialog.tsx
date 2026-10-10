import { useEffect, useRef, useState } from 'react';
import { cents, dateKey, type Data } from './core';
import NavIcon from './NavIcon';
export default function DepositDialog({data,account,busy,save,onClose}:{data:Data;account:'vault'|'cash';busy:boolean;save:(d:Data)=>Promise<boolean>;onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null);const [error,setError]=useState('');
 useEffect(()=>{dialog.current?.showModal();},[]);
 const v=data[account];
 return <dialog ref={dialog} className="deposit-dialog" onCancel={onClose} aria-labelledby="deposit-title"><form onSubmit={async e=>{
  e.preventDefault();if(!v)return;const f=new FormData(e.currentTarget);
  try{const movement={id:crypto.randomUUID(),type:'deposit' as const,amount:cents(String(f.get('amount'))),date:dateKey(),note:String(f.get('note')).trim()};
   if(await save({...data,[account]:{...v,movements:[...v.movements,movement]}}))onClose();else setError('No se pudo guardar el depósito. Intenta de nuevo.');
  }catch(x){setError((x as Error).message);}
 }}><div className="section-title"><h2 id="deposit-title">Depósito</h2><button type="button" aria-label="Cerrar depósito" onClick={onClose}><NavIcon name="close"/></button></div><p className="hint">{account==='vault'?'Tarjeta':'Efectivo'} · Hoy</p>{error&&<p role="alert" className="alert">{error}</p>}<label>Importe · MXN<input autoFocus name="amount" type="number" inputMode="decimal" min="0.01" step="0.01" required placeholder="0.00"/></label><label>Nota opcional<input name="note" maxLength={200}/></label><button className="primary wide" disabled={busy}>{busy?'Guardando…':'Guardar depósito'}</button></form></dialog>;
}

