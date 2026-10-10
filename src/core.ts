import { validateVault, type Vault } from './vault';
export type Expense = { id: string; amount: number; date: string; category: string; note: string; source?: 'cash' | 'vault' | 'black' };
export type Settings = { budget: number; cadence: 'week' | 'month'; categories: string[] };
export type Data = { version: 1; settings: Settings; expenses: Expense[]; vault?: Vault; cash?: Vault };
export const initial: Data = { version: 1, settings: { budget: 300000, cadence: 'month', categories: ['Comida', 'Transporte', 'Compras', 'Servicios', 'Salud', 'Ocio', 'Otros'] }, expenses: [] };
export function dateKey(d = new Date()): string { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
export function period(cadence: Settings['cadence'], offset = 0, today = new Date()) {
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12);
  if (cadence === 'month') { start.setDate(1); start.setMonth(start.getMonth()+offset); }
  else start.setDate(start.getDate()-((start.getDay()+6)%7)+offset*7);
  const end = new Date(start);
  if (cadence === 'month') end.setMonth(end.getMonth()+1); else end.setDate(end.getDate()+7);
  return { start: dateKey(start), end: dateKey(end), last: dateKey(new Date(end.getFullYear(),end.getMonth(),end.getDate()-1,12)) };
}
export function cents(value: string) { if (!/^\d+(\.\d{1,2})?$/.test(value)) throw new Error('Escribe un importe válido, con máximo 2 decimales.'); const n = Math.round(Number(value)*100); if (!Number.isSafeInteger(n) || n <= 0 || n > 100000000000) throw new Error('El importe debe ser mayor a cero y menor a 1,000 millones.'); return n; }
export function validDate(value: unknown): value is string { if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false; const d = new Date(value+'T12:00:00'); return !isNaN(d.getTime()) && dateKey(d) === value; }
export function parseBackup(raw: string): Data {
  const d = JSON.parse(raw);
  const s = d?.settings;
  if (d?.version !== 1 || !s || !Number.isSafeInteger(s.budget) || s.budget <= 0 || s.budget > 100000000000 || !['week','month'].includes(s.cadence) || !Array.isArray(s.categories) || !s.categories.length || s.categories.length > 50 || s.categories.some((c: unknown)=> typeof c !== 'string' || !c.trim() || c.length > 40) || new Set(s.categories).size !== s.categories.length || !Array.isArray(d.expenses) || d.expenses.length > 100000) throw new Error('Este archivo no es un respaldo válido de PocketLimit.');
  const ids = new Set();
  for (const e of d.expenses) { if (!e || typeof e.id !== 'string' || !e.id || ids.has(e.id) || !Number.isSafeInteger(e.amount) || e.amount <= 0 || e.amount > 100000000000 || !validDate(e.date) || !s.categories.includes(e.category) || (e.source!==undefined && !['cash','vault','black'].includes(e.source)) || typeof e.note !== 'string' || e.note.length > 200) throw new Error('El respaldo contiene gastos inválidos.'); ids.add(e.id); }
  const cash = d.cash === undefined ? undefined : validateVault(d.cash);
  if(cash && (cash.rates.some(r=>r.annual!==0)||cash.movements.some(m=>m.type==='withdrawal')))throw new Error('Efectivo inválido.');
  const vault = d.vault === undefined ? undefined : validateVault(d.vault);
  return { ...(cash ? {cash} : {}), ...(vault ? {vault} : {}), version: 1, settings: { budget: s.budget, cadence: s.cadence, categories: [...s.categories] }, expenses: d.expenses.map((e: Expense)=>({id:e.id,amount:e.amount,date:e.date,category:e.category,note:e.note,...(e.source?{source:e.source}:{})})) };
}


