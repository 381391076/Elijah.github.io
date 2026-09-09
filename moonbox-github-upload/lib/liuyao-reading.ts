import {hexagram} from './oracle';

// Line values are always ordered from the bottom upward, as in the coin caster.
// These are image/position reflections, not a Na Jia or calendar-strength chart.
const trigramNotes:Record<string,{inner:string;outer:string;action:string}>={
 乾:{inner:'有主动推进、建立方向的力量，也要留意是否把所有责任都放在自己身上',outer:'外部更看重明确的行动与承担，只有想法而没有落实可能难以形成共识',action:'选定一个优先目标，说清这次能够完成的范围'},
 坤:{inner:'更适合整理资源、耐心配合，避免把承接变成没有边界的付出',outer:'需要照顾承载条件与协作基础，给过程留下消化和调整的余地',action:'盘点可以获得的支持，把责任分给合适的人'},
 震:{inner:'启动的意愿较强，也容易被突然出现的信息打乱节奏',outer:'变化或新动静值得关注，先分清需要立即回应与可以稍后处理的部分',action:'为一个可能的变化准备替代安排，先恢复节奏再行动'},
 巽:{inner:'可以通过持续的小调整进入问题，不必一次把所有分歧解决',outer:'沟通和反馈需要逐步传递，表达清楚比施加压力更有帮助',action:'把一个修改意见落实，再检查对方是否理解了变化'},
 坎:{inner:'需要辨认不确定和风险，不能只靠反复设想代替实际确认',outer:'有些条件仍不清楚，适合逐步验证，给失误留下修正空间',action:'列出最影响推进的一项未知，先通过小范围尝试核实'},
 离:{inner:'需要看清事实及依赖条件，留意是否过度依靠一种评价或单一信息',outer:'清晰度和可理解性值得检查，表面的亮眼需要实际内容支撑',action:'把想表达的重点写成一句话，请别人复述理解'},
 艮:{inner:'适合先停下来确认边界，区分必要的克制与因为担忧而不敢开始',outer:'某些限制需要被尊重，继续用力之前先看看是否需要换一条路',action:'明确一项暂不推进的内容，把精力留给仍能改善的部分'},
 兑:{inner:'交流和表达可以带来新的理解，也要允许不同意见出现',outer:'真实回应比表面一致更有价值，不必为了气氛而省略重要问题',action:'邀请一次具体反馈，问清哪里清楚、哪里让人犹豫'},
};
const stages=[
 {name:'起步与基础',text:'从爻位看，可以先检查事情的起点：必要准备是否具备，第一步是否太大。',action:'先验证最小的一步，不急着把后续承诺全部做满'},
 {name:'日常执行',text:'从爻位看，重点落在内部执行：日常做法能否持续，资源是否跟得上。',action:'找一个重复耗时的环节，调整后比较实际消耗'},
 {name:'由内向外的交接',text:'三爻在下卦的末端，可以借此检查从准备走向实际接触时的衔接。',action:'走一遍完整流程，优先处理让人停顿或需要额外解释的地方'},
 {name:'进入外部情境',text:'四爻进入上卦，可以关注新的环境、协作对象和需要重新适应的条件。',action:'明确双方的范围与期待，再安排一次小规模协作'},
 {name:'统筹与责任',text:'五爻的位置可以用来检查目标、决策和承担是否一致。',action:'确认谁作决定、谁执行，以及怎样判断这一步完成'},
 {name:'收尾与后续',text:'上爻处于一卦的末端，可以关注收尾、反馈及进入下一阶段的条件。',action:'安排一次回看，记录仍需处理的问题和可以停止的投入'},
];
const xuLines:Record<number,{quote:string;text:string;action:string}>={
 3:{quote:'九三：需于泥，致寇至。',text:'“泥”的意象提示越急着往前，越可能陷入难以脱身的处境。可把注意力放在已经看见、却尚未处理的小障碍上；这不是预告会出现敌人，而是提醒别让准备中的问题进入下一环节。',action:'列出已知问题，先解决最容易影响他人理解或操作的一项，暂缓继续叠加内容'},
 6:{quote:'上六：入于穴，有不速之客三人来，敬之终吉。',text:'这段爻辞可以用来思考计划之外的反馈与参与者。“敬之”强调认真对待来者，不必把不同意见都看作否定；也不能据此断定一定出现三个人或结果必然顺利。',action:'准备“已支持、待处理、暂不支持”的范围说明，遇到意外反馈先记录，再决定是否纳入下一轮'},
};
function fullName(h:ReturnType<typeof hexagram>){return h.upper.name===h.lower.name?`${h.name}为${h.upper.nature}`:`${h.upper.nature}${h.lower.nature}${h.name}`;}
export function buildLiuyaoReading(values:number[],question=''){
 const base=hexagram(values), changed=hexagram(values,true);
 const moving=values.flatMap((v,i)=>v===6||v===9?[i+1]:[]);
 const presentation=/网页|网站|界面|展示|演示|发布|作品|创作/.test(question);
 const relationship=/感情|关系|伴侣|恋爱|复合/.test(question);
 const title=fullName(base), changedTitle=fullName(changed);
 const lineReadings=moving.map(n=>{
  const value=values[n-1], yang=value===9;
  const lineName=n===1?`初${yang?'九':'六'}`:n===6?`上${yang?'九':'六'}`:`${yang?'九':'六'}${['','一','二','三','四','五'][n]}`;
  const source=base.name==='需'?xuLines[n]:undefined;
  return {number:n,title:`${lineName} · ${stages[n-1].name}`,change:yang?'老阳发动，阳爻变阴爻':'老阴发动，阴爻变阳爻',quote:source?.quote,text:source?.text??`${stages[n-1].text}${yang?'阳转阴可作为放缓强推、增加倾听或保留余量的观察角度。':'阴转阳可作为把等待转为明确表达、补足行动的观察角度。'}`,action:source?.action??stages[n-1].action,source:source?'https://ctext.org/book-of-changes/xu':undefined};
 });
 const xuToZhongfu=base.name==='需'&&changed.name==='中孚'&&moving.join(',')==='3,6';
 const core=xuToZhongfu?`这组卦可以沿着“补齐条件—处理交接中的卡点—认真接住反馈”来理解。${presentation?'更适合先把关键流程准备好，再做小范围展示；后续是否顺利，要看暴露的问题有没有得到处理。':'先准备再尝试，不必无限等待，也不宜跳过已知问题。'}`:`本卦「${base.name}」的重点是：${base.prompt}${moving.length?`第${moving.join('、')}爻发动，变为「${changed.name}」，可进一步关注：${changed.prompt}`:'六爻均静，本次先围绕现有条件与做法展开，不另设一个变化结果。'}`;
 const baseText=base.name==='需'?'“需”可以理解为等待条件到位：下乾有行动意愿，上坎提醒留意风险与未知。重点不在一直等，而在辨认什么可以准备、什么需要实际验证；推进的幅度应与已具备的条件相称。':`「${base.name}」提示：${base.prompt}把这句话放回眼前的事情，可以先找出一项已经具备的条件和一项仍在消耗精力的问题，再决定哪些行动值得保持、哪些需要调整。`;
 const changedText=!moving.length?'没有动爻，本卦与变卦相同。这里不将同一个卦重复解读成“未来结果”；可以等现实条件或反馈发生变化后，再重新评估。':changed.name==='中孚'?'“中孚”把重点带向真实、信任与内外一致。作为变卦，可以用来检查调整之后，表达与行动是否相符、承诺是否能够兑现。它提供一个值得靠近的方向，并不保证别人一定认可。':`「${changed.name}」提示：${changed.prompt}与本卦对照，下一轮可以把关注点从“${base.prompt.replace(/。$/,'')}”移向“${changed.prompt.replace(/。$/,'')}”。这是调整时的观察方向，不是已经确定的结果。`;
 const practical=presentation?[
 '选一个最重要的展示任务，请一个不了解项目的人独立走完；记录停顿、误解和需要解释的地方，不同时改动所有内容。',
 lineReadings.length?`${lineReadings[0].action}。`:`${trigramNotes[base.lower.name].action}。`,
 '把反馈分成影响主要流程、影响理解和个人偏好三类。先处理前两类，再用同一任务复测，比较是否更容易独立完成。',
 ]:relationship?[
 '选一件具体互动，分清实际发生的事、自己的感受和仍未说清的需要。',
 `${lineReadings[0]?.action??trigramNotes[base.lower.name].action}；将它落实为一次可以明确回应的请求，而不是替对方判断想法。`,
 '约定一次合适的回看时间，观察沟通是否更清楚、边界是否被尊重，再决定下一步。',
 ]:[
 `先围绕「${base.name}」整理当前条件：列出一项已经具备的支持和一项尚未确认的限制。`,
 `${lineReadings[0]?.action??trigramNotes[base.lower.name].action}。`,
 `${moving.length?`以「${changed.name}」的提示作为回看角度。`:''}完成一次小尝试后，记录哪些条件变了、哪些问题仍在，再调整投入。`,
 ];
 return {title,changedTitle,moving,core,baseText,inner:`下卦${base.lower.name}（${base.lower.nature}）：${trigramNotes[base.lower.name].inner}。`,outer:`上卦${base.upper.name}（${base.upper.nature}）：${trigramNotes[base.upper.name].outer}。`,lines:lineReadings,changedText,practical,source:base.name==='需'?'https://ctext.org/book-of-changes/xu':undefined,changedSource:changed.name==='中孚'?'https://ctext.org/book-of-changes/zhong-fu':undefined};
}
