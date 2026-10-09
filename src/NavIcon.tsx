export default function NavIcon({name}:{name:string}) {
 const paths:Record<string,React.ReactNode>={
  close:<path d="m6 6 12 12M18 6 6 18"/>,
  left:<path d="m15 5-7 7 7 7"/>,right:<path d="m9 5 7 7-7 7"/>,
  download:<><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></>,upload:<><path d="M12 16V4m-5 5 5-5 5 5M4 16v5h16v-5"/></>,
  lock:<><rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
  dollar:<><path d="M12 2v20M17 5H9a4 4 0 0 0 0 8h6a3 3 0 0 1 0 6H6"/></>,
  outgoing:<><path d="M3 12h6M16 3v18M20 6h-5a3 3 0 0 0 0 6h2a3 3 0 0 1 0 6h-5"/></>,
  incoming:<><path d="M3 12h6M6 9v6M16 3v18M20 6h-5a3 3 0 0 0 0 6h2a3 3 0 0 1 0 6h-5"/></>,
  balance:<><path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor"/><circle cx="15" cy="17" r="3" fill="currentColor"/></>,
  food:<><path d="M5 3v6a3 3 0 0 0 6 0V3M8 3v18M19 3c-4 3-4 8 0 8V3Zm0 8v10"/></>,
  transport:<><rect x="4" y="3" width="16" height="15" rx="4"/><path d="M4 10h16M8 18v3M16 18v3M8 14h.01M16 14h.01"/></>,
  shopping:<><path d="M4 8h16l-1 13H5L4 8ZM8 8V6a4 4 0 0 1 8 0v2"/></>,
  health:<><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z"/></>,
  leisure:<><path d="m9 3 11 9-11 9V3Z"/></>,
  other:<><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  cajita:<><rect x="3" y="7" width="18" height="14" rx="3"/><path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M3 12h18M9 12v3h6v-3"/></>,
  piggy:<><path d="M6 9.5a7.5 7.5 0 0 0-.8 8.5H7l1 3h2l.8-2h5.6l.8 2h2l1-3h1.3v-5h-1.8a7.2 7.2 0 0 0-2.2-3.5V7.8l-2.5 1.1"/><path d="M6 11c-2.3 0-3.3-1.5-3.3-3.2M9.1 9.5a4 4 0 1 1 7.2-2.4v2.4M18.2 13.2h.01"/></>,
  bars:<><rect x="2" y="12" width="5" height="10" rx="1" fill="currentColor" stroke="none"/><rect x="9.5" y="2" width="5" height="20" rx="1" fill="currentColor" stroke="none"/><rect x="17" y="7" width="5" height="15" rx="1" fill="currentColor" stroke="none"/></>,
  gastos:<><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 7h6M9 11h6M9 15h3"/></>,
  cash:<><path d="M20 8V6a2 2 0 0 0-2-2H6a3 3 0 0 0 0 6h14v10H6a3 3 0 0 1-3-3V7"/><path d="M20 12h-5a2 2 0 0 0 0 4h5"/><path d="M16 14h.01"/></>,
  ajustes:<><path d="m9.2 3-.5 2a8 8 0 0 0-1.5.9l-2-.6-2.2 3.8 1.5 1.4a8 8 0 0 0 0 1.8L3 13.7l2.2 3.8 2-.6a8 8 0 0 0 1.5.9l.5 2h4.4l.5-2a8 8 0 0 0 1.5-.9l2 .6 2.2-3.8-1.5-1.4a8 8 0 0 0 0-1.8l1.5-1.4-2.2-3.8-2 .6a8 8 0 0 0-1.5-.9l-.5-2H9.2Z"/><circle cx="11.4" cy="11.5" r="3"/></>
 };
 return <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

