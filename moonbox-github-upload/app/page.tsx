'use client';
import MoonPhases from './moon-phases';
import OracleExperience from './oracle-experience';
import { Moon } from 'lucide-react';
export default function Home(){
 return <main className="app"><header className="topbar"><a href="/" className="wordmark"><Moon size={18}/> 月匣 · 月見 <span>MOON GAZING</span></a><span className="edition">NO. 01 / THE ORACLE EDITION</span><span className="status"><i/> 随时，问问宇宙</span></header><div className="workspace"><aside className="intro"><div className="eyebrow">A LITTLE SPACE FOR THE UNKNOWN</div><h1>把未知，<br/>放进口袋。</h1><p className="english">A small ritual.<br/><em>A little clarity.</em></p><div className="intro-bottom"><span>借一束月光，与自己相见。</span><p>五种指引，慢慢听见心里的答案。</p></div><MoonPhases/></aside><OracleExperience/></div><footer className="page-footer"><span>月匣 · 月見 © 2026</span><span>MADE FOR YOUR QUIET MOMENTS</span><span>一点仪式，一点好奇。 ✦</span></footer><p className="m-0 pb-3 text-center text-xs leading-relaxed text-[#7f8d96]">象征解读，用于娱乐与自我探索。</p></main>
}
