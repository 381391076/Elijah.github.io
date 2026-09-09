import {hexagram, type DrawnCard, liuren, castDice, drawLifeTopic} from './oracle';
import {buildTarotReading, suggestTopic} from './tarot-reading';
import {diceInsight} from './dice-insight';
import calendar from './receipt-almanac.json';
export type ReceiptResult={kind:'tarot';cards:DrawnCard[];free?:boolean}|{kind:'liuyao';values:number[]}|{kind:'liuren';data:ReturnType<typeof liuren>}|{kind:'dice';data:ReturnType<typeof castDice>}|{kind:'life';data:ReturnType<typeof drawLifeTopic>};
export function receiptReading(r:ReceiptResult,question:string){
 switch(r.kind){
 case 'tarot':return {mode:'塔罗',lines:r.cards.map(c=>c.position+' · '+c.name+' · '+(c.isReversed?'逆位':'正位')),advice:buildTarotReading(r.cards,suggestTopic(question),r.free,question)?.core||''};
 case 'liuyao':{const b=hexagram(r.values),c=hexagram(r.values,true);return {mode:'六爻',lines:[b.name+'卦',r.values.some(v=>v===6||v===9)?'变卦 · '+c.name:'静卦 · 无动爻'],advice:b.prompt+(b.name!==c.name?' '+c.prompt:'')};}
 case 'liuren':return {mode:'小六壬',lines:[r.data.palace.name,r.data.palace.key],advice:r.data.palace.text};
 case 'dice':{const d=diceInsight(r.data.planet,r.data.sign,r.data.house);return {mode:'星骰',lines:[d.title],advice:d.paragraphs[0]};}
 case 'life':return {mode:'生命课题',lines:[r.data.name,r.data.subtitle],advice:r.data.action};
 }
}
export function beijingDate(now=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);}
const lots=[['微光','不必照亮整条路，先看清脚下的一步。'],['听风','把急着给出的答案，换成一次认真倾听。'],['新芽','给刚刚开始的事一点耐心，今天只照顾一个小进展。'],['留白','为自己空出十分钟，让心意慢慢落定。'],['归舟','走得远时，也记得照顾让你安心的日常。'],['晴窗','打开一扇窗，也向一个可靠的人说出你的需要。'],['松弦','稍稍放松握紧的手，有些事情才能重新流动。'],['拾光','记下今天值得感谢的一件小事，把它留给以后的自己。'],['初行','不必等到完全准备好，试一个可以回头的小步骤。'],['清泉','把想象与已经发生的事分开，答案会清楚一些。'],['花信','认真表达一次喜欢，不必预先猜测所有回应。'],['远山','先选一个方向，再把它变成今天能完成的小事。']];
export function dailyReceipt(now=new Date()) {const date=beijingDate(now);let hash=0;for(const c of date)hash=(hash*31+c.charCodeAt(0))>>>0;const n=hash%lots.length;return {date,almanac:(calendar as Record<string,{lunar:string;yi:string[];ji:string[]}>)[date]??null,lot:{number:n+1,title:lots[n][0],text:lots[n][1]}};}
