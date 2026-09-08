import {ZodiacWheel} from './astro-symbol';
import {Leaf} from 'lucide-react';
export default function ModeIcon({mode}:{mode:string}){
 if(mode==='liuyao')return <svg className="oracle-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 3a13 13 0 1 0 0 26 13 13 0 0 0 0-26ZM12 12h8v8h-8Z" fill="currentColor" fillOpacity=".15" fillRule="evenodd"/><circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.6"/><circle cx="16" cy="16" r="10.2" stroke="currentColor" strokeWidth=".7"/><rect x="12" y="12" width="8" height="8" rx=".6" stroke="currentColor" strokeWidth="1.6"/><path d="M14 7.5h4M14 24.5h4M7.5 14v4M24.5 14v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
 if(mode==='liuren')return <svg className="oracle-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17h18l-2 8H9ZM5 17h22M10 25l-1 4m13-4 1 4M7 19H4c-3 0-3-5 0-5h2m19 5h3c3 0 3-5 0-5h-2"/><path d="M12 17v-6m8 6v-6M16 13V8m-4 0c-4-3 5-4 1-7m7 7c-3-2 3-3 1-5"/><path d="M13 21h6" opacity=".5"/></svg>;
 if(mode==='tarot')return <svg className="oracle-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m8 7-3 1a2 2 0 0 0-1 2l4 18a2 2 0 0 0 2 1l10-2" opacity=".5"/><rect x="10" y="3" width="17" height="25" rx="2.5"/><path d="M20 9a6 6 0 1 0 3 9 5.5 5.5 0 0 1-3-9Z" fill="currentColor" fillOpacity=".07"/><path d="m23 7 .7 1.8 1.8.7-1.8.7L23 12l-.7-1.8-1.8-.7 1.8-.7Z" strokeWidth=".7"/><path d="M14 6h2m5 19h2" opacity=".6"/></svg>;
 if(mode==='life')return <Leaf className="oracle-icon" strokeWidth={1.3}/>;
 return <ZodiacWheel className="oracle-icon"/>;
}

