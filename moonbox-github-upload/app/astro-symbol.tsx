type Props={kind:'planet'|'sign'|'house';index:number;className?:string};
const zodiacPaths=[
 'M16 27V11C16 2 3 2 5 12M16 11C16 2 29 2 27 12',
 'M5 4c0 8 22 8 22 0M16 12a8 8 0 1 0 0 16 8 8 0 0 0 0-16',
 'M6 4c5 3 15 3 20 0M6 28c5-3 15-3 20 0M11 7v18M21 7v18',
 'M26 9C21 3 10 3 6 9M6 23c5 6 16 6 20 0M9 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M23 16a4 4 0 1 0 0 8 4 4 0 0 0 0-8',
 'M10 20a4 4 0 1 0 0 8 4 4 0 0 0 0-8M10 20C-1 5 21-4 24 8c2 7-10 15-5 19 2 2 6 1 8-1',
 'M4 8v18M4 11c3-6 7-5 7 0v15M11 11c3-6 7-5 7 0v11M18 11c11-9 13 10 1 16M24 12v13l5 3',
 'M4 26h24M4 20h8c-9-10 17-10 8 0h8',
 'M4 8v18M4 11c3-6 7-5 7 0v15M11 11c3-6 7-5 7 0v10c0 6 6 5 11 3M25 20l4 4-4 4',
 'M6 26 26 6M15 6h11v11M6 16l10 10',
 'M3 8l5 17 7-17c10-4 2 24 12 18 9-7-10-9-12-1',
 'M3 13l5-4 5 4 5-4 5 4 6-4M3 24l5-4 5 4 5-4 5 4 6-4',
 'M6 4c10 5 10 19 0 24M26 4c-10 5-10 19 0 24M3 16h26'
];
const planetPaths=[
 '', 'M21 3a13 13 0 1 0 0 26 14 14 0 0 1 0-26Z',
 'M10 3c0 6 12 6 12 0M16 20v10M11 26h10',
 'M16 21v9M11 26h10',
 'M21 11 29 3M21 3h8v8',
 'M9 5c12 0 8 14-4 14h23M22 4v25',
 'M10 3v22M5 9h11M10 16c13-12 17 2 9 11l4 2',
 'M6 5v15M26 5v15M6 12h20M16 4v20',
 'M5 5v8c0 13 22 13 22 0V5M16 3v27M11 27h10M2 8l3-3 3 3M24 8l3-3 3 3',
 'M7 14c0 11 18 11 18 0M16 22v8M11 27h10',
 'M7 22V12c0-13 18-13 18 0v10M7 22a3 3 0 1 0-6 0 3 3 0 0 0 6 0M31 22a3 3 0 1 0-6 0 3 3 0 0 0 6 0',
 'M7 10v10c0 13 18 13 18 0V10M7 10a3 3 0 1 0-6 0 3 3 0 0 0 6 0M31 10a3 3 0 1 0-6 0 3 3 0 0 0 6 0'
];
function point(a:number,r:number){return [16+Math.cos(a)*r,16+Math.sin(a)*r]}
export function ZodiacWheel({house,className=''}:{house?:number;className?:string}){
 const start=((house??0)*30-90)*Math.PI/180,end=start+Math.PI/6;
 const p=point(start,13),q=point(end,13);
 return <svg className={'astro-symbol '+className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
 {house!==undefined&&<path d={'M16 16L'+p.join(' ')+'A13 13 0 0 1 '+q.join(' ')+'Z'} fill="currentColor" fillOpacity=".28" stroke="none"/>}
 <circle cx="16" cy="16" r="13"/><circle cx="16" cy="16" r="7"/>
 {Array.from({length:12},(_,i)=>{const a=(i*30-90)*Math.PI/180;const p=point(a,7),q=point(a,13);return <path key={i} d={'M'+p.join(' ')+'L'+q.join(' ')}/>})}
 {house===undefined?<path d="m16 11 1.5 3.5L21 16l-3.5 1.5L16 21l-1.5-3.5L11 16l3.5-1.5Z" fill="currentColor" stroke="none"/>:<circle cx="16" cy="16" r="1.8" fill="currentColor" stroke="none"/>}
 </svg>
}
export default function AstroSymbol({kind,index,className=''}:Props){
 if(kind==='house')return <ZodiacWheel house={index} className={className}/>;
 return <svg className={'astro-symbol '+className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 {kind==='sign'?<path d={zodiacPaths[index]}/>:<>
 {planetPaths[index]&&<path d={planetPaths[index]}/>}
 {index===0&&<><circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="2.4" fill="currentColor" stroke="none"/></>}
 {index===2&&<circle cx="16" cy="14" r="6"/>}
 {index===3&&<circle cx="16" cy="12" r="8"/>}
 {index===4&&<circle cx="12" cy="20" r="9"/>}
 {index===7&&<circle cx="16" cy="26" r="3"/>}
 {index===9&&<circle cx="16" cy="8" r="5"/>}
 </>}
 </svg>
}

