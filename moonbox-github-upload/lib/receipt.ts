import {hexagram, type DrawnCard, liuren, castDice, drawLifeTopic} from './oracle';
import {buildTarotTakeaway} from './tarot-reading';
import {diceInsight} from './dice-insight';
import calendar from './receipt-almanac.json';
export type ReceiptResult={kind:'tarot';cards:DrawnCard[];free?:boolean}|{kind:'liuyao';values:number[]}|{kind:'liuren';data:ReturnType<typeof liuren>}|{kind:'dice';data:ReturnType<typeof castDice>}|{kind:'life';data:ReturnType<typeof drawLifeTopic>};
export function receiptReading(r:ReceiptResult,question:string){
 switch(r.kind){
 case 'tarot':return {mode:'塔罗',lines:r.cards.map(c=>c.position+' · '+c.name+' · '+(c.isReversed?'逆位':'正位')),advice:buildTarotTakeaway(r.cards,question,r.free)};
 case 'liuyao':{const b=hexagram(r.values),c=hexagram(r.values,true);return {mode:'六爻',lines:[b.name+'卦',r.values.some(v=>v===6||v===9)?'变卦 · '+c.name:'静卦 · 无动爻'],advice:b.prompt+(b.name!==c.name?' '+c.prompt:'')};}
 case 'liuren':return {mode:'小六壬',lines:[r.data.palace.name,r.data.palace.key],advice:r.data.palace.text};
 case 'dice':{const d=diceInsight(r.data.planet,r.data.sign,r.data.house);return {mode:'星骰',lines:[d.title],advice:d.paragraphs[0]};}
 case 'life':return {mode:'生命课题',lines:[r.data.name,r.data.subtitle],advice:r.data.action};
 }
}
export function beijingDate(now=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);}
const dailyNotes=[
 {yi:['整理空间','认真倾听'],ji:['急于求成','勉强自己']},
 {yi:['出门走走','联系朋友'],ji:['临时揽事','过度消耗']},
 {yi:['完成一件小事','留点空白'],ji:['同时开太多头','反复纠结']},
 {yi:['表达心意','照顾日常'],ji:['替人猜答案','忽略休息']},
 {yi:['整理计划','尝试新方法'],ji:['冲动承诺','苛求完美']},
 {yi:['慢慢沟通','给自己充电'],ji:['带着情绪争辩','硬撑到底']},
 ];
// Original everyday suggestions, distinct from the traditional almanac source.
export function dailyReceipt(now=new Date()){const date=beijingDate(now);let hash=0;for(const c of date)hash=(hash*31+c.charCodeAt(0))>>>0;return {date,almanac:(calendar as Record<string,{lunar:string;yi:string[];ji:string[]}>)[date]??null,notes:dailyNotes[hash%dailyNotes.length]};}
