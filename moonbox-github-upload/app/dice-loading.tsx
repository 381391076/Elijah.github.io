import type {CSSProperties} from 'react';

export default function DiceLoading(){
 return <div className="dice-loading" role="status">
  <div className="moon-water" aria-hidden="true">
   {[0,1,2,3].map(i=><div className={'water-ring water-cluster-'+i} key={i}><i/><i/><i/></div>)}
   <div className="water-stars">{Array.from({length:16},(_,i)=><i key={i} style={{left:(12+i*37%78)+'%',top:(12+i*23%74)+'%',animationDelay:(i*-.23)+'s'} as CSSProperties}>{i%5===0?'✦':'·'}</i>)}</div>
   <div className="butterfly-flight"><svg className="water-butterfly" viewBox="0 0 80 70" fill="none">
    <g className="butterfly-left"><path d="M40 35C32 8 6 3 9 24C10 36 25 40 40 38C18 35 14 54 24 58C35 61 39 44 40 35Z" fill="#f6fbff" fillOpacity=".9" stroke="#e5edff" strokeWidth="1.2"/><path d="M39 35 17 19M38 39 25 51" stroke="#b6c9df" strokeOpacity=".7"/></g>
    <g className="butterfly-right"><path d="M40 35C48 8 74 3 71 24C70 36 55 40 40 38C62 35 66 54 56 58C45 61 41 44 40 35Z" fill="#f6fbff" fillOpacity=".9" stroke="#e5edff" strokeWidth="1.2"/><path d="m41 35 22-16M42 39l13 12" stroke="#b6c9df" strokeOpacity=".7"/></g>
    <path d="M40 28v18m0-18-5-7m5 7 5-7" stroke="#ecf5ff" strokeWidth="1.6" strokeLinecap="round"/>
   </svg></div>
  </div>
  <div className="dice-loading-copy"><strong>星光落水，答案将至…</strong><small>静静地，想一想你的问题。</small></div>
 </div>;
}
