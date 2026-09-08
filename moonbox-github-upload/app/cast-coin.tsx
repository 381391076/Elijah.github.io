export default function CastCoin({value}:{value:number}){
 return <figure className="cast-coin">
  <svg viewBox="0 0 72 72" aria-hidden="true">
   <g transform="rotate(45 36 36)">
    <path d="M36 6a30 30 0 1 0 0 60 30 30 0 1 0 0-60ZM29 29h14v14H29Z" fill="currentColor" fillOpacity=".12" fillRule="evenodd"/>
    <circle cx="36" cy="36" r="29.5" fill="none" stroke="currentColor" strokeOpacity=".3" strokeWidth=".8"/>
    <rect x="29" y="29" width="14" height="14" rx=".8" fill="none" stroke="currentColor" strokeOpacity=".6" strokeWidth=".9"/>
    {value===2?<g stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".65">
     <path d="M32 16h8m-6 3h4m-2-5v9M32 54h8m-6 3h4m-2-6v8M15 32h7m-5 4h5m-3-6v12M51 33h7m-7 5h7m-4-7v11"/>
    </g>:<g fill="none" stroke="currentColor" strokeWidth=".9" opacity=".5">
     <circle cx="36" cy="36" r="24"/>
     <path d="M33 18q3-4 6 0m-6 36q3 4 6 0M18 33q-4 3 0 6m36-6q4 3 0 6"/>
    </g>}
   </g>
  </svg>
  <figcaption><span>{value===2?'字':'背'}</span><small>{value} 点</small></figcaption>
 </figure>;
}
