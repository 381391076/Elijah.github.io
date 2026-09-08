'use client';
import {useEffect,useState} from 'react';
import {planetNotes,signNotes,houseNotes} from '@/lib/astrology-summaries';
import {planets,signs} from '@/lib/oracle';
import {referenceParagraphs} from '@/lib/reference-paragraphs';
type Entry={title:string;text:string};
type References={planet:Entry;sign:Entry;house:Entry};
export default function DiceDocumentReading({planet,sign,house}:{planet:number;sign:number;house:number}){
 const [data,setData]=useState<References|null>(null);
 const [error,setError]=useState(false);
 const [retry,setRetry]=useState(0);
 useEffect(()=>{
  const controller=new AbortController();
  setData(null);setError(false);
  fetch('/api/astrology-reference?'+new URLSearchParams({planet:String(planet),sign:String(sign),house:String(house)}),{signal:controller.signal})
   .then(response=>{if(!response.ok)throw Error('reference');return response.json()})
   .then(value=>{
    if(!value||typeof value!=='object')throw Error('reference');
    const entries=value as Record<string,unknown>;
    for(const key of ['planet','sign','house']){
     const entry=entries[key] as Partial<Entry>|undefined;
     if(!entry||typeof entry.title!=='string'||typeof entry.text!=='string')throw Error('reference');
    }
    if(!controller.signal.aborted)setData(value as References);
   }).catch(()=>{if(!controller.signal.aborted)setError(true)});
  return ()=>controller.abort();
 },[planet,sign,house,retry]);
 const rows=[
  {key:'planet' as const,name:planets[planet][1],note:planetNotes[planet],file:'行星'},
  {key:'sign' as const,name:signs[sign][1],note:signNotes[sign],file:'星座'},
  {key:'house' as const,name:'第'+(house+1)+'宫',note:houseNotes[house],file:'十二宮位'},
 ];
 return <section className="result-section dice-document-reading" aria-label="对应资料解读">
  <h3>星象深读</h3>
  {rows.map(row=><div key={row.key}><h4>{row.name}</h4><p>{row.note}</p>
   <details><summary>展开《{row.file}》对应资料</summary>
    {data?<div className="source-reading"><small>原文 · {data[row.key].title}</small>{referenceParagraphs(data[row.key].text).map((paragraph,i)=><p key={i}>{paragraph}</p>)}</div>:error?<p>详细资料暂未载入。<button className="text-button" onClick={()=>setRetry(n=>n+1)}>重新载入</button></p>:<p role="status">正在载入对应资料…</p>}
   </details></div>)}
 </section>;
}
