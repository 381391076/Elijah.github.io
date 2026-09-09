const majorSymbols=[
 <g key="fool"><path d="M7 37c8 0 4-14 13-14s6-13 13-15M8 12l2 4 4 2-4 2-2 4-2-4-4-2 4-2Z"/><circle cx="29" cy="34" r="3"/></g>,
 <g key="magician"><path d="m11 38 17-25m-3-5 2-5 2 5 5 2-5 2-2 5-2-5-5-2ZM7 24h6m-3-3v6"/></g>,
 <g key="priestess"><path d="M27 8a15 15 0 1 0 6 27A16 16 0 0 1 27 8ZM8 41h24M9 10v28"/></g>,
 <g key="empress"><path d="m5 13 8 7 7-12 7 12 8-7-4 20H9ZM10 38h20"/><circle cx="20" cy="27" r="2"/></g>,
 <g key="emperor"><path d="M9 40V17h22v23M6 40h28M13 17V9h14v8M20 4v8m-4-4h8M15 25h10v10H15Z"/></g>,
 <g key="hierophant"><path d="M20 9v32M5 12q8-4 15 1 7-5 15-1v25q-8-4-15 1-7-5-15-1ZM10 20h5m-5 6h5m10-6h5m-5 6h5"/></g>,
 <g key="lovers"><path d="M20 37 7 24C-2 13 13 5 20 17c7-12 22-4 13 7ZM20 5v4M4 8l3 3m29-3-3 3"/></g>,
 <g key="chariot"><path d="M9 31V17h22v14ZM5 32h30M12 17l8-9 8 9M20 9V4"/><circle cx="11" cy="37" r="4"/><circle cx="29" cy="37" r="4"/></g>,
 <g key="strength"><path d="M20 24c-15-18-23 12-10 10 8-1 14-20 20-20 14 0 8 29-10 10ZM14 6q6-4 12 0"/></g>,
 <g key="hermit"><path d="M12 16h16v23H12ZM10 16l10-8 10 8M20 8V4m-6 35h12M20 21l2 5 4 2-4 2-2 5-2-5-4-2 4-2Z"/></g>,
 <g key="wheel"><circle cx="20" cy="24" r="15"/><circle cx="20" cy="24" r="10"/><circle cx="20" cy="24" r="3"/><path d="M20 6v15m0 6v15M2 24h15m6 0h15M7 11l11 11m4 4 11 11M7 37l11-11m4-4 11-11"/></g>,
 <g key="justice"><path d="M20 7v33M12 41h16M6 15h28M9 15 3 29h12ZM31 15l-6 14h12Z"/><circle cx="20" cy="10" r="2"/></g>,
 <g key="hanged"><path d="M6 7h28M20 7v12l-7 7 7 4m0-11 6 8-6 3v6M13 33l7-3 7 3"/><circle cx="20" cy="41" r="3"/></g>,
 <g key="death"><path d="M7 40h26M10 37c0-20 20-20 20-31M12 30c-7-1-8-5-8-9 7 0 10 5 8 9ZM23 19c8 0 12-6 12-10-8 1-12 5-12 10"/></g>,
 <g key="temperance"><path d="m6 8 11 3-3 10-9-3ZM25 28l10 3-3 10-10-3ZM13 23c0 8 14-4 14 2M17 20c0 6 13 0 13 6"/></g>,
 <g key="devil"><path d="M11 15 6 6l12 7h4L34 6l-5 9M10 15v9q10 15 20 0v-9M14 21h3m6 0h3M12 35l-5 7m21-7 5 7"/><circle cx="20" cy="36" r="3"/></g>,
 <g key="tower"><path d="M10 41h20l-3-25H13ZM13 16v-5h5v5m4 0v-5h5M19 23h4v6h-4M25 3l-9 8h6l-7 10M4 29l3 4m27-7-3 5"/></g>,
 <g key="star"><path d="m20 7 3 12 12 5-12 4-3 13-4-13-11-4 11-5ZM6 8v6m-3-3h6m23 23v6m-3-3h6"/></g>,
 <g key="moon"><path d="M27 6a16 16 0 1 0 7 28A17 17 0 0 1 27 6ZM28 14v7m-3.5-3.5h7M5 44q7-4 14 0t15 0"/></g>,
 <g key="sun"><circle cx="20" cy="24" r="9"/><path d="M20 5v6m0 26v6M1 24h6m26 0h6M6 10l4 4m20 20 4 4M6 38l4-4m20-20 4-4"/></g>,
 <g key="judgement"><path d="m8 21 15-5 9-8v27l-9-8-15-2ZM15 27v11h6V28M4 18v10M35 11l3-3m-3 25 3 3"/></g>,
 <g key="world"><ellipse cx="20" cy="24" rx="12" ry="18"/><ellipse cx="20" cy="24" rx="5" ry="18"/><path d="M8 24h24M10 15h20m-20 18h20M2 7h4m-2-2v4m30 32h4m-2-2v4"/></g>,
];
export default function TarotSymbol({id}:{id:number}){
 if(id<22)return <svg className="tarot-suit-icon" width="40" height="48" viewBox="0 0 40 48" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{majorSymbols[id]}</svg>;
 const suit=Math.floor((id-22)/14);
 return <svg className="tarot-suit-icon" width="40" height="48" viewBox="0 0 40 48" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  {suit===0?<g>
   <path d="M18 42c1-12 0-23 2-36q2-3 4 0c-2 12-1 25-2 36q-2 3-4 0Z" fill="currentColor" fillOpacity=".07"/>
   <path d="M21 17C12 17 8 10 9 6c8 1 12 5 12 11ZM23 27c9-1 12-7 11-12-8 1-11 6-11 12"/>
   <path d="m13 10 7 6m5 8 5-5M20 31l1 5" strokeWidth=".8" opacity=".55"/>
  </g>:suit===1?<g>
   <ellipse cx="20" cy="12" rx="11" ry="3"/>
   <path d="M9 12c1 9 4 17 11 17s10-8 11-17M18.5 29v10m3-10v10M18.5 38c-1 3-5 3-6 5h15c-1-2-5-2-6-5"/>
   <path d="M13 18c1 4 3 7 5 8" opacity=".45"/>
   <path d="M20 3v3m-6-1 1 2m11-2-1 2" strokeWidth=".9"/>
  </g>:suit===2?<g transform="rotate(18 20 24)">
   <path d="m20 3-4 8 1 20h6l1-20ZM20 9v21" fill="currentColor" fillOpacity=".05"/>
   <path d="M11 30q9 6 18 0M18 34v7h4v-7M18 37h4"/>
   <path d="m20 41-2 2 2 2 2-2Z"/>
   <path d="M10 12v5m-2.5-2.5h5" opacity=".6" strokeWidth=".85"/>
  </g>:<g>
   <circle cx="20" cy="24" r="14" fill="currentColor" fillOpacity=".05"/>
   <path d="m20 14 2.25 6.9h7.25l-5.85 4.25 2.25 6.9L20 27.8l-5.9 4.25 2.25-6.9-5.85-4.25h7.25Z" strokeWidth="1"/>
   <path d="M10 16a12 12 0 0 0 0 16m20-16a12 12 0 0 1 0 16" opacity=".4" strokeWidth=".7"/>
   <path d="M20 5v2m0 34v2M2 24h2m32 0h2" opacity=".65"/>
  </g>}
 </svg>;
}
