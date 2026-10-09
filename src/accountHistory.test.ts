import { test } from 'node:test';
import assert from 'node:assert/strict';
import { accountHistory } from './accountHistory';
import { initial, type Data } from './core';
import { calculateVault } from './vault';
test('historial muestra gastos de Cajita una vez, conserva fuente y responde a edición/eliminación',()=>{
 const data:Data={...initial,vault:{start:'2026-10-05',opening:100000,rates:[{date:'2026-10-05',annual:0}],movements:[{id:'d',date:'2026-10-06',amount:20000,type:'deposit',note:''}]},expenses:[
 {id:'legacy',date:'2026-10-06',amount:10000,category:'Comida',note:''},
 {id:'cash',date:'2026-10-07',amount:5000,category:'Comida',note:'',source:'cash'},
 {id:'old',date:'2026-10-04',amount:3000,category:'Comida',note:''},
 {id:'future',date:'2026-10-10',amount:3000,category:'Comida',note:''}]};
 const before=JSON.stringify(data);const rows=accountHistory(data,'vault','2026-10-09');
 assert.equal(rows.length,2);assert.equal(rows.filter(r=>r.kind==='expense').length,1);assert.equal(JSON.stringify(data),before);
 assert.equal(calculateVault(data.vault!,data.expenses.filter(e=>e.source!=='cash'),'2026-10-09').balance,110000);
 data.expenses[0].note='Comida editada';assert.equal(accountHistory(data,'vault','2026-10-09').find(r=>r.kind==='expense')?.value.note,'Comida editada');
 data.expenses=data.expenses.filter(e=>e.id!=='legacy');assert.equal(accountHistory(data,'vault','2026-10-09').length,1);
});
