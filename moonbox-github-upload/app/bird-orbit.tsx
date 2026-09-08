'use client';
import {useState} from 'react';
const silhouettes=[
 'M0 1C-9-2-17-17-34-23C-26-12-23 0-9 5C-4 7-1 6 1 8L-2 17 5 12 11 14 8 6C18 4 28-3 40-4C30-8 20-10 9-3C6-2 5-5 3-5C0-5 1-1 0 1Z',
 'M0 1C-11-2-15-9-34-7C-21-2-16 6-5 6L0 8 1 17 6 11 12 12 8 5C17-2 17-20 30-29C15-22 10-12 6-4C3-6 0-5 0 1Z',
 'M0 1C-9-9-23-12-34-9C-20-5-17 4-5 6L0 8-1 16 5 11 11 13 8 5C20 3 24-5 36-10C23-9 15-12 7-3C3-6 0-5 0 1Z',
];
export default function BirdOrbit(){
 const [open,setOpen]=useState(false);
 return <div className={'bird-orbit '+(open?'is-open':'')}>
  <button className="bird-orbit-trigger" aria-label="飞鸟寄语" aria-expanded={open} onClick={()=>setOpen(value=>!value)}>
   <svg viewBox="0 0 280 190" fill="none" aria-hidden="true">
    <g className="bird-flock">
     {[{x:49,y:138,a:-19,s:.56},{x:112,y:104,a:-9,s:.88},{x:174,y:63,a:12,s:.68},{x:238,y:44,a:-12,s:.4}].map((bird,i)=><g key={i} transform={`translate(${bird.x} ${bird.y}) rotate(${bird.a}) scale(${bird.s})`}>
      <path d={silhouettes[i%3]} fill="currentColor" opacity={[.35,.61,.48,.3][i]}/>
     </g>)}
    </g>
    <path d="M215 111c.7 5 2 6.3 7 7-5 .7-6.3 2-7 7-.7-5-2-6.3-7-7 5-.7 6.3-2 7-7Z" stroke="currentColor" strokeWidth=".65" opacity=".25"/>
   </svg>
  </button>
  <p className="bird-orbit-message">心有所向，不必追赶每一阵风。</p>
 </div>;
}
