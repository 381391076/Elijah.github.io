'use client';
import {useEffect,useMemo,useRef,useState} from 'react';
import {Dialog} from '@base-ui/react/dialog';
import {Printer,Download,Share2,X,RotateCcw} from 'lucide-react';
import {dailyReceipt,receiptReading,type ReceiptResult} from '@/lib/receipt';
import {receiptArt,type ReceiptSection} from '@/lib/receipt-art';
type Snapshot=ReturnType<typeof dailyReceipt>&ReturnType<typeof receiptReading>;
export default function ReceiptPrinter({result,question}:{result:ReceiptResult;question:string}){
 const [open,setOpen]=useState(false),[data,setData]=useState<Snapshot|null>(null),[phase,setPhase]=useState<'loading'|'printing'|'falling'|'ready'>('loading'),[include,setInclude]=useState(false),[message,setMessage]=useState(''),[saving,setSaving]=useState(false),[run,setRun]=useState(0),[assetReady,setAssetReady]=useState(false);
 const popup=useRef<HTMLDivElement>(null),done=phase==='ready';
 useEffect(()=>{if(!open||!assetReady)return;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;setPhase(reduced?'ready':'printing');if(reduced)return;const fall=setTimeout(()=>setPhase('falling'),2200),finish=setTimeout(()=>setPhase('ready'),3700);return()=>{clearTimeout(fall);clearTimeout(finish);};},[open,run,assetReady]);
 function start(){setData({...dailyReceipt(),...receiptReading(result,question)});setInclude(false);setMessage('');setPhase('loading');setOpen(true);}
 const sections=useMemo<ReceiptSection[]>(()=>data?[{title:data.mode==='塔罗'?'本次牌面':'本次 · '+data.mode,text:data.lines.map((s,i)=>String(i+1).padStart(2,'0')+'  '+s).join('\n')},{title:'此刻，向前一步',text:data.advice},...(include&&question?[{title:'此刻的问题',text:question}]:[]),{title:'今日行事笺',text:'宜 · '+data.notes.yi.join('、')+'\n忌 · '+data.notes.ji.join('、')}]:[],[data,include,question]);
 const art=useMemo(()=>data?receiptArt(data.date,sections):null,[data,sections]);
 async function save(share=false){if(!data||!art||saving)return;setSaving(true);setMessage('');try{
 const img=new Image();img.src=art.url;await img.decode();const canvas=document.createElement('canvas');canvas.width=art.width*2;canvas.height=art.height*2;const ctx=canvas.getContext('2d');if(!ctx)throw Error('无法生成图片');ctx.drawImage(img,0,0,canvas.width,canvas.height);
 const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('生成失败')),'image/png'));const file=new File([blob],'月下回笺-'+data.date+'.png',{type:'image/png'});
 if(share&&navigator.canShare?.({files:[file]})){await navigator.share({files:[file],title:'月匣 · 月下回笺'});setMessage('已打开分享');}else{const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=file.name;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);setMessage(share?'灵笺已保存，可以发送给朋友。':'灵笺已保存');}
 }catch(e){if(!(e instanceof Error&&e.name==='AbortError'))setMessage('暂时未能保存，请再试一次。');}finally{setSaving(false);}}
 function replay(){popup.current?.scrollTo({top:0,behavior:'instant'});setPhase('printing');setRun(n=>n+1);}
 return <><button className="receipt-trigger" onClick={start}><Printer size={18}/><span>印一笺月语<small>把这一次的答案，带走</small></span><span aria-hidden="true">↗</span></button>
 <Dialog.Root open={open} onOpenChange={setOpen}><Dialog.Portal><Dialog.Backdrop className="receipt-backdrop"/><Dialog.Popup ref={popup} className={'receipt-popup receipt-v2 phase-'+phase}>
 <Dialog.Close className="receipt-close" aria-label="收起小票"><X size={20}/></Dialog.Close><Dialog.Title className="receipt-heading">星月低语，落于此笺</Dialog.Title><Dialog.Description className="receipt-subheading">{done?'灵笺已印成，愿你有所回响':phase==='falling'?'接住这一刻的回响':phase==='loading'?'月匣正在醒来…':'让答案，缓缓落在纸上…'}</Dialog.Description>
 {data&&art&&<><div className="lunar-printer-stage" key={run} aria-hidden="true"><div className="lunar-printer-object"><img className="lunar-printer-image" src="/images/lunar-printer.png" alt="" onLoad={()=>setAssetReady(true)} onError={()=>{setMessage('机身图片暂未加载，已为你展开灵笺。');setAssetReady(true);}}/><div className="lunar-feed"><img src={art.url} alt=""/></div></div></div>
 <article className="lunar-final-paper" hidden={!done} aria-label="月下回笺"><img src={art.url} width={art.width} height={art.height} alt=""/><div className="sr-only"><h3>月匣 · 月見</h3><p>{data.date} · 北京时间</p>{sections.map(s=><section key={s.title}><h4>{s.title}</h4><p>{s.text}</p></section>)}</div></article>
 <div className="receipt-controls" hidden={!done}>{question&&<label><input type="checkbox" checked={include} onChange={e=>setInclude(e.target.checked)}/> 灵笺中带上我的问题</label>}<div><button disabled={saving} onClick={()=>void save()}><Download size={16}/> 保存灵笺</button><button disabled={saving} onClick={()=>void save(true)}><Share2 size={16}/> 分享</button><button className="receipt-replay" onClick={replay} aria-label="重播打印动画"><RotateCcw size={16}/></button></div><p role="status">{message||'留一纸星月，予此刻的你。'}</p></div></>}
 </Dialog.Popup></Dialog.Portal></Dialog.Root></>;
}
