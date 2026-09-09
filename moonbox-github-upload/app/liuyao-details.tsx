import {buildLiuyaoReading} from '@/lib/liuyao-reading';

export default function LiuyaoDetails({values,question}:{values:number[];question:string}){
 const reading=buildLiuyaoReading(values,question);
 return <details className="liuyao-details" key={values.join('-')}>
  <summary><span>详细解析</span><span className="liuyao-details-hint">本卦 · 动爻 · 变卦 · 建议</span><span className="liuyao-details-chevron" aria-hidden="true">⌄</span></summary>
  <div className="liuyao-details-body">
   <h3>先看整体</h3><p>{reading.core}</p>
   <h3>本卦 · {reading.title}</h3><p>{reading.baseText}</p><p>{reading.inner}</p><p>{reading.outer}</p>
   {reading.source&&<a href={reading.source} target="_blank" rel="noreferrer">查看《周易》原文</a>}
   <h3>{reading.moving.length?'动爻 · 变化落在哪里':'静卦 · 先看当下'}</h3>
   {!reading.moving.length&&<p>这次没有动爻，可以先检查本卦提示与目前的处境是否相符，把已有安排照顾好，不必为了寻求变化反复起卦。</p>}
   {reading.lines.map(line=><section className="liuyao-line-reading" key={line.number}><h4>{line.title}</h4><small>{line.change}</small>{line.quote&&<blockquote>{line.quote}</blockquote>}<p>{line.text}</p><p>可以尝试：{line.action}。</p></section>)}
   {reading.moving.length>0&&<><h3>变卦 · {reading.changedTitle}</h3><p>{reading.changedText}</p>{reading.changedSource&&<a href={reading.changedSource} target="_blank" rel="noreferrer">查看《周易》原文</a>}</>}
   <h3>把分析落到行动</h3><ol>{reading.practical.map((text,i)=><li key={i}>{text}</li>)}</ol>
   <p className="method-copy">本页按卦象与爻位展开；未排纳甲及日月旺衰，暂不作世应、六亲和应期判断。</p>
  </div>
 </details>;
}
