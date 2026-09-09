import type {DrawnCard} from './oracle';
import {tarotPractice} from './tarot-practice';

// Editorial reflection rules adapted from the Moonlit Mirror interpretation protocol.
// This is a local rule engine, not model-generated text or evidence about the user.
export const readingTopics = {
 general: '通用梳理', design: '网页与创作', work: '工作与协作', love: '感情与关系', growth: '个人成长',
} as const;
export type ReadingTopic = keyof typeof readingTopics;
type Axis = 'start'|'balance'|'clarity'|'change'|'confidence'|'connection';
type Lens = {focus:string; question:string; step:string; axis:Axis};
const major: [Axis,string,string,string,string][] = [
 ['start','用小尝试打开新可能','准备不足或迟迟不敢开始','先确认成本上限，再完成一个小样','把准备清单缩成三项，完成后再决定是否继续'],
 ['start','让已有能力与资源形成行动','目标分散，资源尚未形成合力','选一项已有能力完成可展示的成果','写清本轮唯一目标，暂停无关任务'],
 ['clarity','给尚未说清的感受留出观察空间','直觉与猜测混在一起，关键信息仍不清楚','先记录感受，再找一项独立事实核对','向相关的人确认一个具体疑问，不替沉默补写答案'],
 ['connection','持续照顾一件值得培育的事','照顾他人或作品时耗尽了自己','为投入安排固定时间，也留下恢复空间','减少一项额外付出，明确可持续的投入范围'],
 ['balance','用责任和边界支持推进','控制和规则可能压缩了协商空间','明确谁负责、完成标准和可协商的范围','保留一条必要底线，放开一个非关键细节'],
 ['clarity','借助经验与共同规则学习','沿用的惯例与当前需要可能不匹配','请有经验的人解释一条规则背后的理由','选一条惯例，核对它解决的旧问题是否仍存在'],
 ['connection','让选择与真正重视的价值一致','想兼顾的期待之间存在冲突','分别列出不可放弃的价值与可以协商的条件','把自己的需要和外界期待分开，再比较选项'],
 ['start','集中方向并建立推进节奏','多方向用力或强推可能增加消耗','只推进一个有明确终点的任务','暂停新增目标，找出一个造成反复返工的环节'],
 ['confidence','用温和而稳定的方式面对压力','自我怀疑或耗竭正在影响应对','在表达立场前留出缓冲时间','先减少负担，再用一次可完成的小事恢复掌控感'],
 ['clarity','通过独处回看自己的判断','整理逐渐变成隔离，缺少外部反馈','给反思设定结束时间，并写下一个结论','向可信任的人提出一个范围明确的问题'],
 ['change','分辨变化中可调整的部分','抗拒变化使旧模式不断重演','准备一个不依赖单一条件的替代方案','找出已经改变的一项条件，更新相应安排'],
 ['balance','把事实、责任与判断标准放在一起','偏见或责任不清可能影响判断','按同一标准比较各方的实际行为','列出可核实事实，标出尚无依据的解释'],
 ['change','暂停惯性做法，换一个观察角度','等待或牺牲没有带来新的理解','用另一方的视角重写一次问题','给暂停设期限，明确什么新信息值得继续等'],
 ['change','完成收尾，为新阶段腾出空间','迟迟不肯结束已失效的安排','完成一项必要交接或收尾','把舍不得的投入与现在仍有效的价值分开'],
 ['balance','调和不同需要，让节奏可持续','比例、配合或修改节奏失衡','一次只调整一个变量，观察整体是否更顺','减少同时推进的修改，先统一一项关键标准'],
 ['balance','识别短期满足与长期代价的交换','开始看见依赖，但新的边界尚不稳定','记录一次惯性行为的触发点与代价','先减少一次依赖，准备一个可执行的替代安排'],
 ['change','重新检查已经松动的基础','维持旧结构可能掩盖需要修补的部分','先确认最关键的依赖是否可靠','修复最薄弱的一环后再扩大变动'],
 ['confidence','用希望与持续照顾支持恢复','理想落差或信心低落可能让人否定已有进展','把愿景拆成一个可观察的小进展','记录一项真实改善，用小范围反馈校准期待'],
 ['clarity','分辨不确定的信息与情绪投射','局部正在澄清，但仍不宜过早下结论','核实最影响判断的一条信息','分别记录已确认、待核实与暂时不知道的内容'],
 ['confidence','让清晰的成果被看见与分享','期待过高可能遮住已有成果','展示一个已经完成的部分并收集具体反馈','先定义足够好的标准，再判断是否需要继续润色'],
 ['change','回顾旧选择，回应当下的新认识','自责或回避使新的选择难以落实','说明这次准备改变的一项做法','把自我评价换成对具体行为的复盘'],
 ['change','整合成果并进入下一阶段','缺少收尾使注意力停在未完成处','确认完成标准后整理成果','完成一个必要尾项，再开始新的计划'],
];
const topicExamples: Record<ReadingTopic, Record<Axis,string>> = {
 general: {start:'把想推进的事缩成一个可完成的步骤',balance:'核对时间、精力与责任的分配',clarity:'区分已经发生的事和自己的解释',change:'比较旧安排与现在的需要',confidence:'用实际进展校准期待',connection:'说清需要，也听取对方的真实回应'},
 design: {start:'先做一个可测试的页面或作品片段',balance:'检查信息层级、视觉规则与用户路径是否互相配合',clarity:'确认访问者能否理解用途和下一步',change:'判断旧模块是否仍服务于当前目标',confidence:'用用户反馈代替对理想效果的反复猜测',connection:'区分创作者想表达的内容与访问者需要理解的信息'},
 work: {start:'把目标拆成一次具体交付',balance:'核对分工、工作量和验收标准',clarity:'确认需求、期限和决策人',change:'检查旧流程是否适合当前任务',confidence:'用完成的交付校准对进度的判断',connection:'把合作期待说成双方可以确认的约定'},
 love: {start:'提出一个允许对方自由回应的小邀请',balance:'观察主动联系、照顾与空间是否相互尊重',clarity:'通过对话核对含义，不把回复速度当作内心证据',change:'区分现在的互动与过去的关系经验',confidence:'观察持续的实际行动，不仅依赖想象或担忧',connection:'分别表达需要，不预设彼此必须一致'},
 growth: {start:'把想养成的习惯缩成十分钟练习',balance:'检查目标与睡眠、休息、精力是否相容',clarity:'区分自己的价值与他人的评价',change:'检视曾经有用、如今却消耗自己的习惯',confidence:'记录完成过的事，不只记录不足',connection:'明确需要怎样的支持，并给自己求助的空间'},
};
const plans: Record<ReadingTopic,{check:string; measure:string; pause:string; reflect:string}> = {
 general:{check:'选最近一件具体事情，写下发生的事实、自己的解释和仍缺少的信息。',measure:'在下一次相似情境后回看：问题是否更明确，消耗是否减少，还是出现了新的条件？',pause:'暂缓仅凭一次情绪或这次牌面作不可逆决定。',reflect:'什么现实反馈会让你改变现在的判断？'},
 design:{check:'选一个页面目标，找三位不了解项目的人看首屏五秒，再请他们说明用途和下一步；先记录答案，不替页面解释。',measure:'修改后用同一任务复测，比较能否独立完成、在哪里停顿；样本只作为线索，不当作确定结论。',pause:'暂缓同时更换整套视觉、增加新模块和修改文案，否则难以判断哪项调整有效。',reflect:'如果只保留一个目标，哪些内容真正帮助访问者完成它？'},
 work:{check:'找一个最近返工的任务，核对原需求、实际交付和评价标准分别是什么。',measure:'下一次交付后记录需要澄清的次数、返工原因及是否按约完成，再协商调整。',pause:'暂缓在需求和责任未明确前承诺更多交付。',reflect:'这件事需要你更努力，还是需要双方重新说清标准？'},
 love:{check:'选最近一次具体互动，用“发生了什么—我的感受—我的请求”准备一段表达，避免猜测对方动机。',measure:'在双方约定的下一次沟通中观察：请求是否得到明确回应，边界是否被尊重，行动是否与约定一致。',pause:'暂缓试探、反复追问或用这次牌面替对方作答。',reflect:'你需要的是确定答案，还是一种可以共同建立的相处方式？'},
 growth:{check:'记录三天内一个反复卡住的时刻，包括当时的任务、精力和触发条件，不给自己贴标签。',measure:'一周后比较开始练习的难度和完成后的精力；若持续耗竭，减小目标或寻找支持。',pause:'暂缓把某一次没做到理解为自己不够好。',reflect:'什么程度的改变是你现在能够持续、而非勉强维持的？'},
};
export function suggestTopic(question:string):ReadingTopic {
 const matches: ReadingTopic[]=[];
 if(/网页|网站|设计|创作|作品|排版|界面|产品/.test(question)) matches.push('design');
 if(/工作|同事|职业|项目|上司|求职|面试/.test(question)) matches.push('work');
 if(/感情|恋爱|伴侣|复合|分手|约会|喜欢我/.test(question)) matches.push('love');
 if(/成长|习惯|自信|学习|拖延|自我/.test(question)) matches.push('growth');
 return matches.length===1?matches[0]:'general';
}
const label=(c:DrawnCard)=>`${c.name}·${c.isReversed?'逆位':'正位'}`;
function lens(c:DrawnCard):Lens {
 if(c.id<22){const [axis,up,rev,step,repair]=major[c.id];return {axis,focus:c.isReversed?rev:up,step:c.isReversed?repair:step,question:c.isReversed?'它是否受阻、过度使用，或需要恢复条件':'它是否发挥了作用，还是在此处被过度依赖'};}
 const p=tarotPractice(c)!;
 const rank=(c.id-22)%14;
 return {axis:rank===5?'change':(['start','connection','clarity','balance'] as Axis[])[p.suit],focus:c.isReversed?p.tension:c.upright.split('；')[0],step:p.experiment,question:c.isReversed?'这项张力是否确实出现在你的经历中':'这份能力是否用在了合适的对象和时机上'};
}
export function buildTarotReading(cards:DrawnCard[],topic:ReadingTopic='general',free=false,question='') {
 if(![1,3].includes(cards.length)||cards.some(c=>!Number.isInteger(c.id)||c.id<0||c.id>77)||new Set(cards.map(c=>c.id)).size!==cards.length) return null;
 const lenses=cards.map(lens), last=lenses[lenses.length-1], plan=plans[topic];
 const positioned=cards.length===3&&!free;
 const names=cards.map(label);
 const insights=cards.map((c,i)=>{
 const l=lenses[i], role=positioned?['现状','阻碍','建议'][i]:free?['左牌','中牌','右牌'][i]:'当下提示';
 const reading=role==='阻碍'?`放在阻碍位，需要核对的不是这张牌“好不好”，而是${l.focus}是否让事情难以推进。${c.isReversed?'先观察受阻的条件，不把逆位直接当成失败。':'正位的能力也可能因使用过度、缺少时机或只停留在期待中而成为卡点。'}`:role==='建议'?`这张牌把调整方向落在：${l.step}。它提供一种可尝试的方法，并不保证结果。`:`这张牌提供的观察角度是：${l.focus}。先找一件最近的实际经历对照，符合的部分才值得继续分析。`;
 return {title:`${role}：${names[i]}`,text:reading,context:`放到${readingTopics[topic]}中，可以${topicExamples[topic][l.axis]}。`,check:`核对：${l.question}？`};
 });
 const relations:string[]=[];
 if(positioned){relations.push(`「${names[0]}」关注${lenses[0].focus}；「${names[1]}」则让你检查${lenses[1].focus}。${lenses[0].axis===lenses[1].axis?'两张牌落在同一类问题上：可能不是投入不足，而是同一种做法既支撑现状、又在过度使用时造成阻碍。':'两张牌的关注点不同：只沿着现状的方向继续用力，未必能回应阻碍指出的条件。'}因此，建议牌「${names[2]}」的具体作用是${last.step}，做完后再观察卡点是否变化。`);}
 else if(free){relations.push(`「${names.join('」「')}」分别提供${lenses.map(l=>l.focus).join('、')}的视角。这些是并列线索，左右位置不代表先后或结果；可以选择最符合实际经历的一条先验证。`);}
 const majors=cards.filter(c=>c.id<22);
 if(majors.length>=2) relations.push(`「${majors.map(label).join('」「')}」都是大阿卡纳。按这套解读方法，可以多检查整体应对方式与价值取舍，再落实到具体任务；牌的数量不证明事情严重或命运已定。`);
 const suits=['权杖','圣杯','宝剑','星币'];
 for(let s=0;s<4;s++){const same=cards.filter(c=>c.id>=22&&Math.floor((c.id-22)/14)===s);if(same.length>=2)relations.push(`「${same.map(label).join('」「')}」重复出现${suits[s]}，可优先核对${tarotPractice(same[0])!.domain}。缺少其他花色并不表示你缺少相应能力。`);}
 if(cards.length===3&&cards.every(c=>c.isReversed)) relations.push('三张都是逆位，可以把这一轮重点放在恢复条件、减少过度和调整节奏；不据此判断事情一定不顺，也不需要为了得到正位重新抽牌。');
 const sensitive=/自杀|自残|不想活|诊断|癌症|药物|停药|治疗|诉讼|官司|投资|股票|基金|借贷/.test(question);
 return {insights,relations,core:positioned?`这一组可以沿着“${lenses[0].focus} → 核对${lenses[1].focus} → ${last.step}”来梳理。放到${readingTopics[topic]}里，先${topicExamples[topic][last.axis]}，而不是直接从牌面决定成败。`:`围绕${lenses.map(l=>l.focus).join('、')}整理当下。选择有实际经历支持的部分，不必让每一条解释都与自己对应。`,actions:sensitive?['先把可核实的事实、担忧和需要专业回答的问题分别列出。','把具体问题交给相应的专业人员讨论，不按牌面改变治疗、法律或资金安排。','如涉及当下人身安全，优先联系当地紧急服务或身边可信赖的人。']:free?cards.map((c,i)=>`以「${label(c)}」为切入点：${lenses[i].step}；可以${topicExamples[topic][lenses[i].axis]}。`):[plan.check,`依据「${names[names.length-1]}」：${last.step}。把这一步限定在一次任务或沟通中，具体可以${topicExamples[topic][last.axis]}。`,plan.measure],pause:sensitive?'暂缓把牌面用于专业决策或对他人作确定判断。':plan.pause,reflection:plan.reflect,boundary:sensitive?'此处仅帮助整理问题，医疗、法律、财务及安全决定应以现实信息和适当的专业支持为准。':'依据牌义与解读规则在本页整理，未调用 AI。主题匹配不等于理解了完整问题；牌面不是现实证据，解释需要与实际经历核对。'};
}
