'use client';
import ReceiptPrinter from './receipt-printer';
import TarotSymbol from './tarot-symbol';
import TarotSummary from './tarot-summary';
import LiuyaoDetails from './liuyao-details';
import {houseNotes} from '@/lib/astrology-summaries';
import DiceDocumentReading from './dice-document-reading';
import DiceSummary from './dice-summary';
import CastCoin from './cast-coin';
import DeviceKeyIcon from './device-key-icon';
import LifeTopicIcon from './life-topic-icon';
import DiceLoading from './dice-loading';
import TarotLoading from './tarot-loading';
import ModeIcon from './mode-icon';
import AstroSymbol from './astro-symbol';
import {useState,useEffect,useRef,useCallback} from 'react';
import {ArrowLeft,ChevronRight,Sparkles,CircleHelp} from 'lucide-react';
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from '@/components/ui/select';
import {RadioGroup,RadioGroupItem} from '@/components/ui/radio-group';
import {Switch} from '@/components/ui/switch';
import {modes,drawLifeTopic,castCoins,hexagram,liuren,hours,palaces,drawTarot,castDice,planets,planetExamples,zodiacElements,signs,houses,type DrawnCard} from '@/lib/oracle';

type View='menu'|'setup'|'result';
type Result={kind:'liuyao';values:number[];coins:number[]}|{kind:'liuren';data:ReturnType<typeof liuren>}|{kind:'tarot';cards:DrawnCard[];free?:boolean}|{kind:'dice';data:ReturnType<typeof castDice>}|{kind:'life';data:ReturnType<typeof drawLifeTopic>};
function Lines({values,changed=false}:{values:number[];changed?:boolean}){
 return <div className="hex-lines" aria-label={changed?'变卦爻象':'本卦爻象'}>{[5,4,3,2,1,0].map(i=>{const v=values[i];const moving=v===6||v===9;const yang=changed&&moving?v===6:v%2===1;return <div key={i} className={'yao '+(v?'':'unfilled')} aria-label={'第'+(i+1)+'爻：'+(v?(yang?'阳':'阴')+(moving?'，动爻':''):'待摇')}><small>{i+1}</small><span className={'yao-stroke '+(yang?'yang':'yin')}>{v&&<><i/><i/></>}</span><b>{!changed&&moving?(v===6?'×':'○'):''}</b></div>})}</div>
}
function InitialInstructions(){return <><div className="eyebrow"><span>HOW TO PLAY</span><CircleHelp size={15}/></div><h2>给直觉，一点空间。</h2>{[['先安静，再提问','在心里放一个具体的问题，选择与你此刻契合的方式。'],['轻按星芒确认键','摇卦、抽牌，或掷出星骰。每一次，都从当下开始。'],['把答案留给自己','读一读象征，也听一听自己。你始终拥有选择的自由。']].map(([a,b],i)=><div className="instruction" key={a}><span>0{i+1}</span><div><h3>{a}</h3><p>{b}</p></div></div>)}<div className="quiet-note"><Sparkles size={21}/><p>不是每个问题，<br/>都需要马上有答案。</p></div></>}
export default function OracleExperience(){
 const [selected,setSelected]=useState(0),[view,setView]=useState<View>('menu'),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const [result,setResult]=useState<Result|null>(null),[values,setValues]=useState<number[]>([]);
 const [question,setQuestion]=useState(''),[count,setCount]=useState('3'),[reversals,setReversals]=useState(true);
 const [month,setMonth]=useState('1'),[day,setDay]=useState('1'),[hour,setHour]=useState('1');
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null),lock=useRef(false);
 const [litKey,setLitKey]=useState<'next'|'select'|'back'|null>(null);
 const glowTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const lightKey=useCallback((key:'next'|'select'|'back')=>{if(glowTimer.current)clearTimeout(glowTimer.current);setLitKey(key);glowTimer.current=setTimeout(()=>setLitKey(null),1200)},[]);
 useEffect(()=>()=>{if(glowTimer.current)clearTimeout(glowTimer.current)},[]);
 const mode=modes[selected];
 const enter=useCallback((index:number)=>{if(lock.current)return;lightKey('select');setSelected(index);setView('setup');setResult(null);setValues([]);setError('')},[lightKey]);
 const back=useCallback(()=>{if(lock.current)return;lightKey('back');setView('menu');setError('')},[lightKey]);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current)},[]);
 const activate=useCallback(async()=>{
  if(lock.current)return {busy:true};
  lightKey('select');
  if(view==='menu'){enter(selected);return {stage:'setup',mode:mode.id}}
  if(view==='result'&&!(mode.id==='liuyao'&&values.length<6)){enter(selected);return {stage:'setup',mode:mode.id}}
  try{
   if(mode.id==='liuren')liuren(Number(month),Number(day),Number(hour));
   setError('');lock.current=true;setBusy(true);
   await new Promise<void>(resolve=>{timer.current=setTimeout(resolve,mode.id==='dice'||mode.id==='tarot'?2400:650)});
   let next:Result;
   if(mode.id==='liuyao'){const roll=castCoins();const nextValues=[...values,roll.value];setValues(nextValues);next={kind:'liuyao',values:nextValues,coins:roll.coins}}
   else if(mode.id==='liuren')next={kind:'liuren',data:liuren(Number(month),Number(day),Number(hour))};
   else if(mode.id==='tarot'){const free=count==='free';const cards=drawTarot(free?3:Number(count),reversals);next={kind:'tarot',free,cards:free?cards.map((c,i)=>({...c,position:['左牌','中牌','右牌'][i]})):cards}}
   else if(mode.id==='life')next={kind:'life',data:drawLifeTopic()};
   else next={kind:'dice',data:castDice()};
   setResult(next);setView('result');return next;
  }catch(e){const message=e instanceof Error?e.message:'暂时无法起卦，请重试';setError(message);return {error:message}}
  finally{lock.current=false;setBusy(false)}
 },[view,selected,mode.id,month,day,hour,count,reversals,values,enter,lightKey]);
 const actionRef=useRef(activate),enterRef=useRef(enter),stateRef=useRef({view,selected,result});actionRef.current=activate;enterRef.current=enter;stateRef.current={view,selected,result};
 useEffect(()=>{
  const key=(e:KeyboardEvent)=>{const el=e.target as HTMLElement; if(el.closest('input,textarea,select,button,[role="combobox"],[role="radiogroup"],[role="switch"],[data-slot="select-content"]'))return;
   if(e.key==='ArrowDown'&&view==='menu'){e.preventDefault();lightKey('next');setSelected(x=>(x+1)%modes.length)}
   if(e.key==='ArrowUp'&&view==='menu'){e.preventDefault();lightKey('next');setSelected(x=>(x+modes.length-1)%modes.length)}
   if(e.key==='Enter'){e.preventDefault();void activate()}
   if(e.key==='Escape'){e.preventDefault();back()}
  };window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);
 },[view,activate,back,lightKey]);
 useEffect(()=>{
  type Tool={name:string;description:string;inputSchema:object;annotations:object;execute:(input:unknown)=>unknown};
  const context=(document as Document&{modelContext?:{registerTool:(tool:Tool,options:{signal:AbortSignal})=>void|Promise<void>}}).modelContext;
  if(!context?.registerTool)return;const controller=new AbortController();
  const tools:Tool[]=[
   {name:'start_oracle',description:'选择占卜方式并打开设置。不会抽牌或起卦。',inputSchema:{type:'object',properties:{mode:{type:'string',enum:modes.map(m=>m.id)}},required:['mode'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:async(input)=>{const arg=input as {mode?:string};const i=modes.findIndex(m=>m.id===arg?.mode);if(i<0)throw Error('未知占卜方式');if(lock.current)throw Error('请等待当前操作完成');enterRef.current(i);await new Promise(requestAnimationFrame);return {mode:modes[i].id,stage:'setup'}}},
   {name:'activate_oracle',description:'按下掌机星芒确认键。菜单进入设置；设置起卦或抽牌；六爻每次摇一爻；完成后再次按下返回设置。使用界面当前设置。',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:async(input)=>{if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).length)throw Error('此操作不接受参数');const r=await actionRef.current();await new Promise(requestAnimationFrame);return r}},
   {name:'read_oracle',description:'读取当前占卜方式、屏幕阶段和结果。',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:()=>({...stateRef.current,mode:modes[stateRef.current.selected].id})}
  ];for(const tool of tools){try{Promise.resolve(context.registerTool(tool,{signal:controller.signal})).catch(()=>{})}catch{}}
  return()=>controller.abort();
 },[]);
 const partial=mode.id==='liuyao'&&values.length>0&&values.length<6;
 const actionLabel=view==='menu'?'进入 '+mode.name:view==='setup'?({liuyao:'摇第一爻',liuren:'起课',tarot:'洗牌并抽牌',dice:'掷出星骰',life:'抽一张主题卡'}[mode.id]):partial?'摇第'+(values.length+1)+'爻':'重新开始';
 const base=result?.kind==='liuyao'&&result.values.length===6?hexagram(result.values):null;
 const changed=result?.kind==='liuyao'&&result.values.length===6?hexagram(result.values,true):null;
 const moving=result?.kind==='liuyao'?result.values.map((v,i)=>v===6||v===9?i+1:0).filter(Boolean):[];
 return <><section className="device-stage" aria-label="月匣·月見占卜机"><div className="device"><div className="chassis" aria-hidden="true"><i/><i/><i/></div><div className="loop"/><div className="brand">月匣 · 月見<span>MOON GAZING</span></div><div className="bezel"><div className={'screen '+(busy?'is-busy':'')} aria-busy={busy}><div className="screen-status"><span>✦ {view==='menu'?'ORACLE OS':mode.en}</span><span>▮▮▮</span></div><div className="screen-content" aria-live="polite">
 {view==='menu'?<><div className="screen-heading"><span>今天，想问些什么？</span></div><nav className="mode-menu" aria-label="占卜方式">{modes.map((m,i)=><button key={m.id} onClick={()=>enter(i)} onFocus={()=>setSelected(i)} className={selected===i?'selected':''}><span className="menu-symbol"><ModeIcon mode={m.id}/></span><span>{m.name}<small>{m.en}</small></span><ChevronRight size={16}/></button>)}</nav><div className="screen-footer">{mode.desc}</div></>:
 busy?mode.id==='dice'?<DiceLoading/>:mode.id==='tarot'?<TarotLoading/>:<div className="ritual-loading"><span><ModeIcon mode={mode.id}/></span><strong>{mode.id==='liuyao'?'铜钱落定之前…':mode.id==='life'?'留一刻，听听自己…':'循月日时，寻一宫…'}</strong><small>静静地，想一想你的问题。</small></div>:
 view==='setup'?<div className="setup-screen"><span className="mode-large"><ModeIcon mode={mode.id}/></span><h2>{mode.name}</h2><p>{mode.id==='liuyao'?'三枚铜钱 · 由下而上六次':mode.id==='liuren'?'农历月 · 农历日 · 时辰':mode.id==='tarot'?(count==='free'?'无牌阵 · 左牌 / 中牌 / 右牌':count==='3'?'现状 · 阻碍 · 建议':'一张牌 · 当下提示'):mode.id==='life'?'关系 · 边界 · 成长':'行星 × 星座 × 宫位'}</p><button className="screen-action" onClick={()=>void activate()}>{actionLabel} <span>↵</span></button></div>:
 result?.kind==='liuyao'?<div className="hex-screen"><div className="result-kicker">{base?base.name+' · '+changed?.name:('起卦中 · '+values.length+' / 6')}</div><div className="hex-pair"><div><Lines values={values}/>{base&&<small>本卦</small>}</div>{base&&<div><Lines values={values} changed/><small>变卦</small></div>}</div><div className="screen-footer">{values.length<6?'第 '+values.length+' 爻落定 · 由下而上':moving.length?'动爻：'+moving.join('、'):'静卦 · 无动爻'}</div>{partial&&<button className="screen-action compact" onClick={()=>void activate()}>{actionLabel} ↵</button>}</div>:
 result?.kind==='liuren'?<div className="palace-screen"><div className="result-kicker">此刻落宫</div><h2>{result.data.palace.name}</h2><p>{result.data.palace.key}</p><div className="palace-trail">{result.data.steps.map((s,i)=><span key={i}><small>{['月','日','时'][i]}</small>{palaces[s].name}{i<2?' →':''}</span>)}</div></div>:
 result?.kind==='tarot'?<div className="tarot-screen"><div className="result-kicker">{result.free?'无牌阵 · 观察三张牌的关系':result.cards.length===3?'三张牌 · 现状 / 阻碍 / 建议':'单张牌 · 当下提示'}</div><div className={'tarot-cards '+(result.cards.length===1?'single':'')}>{result.cards.map(c=><div className={'tarot-card '+(c.isReversed?'tarot-reversed':'tarot-upright')} key={c.id}><small>{c.position}</small><span className={c.isReversed?'reversed':''}><TarotSymbol id={c.id} symbol={c.symbol}/></span><b>{c.name}</b><small>{c.isReversed?'逆位':'正位'}</small></div>)}</div><div className="screen-footer">牌影之间，藏着未言的回响。</div></div>:
 result?.kind==='life'?<div className="life-screen"><div className="result-kicker">今日相遇 · 生命课题</div><LifeTopicIcon topic={result.data.name}/><h2>{result.data.name}</h2><p>{result.data.subtitle}</p><div className="screen-footer">留一个问题给自己</div></div>:
 result?.kind==='dice'?<div className="dice-screen"><div className="result-kicker">星辰的三个线索</div><div className="dice-row">{([{kind:'planet' as const,index:result.data.planet,name:planets[result.data.planet][1]},{kind:'sign' as const,index:result.data.sign,name:signs[result.data.sign][1]},{kind:'house' as const,index:result.data.house,name:'第'+(result.data.house+1)+'宫'}]).map(({kind,index,name})=><div key={kind}><span className="die"><AstroSymbol kind={kind} index={index}/></span><b>{name}</b></div>)}</div><div className="screen-footer">什么动力 · 怎样运作 · 在哪里出现</div></div>:null}
 </div></div></div><div className="device-controls"><div><button className={litKey==='next'?'key-lit':''} aria-label="下一个模式" disabled={view!=='menu'||busy} onClick={()=>{lightKey('next');setSelected(x=>(x+1)%modes.length)}}><DeviceKeyIcon kind="next"/></button><span>NEXT</span></div><div><button className={'select-key '+(litKey==='select'||busy?'key-lit':'')} disabled={busy} aria-label={actionLabel} onClick={()=>void activate()}><DeviceKeyIcon kind="select"/></button><span>SELECT</span></div><div><button className={litKey==='back'?'key-lit':''} disabled={view==='menu'||busy} aria-label="返回主菜单" onClick={back}><DeviceKeyIcon kind="back"/></button><span>BACK</span></div></div><div className="device-end"><span>✦</span></div></div><span className="meteor-mark" aria-hidden="true"><svg width="62" height="34" viewBox="0 0 62 34" fill="none"><path d="M3 25C17 25 31 19 43 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/><path d="M8 17C18 16.5 27 13 34 9" stroke="currentColor" strokeWidth=".75" strokeLinecap="round" opacity=".5"/><path d="M22 32C31 29 38 25 44 21" stroke="currentColor" strokeWidth=".7" strokeLinecap="round" opacity=".38"/><path d="M52 3C53 7 54 8 58 9C54 10 53 11 52 15C51 11 50 10 46 9C50 8 51 7 52 3Z" fill="currentColor" fillOpacity=".07" stroke="currentColor" strokeWidth=".85" strokeLinejoin="round"/></svg></span><div className="under-device"><span>↓ 切换</span><span>↵ 确认</span><span>esc 返回</span></div></section>
 <aside className={'reading '+(view==='result'?'has-result':'')} data-view={view} aria-label="操作与解读">
 {view==='menu'?<InitialInstructions/>:<><div className="eyebrow"><span>{view==='setup'?'BEFORE YOUR RITUAL':'YOUR LITTLE READING'}</span><span>0{selected+1}</span></div><h2>{view==='setup'?'这一次，想问什么？':partial?'一爻一摇，慢慢来。':'留给你的线索。'}</h2>
 {view==='setup'?<><label className="question-label" htmlFor="question">心里的问题 <span>选填</span></label><input id="question" className="question-input" maxLength={160} value={question} onChange={e=>setQuestion(e.target.value)} placeholder="例如：如何推进眼前这件事？"/><p className="question-hint">问题只留在当前页面，刷新即清空。</p>
 {mode.id==='tarot'&&<><RadioGroup className="spread-options" value={count} onValueChange={v=>setCount(String(v))} aria-label="牌阵"><label><RadioGroupItem value="1"/> 单张提示</label><label><RadioGroupItem value="3"/> 三张牌阵</label><label><RadioGroupItem value="free"/> 无牌阵三张</label></RadioGroup><label className="switch-row"><span>包含逆位</span><Switch checked={reversals} onCheckedChange={setReversals}/></label><p className="method-copy">从 78 张牌中不重复抽取。{count==='free'?'无牌阵只标注左、中、右，不预设牌位含义；抽牌后可选择直线、发散、汇聚或选择型解读。':'三张牌阵依次对应现状、阻碍、建议。'}开启逆位时，每张牌的正逆位随机决定。</p></>}
 {mode.id==='liuren'&&<><div className="calendar-fields"><label>农历月<input aria-label="农历月" type="number" min="1" max="12" step="1" value={month} onChange={e=>setMonth(e.target.value)}/></label><label>农历日<input aria-label="农历日" type="number" min="1" max="30" step="1" value={day} onChange={e=>setDay(e.target.value)}/></label></div><label className="time-label" id="hour-label">时辰</label><Select value={hour} onValueChange={v=>v&&setHour(v)} items={hours.map((h,i)=>({value:String(i+1),label:h}))}><SelectTrigger className="hour-select" aria-labelledby="hour-label"><SelectValue/></SelectTrigger><SelectContent>{hours.map((h,i)=><SelectItem key={h} value={String(i+1)}>{h}</SelectItem>)}</SelectContent></Select><p className="method-copy">采用「大安起正月，月上起日，日上起时」的顺数法。请手动填写农历；闰月按本月，子时采用你填入的农历日，不自动换日。</p></>}
 {mode.id==='liuyao'&&<p className="method-copy">每次摇三枚铜钱，共六次，从初爻往上记录。有字面记 2，背面记 3：6 老阴、7 少阳、8 少阴、9 老阳。老阴、老阳为动爻。</p>}
 {mode.id==='life'&&<p className="method-copy">从 12 张主题卡中随机抽取一张，围绕关系、边界、成长等话题，留一个自我提问，尝试一件小事。没有标准答案。</p>}
 {mode.id==='dice'&&<p className="method-copy">三颗十二面骰分别对应天体与点、星座、宫位。第一颗含太阳至冥王星，以及南、北交点。依次读出：什么动力被激活、它怎样运作、在哪里出现。</p>}
 <button className="primary-action" disabled={busy} onClick={()=>void activate()}>{busy?'请稍候…':actionLabel}<ChevronRight size={16}/></button>
 </>:
 <div className="reading-body" aria-live="polite">
 {question&&<blockquote>{question}</blockquote>}
 {result?.kind==='liuyao'&&(partial?<><p>已记录 {values.length} 爻，还剩 {6-values.length} 次。</p><div className="coin-results">{result.coins.map((c,i)=><CastCoin key={i} value={c}/>)}</div><p className="method-copy">本次合计 {values.at(-1)}：{({6:'老阴 · 动爻',7:'少阳',8:'少阴',9:'老阳 · 动爻'} as Record<number,string>)[values.at(-1)!]}。继续按星芒确认键，让下一爻落定。</p></>:base&&changed&&<><div className="reading-title"><span>{base.upper.nature}{base.lower.nature}</span><h3>{base.name}卦</h3><p>{base.prompt}</p></div><p>上卦 {base.upper.name}：{base.upper.meaning}。<br/>下卦 {base.lower.name}：{base.lower.meaning}。</p><div className="result-section"><h3>{moving.length?'变卦 · '+changed.name:'静卦 · 无动爻'}</h3><p>{moving.length?changed.prompt:'六爻均不变。可以先围绕本卦主题，观察自己当下的处境。'}</p>{moving.length>0&&<small>第 {moving.join('、')} 爻变动；图中 ○ 为老阳，× 为老阴。</small>}</div><LiuyaoDetails values={result.values} question={question}/></>)}
 {result?.kind==='liuren'&&<><div className="reading-title"><span>时落 · {result.data.palace.key}</span><h3>{result.data.palace.name}</h3></div><p>{result.data.palace.text}</p><div className="reflection"><small>问问自己</small><p>{result.data.palace.ask}</p></div><p className="method-copy">农历 {result.data.month} 月 {result.data.day} 日 · {hours[result.data.hour-1]}时。<br/>月落 {palaces[result.data.steps[0]].name}，日落 {palaces[result.data.steps[1]].name}，时落 {result.data.palace.name}。</p></>}
 {result?.kind==='tarot'&&result.cards.map((c,i)=><div className="card-reading" key={c.id}><span className="card-index">0{i+1}</span><div><small>{c.position} · {c.isReversed?'逆位':'正位'}</small><h3>{c.name}</h3><p>{c.isReversed?c.reversed:c.upright}。</p></div></div>)}
 {result?.kind==='tarot'&&<TarotSummary cards={result.cards} free={result.free} question={question}/>}
 {result?.kind==='life'&&<><div className="reading-title"><span>生命课题 · 自我探索</span><h3>{result.data.name}</h3><p>{result.data.subtitle}</p></div><div className="reflection"><small>问问自己</small><p>{result.data.question}</p></div><div className="result-section"><h3>今天，试一件小事</h3><p>{result.data.action}</p></div><p className="method-copy">{result.data.note}</p></>}
 {result?.kind==='dice'&&<><div className="reading-title"><span>行星 × 星座 × 宫位</span><h3 className="dice-title">{planets[result.data.planet][1]} · {signs[result.data.sign][1]} · 第{result.data.house+1}宫</h3></div><div className="result-section"><h3>动力 · {planets[result.data.planet][1]}</h3><p>{planets[result.data.planet][2]}。</p><p className="dice-example">{planetExamples[result.data.planet]}</p><h3>方式 · {signs[result.data.sign][1]} <span className="element-tag">{zodiacElements[result.data.sign%4].name}</span></h3><p>{signs[result.data.sign][2]}运作。</p><p className="dice-example">{zodiacElements[result.data.sign%4].name}星座（{zodiacElements[result.data.sign%4].signs}）的共同表达：{zodiacElements[result.data.sign%4].style}。</p><h3>领域 · 第{result.data.house+1}宫</h3><p>{houses[result.data.house]}。</p><small>{houseNotes[result.data.house]}</small></div><DiceDocumentReading key={[result.data.planet,result.data.sign,result.data.house].join('-')} {...result.data}/><DiceSummary {...result.data}/></>}
 <button className="primary-action" disabled={busy} onClick={()=>void activate()}>{busy?'请稍候…':actionLabel}<ChevronRight size={16}/></button>
 {result&&!partial&&!busy&&<ReceiptPrinter result={result} question={question}/>}
 </div>}
 {error&&<p className="error" role="alert">{error}</p>}
 <button className="text-button" onClick={back} disabled={busy}><ArrowLeft size={14}/> 返回主目录</button></>}
 
 </aside></>
}

