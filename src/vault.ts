import { dateKey, validDate, type Expense } from './core';
export type Movement = { id: string; date: string; amount: number; type: 'deposit' | 'withdrawal' | 'balance'; note: string };
export type Vault = { start: string; opening: number; rates: { date: string; annual: number }[]; movements: Movement[] };
const day = (s: string) => Date.parse(s+'T00:00:00Z');
export function validateVault(v: unknown): Vault {
 const x = v as Vault;
 const amount = (n: number) => Number.isSafeInteger(n) && n >= 0 && n <= 100000000000;
 const date = (s: string) => validDate(s) && s >= '2000-01-01' && s <= '2100-12-31';
 if (!x || !date(x.start) || !amount(x.opening) || !Array.isArray(x.rates) || !x.rates.length || x.rates.length>1000 || !Array.isArray(x.movements) || x.movements.length>100000) throw new Error('Datos de Cajita inválidos.');
 if (x.rates.some(r=>!date(r.date)||r.date<x.start||typeof r.annual!=='number'||!Number.isFinite(r.annual)||r.annual<0||r.annual>100) || !x.rates.some(r=>r.date===x.start) || new Set(x.rates.map(r=>r.date)).size!==x.rates.length) throw new Error('Tasas de Cajita inválidas.');
 const ids=new Set<string>();
 for(const m of x.movements){if(!m || typeof m.id!=='string'||!m.id||ids.has(m.id)||!date(m.date)||m.date<x.start||!amount(m.amount)||(m.type!=='balance'&&m.amount===0)||!['deposit','withdrawal','balance'].includes(m.type)||typeof m.note!=='string'||m.note.length>200)throw new Error('Movimientos de Cajita inválidos.');ids.add(m.id);}
 return {start:x.start,opening:x.opening,rates:x.rates.map(r=>({date:r.date,annual:r.annual})),movements:x.movements.map(m=>({id:m.id,date:m.date,amount:m.amount,type:m.type,note:m.note}))};
}
export function calculateVault(v: Vault, expenses: Expense[], asOf=dateKey()) {
 let balance=v.opening, interest=0, latest=0, deposits=0, withdrawals=0, spending=0, adjustments=0, annual=0, lowest=balance;
 const rates=[...v.rates].sort((a,b)=>a.date.localeCompare(b.date));
 const moves=new Map<string,Movement[]>();for(const m of v.movements){const list=moves.get(m.date)||[];list.push(m);moves.set(m.date,list);}
 const costs=new Map<string,number>();for(const e of expenses)costs.set(e.date,(costs.get(e.date)||0)+e.amount);
 if(asOf<v.start)return {balance:0,interest:0,latest:0,tomorrow:0,deposits:0,withdrawals:0,spending:0,adjustments:0,annual:0,lowest:0};
 let rateIndex=0;
 for(let stamp=day(v.start);stamp<=day(asOf);stamp+=86400000){const date=new Date(stamp).toISOString().slice(0,10);
   if(stamp>day(v.start)){latest=Math.round(Math.max(0,balance)*annual/100/365);balance+=latest;interest+=latest;}
   while(rateIndex<rates.length&&rates[rateIndex].date<=date){annual=rates[rateIndex].annual;rateIndex++;}
   for(const m of moves.get(date)||[]){if(m.type==='deposit'){balance+=m.amount;deposits+=m.amount;}else if(m.type==='withdrawal'){balance-=m.amount;withdrawals+=m.amount;}}
   const cost=costs.get(date)||0;balance-=cost;spending+=cost;
   // Reconciliation is an end-of-day balance, after all deposits and expenses.
   for(const m of moves.get(date)||[]){if(m.type==='balance'){adjustments+=m.amount-balance;balance=m.amount;}}
   lowest=Math.min(lowest,balance);
 }
 return {balance,interest,latest,tomorrow:Math.round(Math.max(0,balance)*annual/100/365),deposits,withdrawals,spending,adjustments,annual,lowest};
}
