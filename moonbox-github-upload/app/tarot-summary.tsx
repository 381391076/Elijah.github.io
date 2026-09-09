'use client';
import {useState} from 'react';
import type {DrawnCard} from '@/lib/oracle';
import {buildTarotReading,readingTopics,suggestTopic,type ReadingTopic} from '@/lib/tarot-reading';
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from '@/components/ui/select';

export default function TarotSummary({cards,free=false,question=''}:{cards:DrawnCard[];free?:boolean;question?:string}) {
 const [chosen,setChosen]=useState<ReadingTopic|null>(null);
 const topic=chosen??suggestTopic(question);
 const reading=buildTarotReading(cards,topic,free,question);
 if(!reading)return null;
 return <section className="reflection tarot-insight" aria-label="综合分析与建议">
  <h3>综合分析与建议</h3>
  <label id="tarot-topic-label">从哪个情境理解这组牌</label>
  <Select value={topic} onValueChange={value=>{if(value&&value in readingTopics)setChosen(value as ReadingTopic)}}>
   <SelectTrigger aria-labelledby="tarot-topic-label"><SelectValue>{readingTopics[topic]}</SelectValue></SelectTrigger>
   <SelectContent>{Object.entries(readingTopics).map(([value,name])=><SelectItem key={value} value={value}>{name}</SelectItem>)}</SelectContent>
  </Select>
  <p className="method-copy">{chosen?'已按你选择的主题整理，可随时切换。':topic==='general'?'暂按通用情境整理；选择主题可以让例子更贴近你的问题。':'根据问题中的关键词选择了主题；如果不贴切，可以手动切换。'}</p>
  <h4>这组牌的主线</h4><p>{reading.core}</p>
  {reading.insights.map((entry,i)=><div className="tarot-card-insight" key={cards[i].id}><h4>{entry.title}</h4><p>{entry.text}</p>{entry.context&&<p>{entry.context}</p>}<p className="method-copy">{entry.check}</p></div>)}
  {reading.relations.length>0&&<><h4>牌与牌之间</h4>{reading.relations.map(text=><p key={text}>{text}</p>)}</>}
  <h4>{free?'可以选择的尝试':'建议的执行顺序'}</h4>
  <ol>{reading.actions.map((text,i)=><li key={i}><p>{text}</p></li>)}</ol>
  <h4>先暂缓什么</h4><p>{reading.pause}</p>
  <h4>值得问自己</h4><p>{reading.reflection}</p>
 </section>;
}
