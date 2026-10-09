import type { Data, Expense } from './core';
import type { Movement } from './vault';
export type AccountEntry = {kind:'expense'; value:Expense}|{kind:'movement';value:Movement};
// Display expenses from their original records, without adding another balance deduction.
export function accountHistory(data:Data, account:'vault'|'cash', today:string):AccountEntry[]{
 const v=data[account];if(!v)return [];
 return [...v.movements.map(value=>({kind:'movement' as const,value})),...data.expenses.filter(e=>(e.source||'vault')===account&&e.date>=v.start&&e.date<=today).map(value=>({kind:'expense' as const,value}))].sort((a,b)=>b.value.date.localeCompare(a.value.date)||a.value.id.localeCompare(b.value.id));
}
