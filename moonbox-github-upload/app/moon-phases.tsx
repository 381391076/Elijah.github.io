'use client';
import {useEffect,useState} from 'react';
import {ChevronLeft,ChevronRight} from 'lucide-react';
const phases = [
 {name:'新月',path:''},
 {name:'娥眉月',path:'M12 3A9 9 0 0 1 12 21C20 17 20 7 12 3Z'},
 {name:'上弦月',path:'M12 3A9 9 0 0 1 12 21Z'},
 {name:'盈凸月',path:'M12 3A9 9 0 0 1 12 21C4 17 4 7 12 3Z'},
 {name:'满月',path:'M12 3A9 9 0 1 1 12 21A9 9 0 1 1 12 3Z'},
 {name:'亏凸月',path:'M12 3A9 9 0 0 0 12 21C20 17 20 7 12 3Z'},
 {name:'下弦月',path:'M12 3A9 9 0 0 0 12 21Z'},
 {name:'残月',path:'M12 3A9 9 0 0 0 12 21C4 17 4 7 12 3Z'},
];


// Mean-cycle estimate; epoch and period from NASA's phase catalog.
// https://eclipse.gsfc.nasa.gov/phase/phases1901.html
function phaseFor(date:Date){
 const days=(date.getTime()-Date.UTC(2000,0,6,18,14))/86400000;
 const cycle=((days/29.530588)%1+1)%1;
 return phases[Math.round(cycle*8)%8];
}
export default function MoonPhases(){
 const [today,setToday]=useState<Date|null>(null);
 const [month,setMonth]=useState<Date|null>(null);
 const [selected,setSelected]=useState(1);
 useEffect(()=>{const now=new Date();setToday(now);setMonth(new Date(now.getFullYear(),now.getMonth(),1));setSelected(now.getDate())},[]);
 if(!today||!month)return <section className="moon-calendar" aria-label="月相日历"><div className="moon-calendar-heading">月相日历</div></section>;
 const year=month.getFullYear(),m=month.getMonth();
 const count=new Date(year,m+1,0).getDate(),offset=(month.getDay()+6)%7;
 const choose=(delta:number)=>{setMonth(new Date(year,m+delta,1));setSelected(1)};
 const date=new Date(year,m,selected,12);
 return <section className="moon-calendar" aria-label="月相日历">
  <div className="moon-calendar-heading"><span>月相日历</span><div><button onClick={()=>choose(-1)} aria-label="上个月"><ChevronLeft size={14}/></button><span aria-live="polite">{year} · {String(m+1).padStart(2,'0')}</span><button onClick={()=>choose(1)} aria-label="下个月"><ChevronRight size={14}/></button></div></div>
  <div className="moon-calendar-grid">
   {['一','二','三','四','五','六','日'].map(d=><small key={d} className="moon-weekday">{d}</small>)}
   {Array.from({length:offset},(_,i)=><span key={'blank'+i} aria-hidden="true"/>)}
   {Array.from({length:count},(_,i)=>{
    const day=i+1,phase=phaseFor(new Date(year,m,day,12));
    const isToday=year===today.getFullYear()&&m===today.getMonth()&&day===today.getDate();
    return <button key={day} className={'moon-day '+(day===selected?'is-selected':'')} aria-current={isToday?'date':undefined} aria-pressed={day===selected} aria-label={`${m+1}月${day}日，${phase.name}（估算）${isToday?'，今天':''}`} onClick={()=>setSelected(day)}>
     <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth=".8" opacity=".4"/>{phase.path&&<path d={phase.path} fill="currentColor" fillOpacity=".65"/>}</svg><span>{day}</span>
    </button>;
   })}
  </div>
  <div className="moon-calendar-note"><span>{m+1}月{selected}日 · {phaseFor(date).name}</span><button onClick={()=>{const now=new Date();setToday(now);setMonth(new Date(now.getFullYear(),now.getMonth(),1));setSelected(now.getDate())}}>今天</button></div>
  <small className="moon-calendar-estimate">月相为近似示意</small>
 </section>;
}
