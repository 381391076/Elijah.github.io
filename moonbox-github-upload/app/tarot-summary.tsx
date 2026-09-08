import type {DrawnCard} from '@/lib/oracle';
import {tarotPractice,tarotConnection} from '@/lib/tarot-practice';

const majorActions = [
 '选一个风险可控的小尝试，先确认需要的准备', '盘点手头已有的资源，把一个想法拆成今天能完成的步骤',
 '给自己一段安静时间，写下直觉，再用实际信息核实', '照顾自己的精力，为想培育的事留出固定时间',
 '明确一项责任和一条边界，并与相关的人说清楚', '检视一条习惯遵守的规则，确认它是否仍符合你的价值',
 '写下选择中最看重的价值，再比较各个选项', '选定一个方向，暂时减少同时推进的目标',
 '先安顿情绪，再用温和而明确的方式表达需要', '留一点独处整理的时间，也保留向可信任的人求助的通道',
 '分清能控制和不能控制的部分，为变化准备一个替代方案', '把事实、感受和责任分开记录，再作判断',
 '暂停一次惯性的回应，试着从另一个人的位置看问题', '整理一件已经结束却仍占用精力的事，为新阶段腾出空间',
 '调小行动幅度，找到能持续一周的节奏', '辨认一个让你反复消耗的习惯，先减少一次对它的依赖',
 '检查当前安排中最不稳的一环，先修补基础', '恢复一件能滋养自己的小事，记录已经发生的微小进展',
 '把担心与已知事实分开，向可靠来源确认一条关键信息', '把已经明确的想法说出来，与愿意支持你的人分享进展',
 '回顾一次反复出现的选择，写下这次想作出的不同回应', '完成一个尚未收尾的小环节，再决定下一阶段的方向',
];
const domains = ['行动与创造', '情感与关系', '思考与沟通', '资源与日常'];
const practices = ['一件想推进的事', '一段在意的关系', '一个需要澄清的问题', '一项时间或资源安排'];
const rankActions = [
 '从一个小开端入手', '比较两种安排，明确优先级', '寻找合适的协作与反馈', '检查现有安排是否仍适合自己',
 '先照顾困难和消耗，寻找可用的支持', '回顾过去的经验，只保留现在仍有帮助的部分', '重新审视投入和期待，给观察设置一个期限',
 '辨认值得继续投入的部分，减少无效消耗', '确认自己的需要与界限，留出恢复空间', '盘点积累与负担，为下一阶段做好交接',
 '带着好奇了解事实，先学习再下结论', '把愿望落实为一个具体步骤，并检查推进速度', '兼顾自己的感受与他人的需要', '明确目标、责任和可持续的安排',
];
function meaning(card: DrawnCard) {
 return (card.isReversed ? card.reversed : card.upright).replace(/[。；]+$/g, '');
}
function action(card: DrawnCard) {
 const practice = tarotPractice(card);
 if(practice) return `${card.isReversed?'先小范围调整，避免一次改变太多条件：':''}${practice.experiment}。`;
 const step = card.id < 22 ? majorActions[card.id] : `围绕${practices[Math.floor((card.id - 22) / 14)]}，${rankActions[(card.id - 22) % 14]}`;
 return card.isReversed ? `先检视「${meaning(card)}」中与你相符的部分，再${step}；以调整和小范围尝试为主，不急着扩大投入。` : `${step}，做完后观察真实反馈。`;
}

export function summarizeTarot(cards: DrawnCard[], free = false) {
 if (!cards.length) return null;
 const label = (c: DrawnCard) => `「${c.name}·${c.isReversed ? '逆位' : '正位'}」`;
 if (cards.length === 1) return {analysis: `${label(cards[0])}把注意力带向「${meaning(cards[0])}」。可以把它当作审视当下的一条线索，看看哪些需要正在被忽略，哪些条件已经具备。`, advice: action(cards[0])};
 const [present, obstacle, advice] = cards;
 const counts = domains.map((_, suit) => cards.filter(c => c.id >= 22 && Math.floor((c.id - 22) / 14) === suit).length);
 const repeated = counts.findIndex(n => n >= 2);
 const connection = repeated >= 0 ? `这组牌反复触及${domains[repeated]}，可以优先从这个方向理解你的问题。` : '这组牌触及不同层面，需要把内在感受与现实条件放在一起衡量。';
 const analysis = free
  ? `${connection}左牌${label(present)}带出「${meaning(present)}」，中牌${label(obstacle)}补充「${meaning(obstacle)}」，右牌${label(advice)}则提示「${meaning(advice)}」。可以比较这些线索如何互相支持或牵制；左右顺序不代表时间先后。`
  : `${connection}现状牌${label(present)}提示「${meaning(present)}」；而处于阻碍位置的${label(obstacle)}，提醒你检查「${meaning(obstacle)}」是否正在分散注意力或形成牵绊。结合建议牌${label(advice)}，接下来的重点是调整应对方式，让感受、期待和实际行动更一致。`;
 return {analysis, advice: free ? `从三条线索里，先以右牌作为一个可尝试的切入点：${action(advice)}` : `面对现状，先留意阻碍牌指出的牵绊，再尝试建议牌给出的方向：${action(advice)}`};
}

export default function TarotSummary({cards, free = false}: {cards: DrawnCard[]; free?: boolean}) {
 const summary = summarizeTarot(cards, free);
 if (!summary) return null;
 const three = cards.length === 3;
 const advice = cards[cards.length-1];
 const obstacle = cards[three?1:0];
 const practice = tarotPractice(advice);
 const tension = tarotPractice(obstacle)?.tension ?? meaning(obstacle);
 return <section className="reflection tarot-insight" aria-label="综合分析与建议"><h3>综合分析与建议</h3>
 <p>{three ? tarotConnection(cards[0],cards[1]) : summary.analysis}</p>
 {three&&<p>{free ? `左牌「${cards[0].name}」带出${meaning(cards[0])}，中牌「${obstacle.name}」提供另一个观察角度：${tension}。右牌「${advice.name}」则提醒你关注${meaning(advice)}。这些是并列线索，不代表时间顺序。` : `现状牌「${cards[0].name}」提示${meaning(cards[0])}。结合阻碍位置的「${obstacle.name}」，可以检查一个具体卡点：${tension}。${obstacle.isReversed?'逆位可以用来检查受阻、过度或尚未表达的部分，不能直接等同于坏结果。':'即使这张牌是正位，也需要看它在此处是否缺少分寸、时机或相应条件。'}`}</p>}
 {three&&!free&&<p>建议牌「{advice.name}·{advice.isReversed?'逆位':'正位'}」把落点带向{practice?.domain??meaning(advice)}。{advice.isReversed?`可以先检查「${practice?.tension??meaning(advice)}」是否与你的处境相符，再调整一个最小环节。`:'可以将它当作回应前面卡点的一种方法，先用一次具体行动验证是否适合自己。'}</p>}
 <h4>把线索带回生活</h4>
 {free?<ol>{cards.map(c=><li key={c.id}><strong>{c.position} · {c.name}</strong><p>{action(c)}</p></li>)}</ol>:<ol>
 <li><strong>先找出卡点</strong><p>用最近发生的一件事检查「{tension}」。分别写下发生了什么、你的解释是什么、还缺少什么信息，避免把推测当成事实。</p></li>
 <li><strong>做一次具体尝试</strong><p>{action(advice)}给这一步补上对象、时间和完成标准，从自己能控制的部分开始。</p></li>
 <li><strong>用反馈决定下一步</strong><p>完成尝试后安排一次回看，观察{practice?.feedback??'是否获得了新信息，或减少了一项持续消耗'}。如果没有变化，重新核实卡点，调整方法或暂停额外投入。</p></li>
 </ol>}
 </section>;
}
