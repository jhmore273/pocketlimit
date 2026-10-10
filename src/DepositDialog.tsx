import { useEffect, useRef, useState } from 'react';
import { cents, dateKey, validDate, type Data } from './core';
import NavIcon from './NavIcon';
export default function DepositDialog({data,account,busy,save,onClose}:{data:Data;account:'vault'|'cash';busy:boolean;save:(d:Data)=>Promise<boolean>;onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null);const [error,setError]=useState('');
 useEffect(()=>{dialog.current?.showModal();},[]);
 const v=data[account];
 return <dialog ref={dialog} className="deposit-dialog" onCancel={onClose} aria-labelledby="deposit-title"><form onSubmit={async e=>{
  e.preventDefault();if(!v)return;const f=new FormData(e.currentTarget);
  try{const date=String(f.get('date'));if(!validDate(date)||date<v.start||date>dateKey())throw new Error('Selecciona una fecha entre el inicio de tu cuenta y hoy.');
   const movement={id:crypto.randomUUID(),type:'deposit' as const,amount:cents(String(f.get('amount'))),date,note:String(f.get('note')).trim()};
   if(await save({...data,[account]:{...v,movements:[...v.movements,movement]}}))onClose();else setError('No se pudo guardar el depósito. Intenta de nuevo.');
  }catch(x){setError((x as Error).message);}
 }}><div className="section-title"><h2 id="deposit-title">Depósito</h2><button type="button" aria-label="Cerrar depósito" onClick={onClose}><NavIcon name="close"/></button></div><p className="hint">{account==='vault'?'Tarjeta':'Efectivo'}</p>{error&&<p role="alert" className="alert">{error}</p>}<label>Importe · MXN<input autoFocus name="amount" type="number" inputMode="decimal" min="0.01" step="0.01" required placeholder="0.00"/></label><details><summary>Fecha y nota</summary><label>Fecha<input name="date" type="date" min={v?.start} max={dateKey()} defaultValue={dateKey()} required/></label><label>Nota opcional<input name="note" maxLength={200}/></label></details><button className="primary wide" disabled={busy}>{busy?'Guardando…':'Guardar depósito'}</button></form></dialog>;
}
