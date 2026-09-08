export default function TarotSymbol({id,symbol}:{id:number;symbol:string}){
 if(id<22)return <>{symbol}</>;
 const suit=Math.floor((id-22)/14);
 return <svg className="tarot-suit-icon" viewBox="0 0 40 48" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
