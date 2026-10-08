import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cents, initial, parseBackup, period, validDate } from './core';
test('centavos exactos y entradas inválidas',()=>{assert.equal(cents('10.29'),1029);for(const n of ['0','-1','1.001','NaN',''])assert.throws(()=>cents(n));});
test('semana empieza lunes y cruza año',()=>{assert.deepEqual(period('week',0,new Date(2026,0,1,12)),{start:'2025-12-29',end:'2026-01-05',last:'2026-01-04'});});
test('mes anterior y febrero bisiesto',()=>{assert.deepEqual(period('month',-1,new Date(2024,2,31,12)),{start:'2024-02-01',end:'2024-03-01',last:'2024-02-29'});assert.equal(validDate('2025-02-29'),false);});
test('respaldo completo y rechazo de corrupción',()=>{const d=structuredClone(initial);d.expenses.push({id:'a',amount:1299,date:'2026-10-08',category:'Comida',note:'Almuerzo'});assert.deepEqual(parseBackup(JSON.stringify(d)),d);d.expenses.push({...d.expenses[0]});assert.throws(()=>parseBackup(JSON.stringify(d)));assert.throws(()=>parseBackup('{"version":2}'));});
