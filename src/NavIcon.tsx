export default function NavIcon({name}:{name:string}) {
 const paths:Record<string,React.ReactNode>={
  cajita:<><rect x="3" y="7" width="18" height="14" rx="3"/><path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M3 12h18M9 12v3h6v-3"/></>,
  gastos:<><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 7h6M9 11h6M9 15h3"/></>,
  cash:<><path d="M20 8V6a2 2 0 0 0-2-2H6a3 3 0 0 0 0 6h14v10H6a3 3 0 0 1-3-3V7"/><path d="M20 12h-5a2 2 0 0 0 0 4h5"/><path d="M16 14h.01"/></>,
  ajustes:<><path d="m9.2 3-.5 2a8 8 0 0 0-1.5.9l-2-.6-2.2 3.8 1.5 1.4a8 8 0 0 0 0 1.8L3 13.7l2.2 3.8 2-.6a8 8 0 0 0 1.5.9l.5 2h4.4l.5-2a8 8 0 0 0 1.5-.9l2 .6 2.2-3.8-1.5-1.4a8 8 0 0 0 0-1.8l1.5-1.4-2.2-3.8-2 .6a8 8 0 0 0-1.5-.9l-.5-2H9.2Z"/><circle cx="11.4" cy="11.5" r="3"/></>
 };
 return <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
