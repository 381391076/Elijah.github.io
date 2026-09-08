import {diceInsight} from '@/lib/dice-insight';

export default function DiceSummary({planet,sign,house}:{planet:number;sign:number;house:number}) {
 const insight=diceInsight(planet,sign,house);
 return <section className="reflection tarot-insight" aria-label="星骰综合分析与建议">
  <h3>综合分析与建议</h3><small>{insight.title}</small>
  {insight.paragraphs.map((p,i)=><p key={i}>{p}</p>)}
  <h4>把线索带回生活</h4>
  <ol>{insight.steps.map(step=><li key={step.title}><strong>{step.title}</strong><p>{step.text}</p></li>)}</ol>
  <small>依据对应资料的象征主题整理，行动建议为延伸解读。</small>
 </section>;
}
