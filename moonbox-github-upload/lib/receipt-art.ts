export type ReceiptSection={title:string;text:string};
const escape=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
// Explicit line layout keeps the live paper and the saved PNG identical.
export function receiptArt(date:string,sections:ReceiptSection[]){
 const ink='#687c86',width=640;
 const text=(s:string,x:number,y:number,size=25,center=false)=>`<text x="${x}" y="${y}" font-size="${size}" ${center?'text-anchor="middle"':''}>${escape(s)}</text>`;
 const star=(x:number,y:number,r=10)=>`<path d="M${x} ${y-r}Q${x+2} ${y-2} ${x+r} ${y}Q${x+2} ${y+2} ${x} ${y+r}Q${x-2} ${y+2} ${x-r} ${y}Q${x-2} ${y-2} ${x} ${y-r}Z" fill="#abbcc4"/>`;
 const lines=(s:string)=>s.split('\n').flatMap(p=>{const out:string[]=[];let line='',units=0;for(const c of p){const u=/[\u0000-\u00ff]/.test(c)?.55:1;if(units+u>19){out.push(line);line='';units=0;}line+=c;units+=u;}if(line)out.push(line);return out;});
 let body=`<g fill="${ink}" font-family="'Songti SC','SimSun',serif">`;
 body+=`<path d="M350 93a80 80 0 1 0 23 139A88 88 0 0 1 350 93Z" fill="${ink}"/><circle cx="320" cy="167" r="100" fill="none" stroke="${ink}" stroke-dasharray="1 12"/>`;
 body+=star(359,165,30)+star(211,99,10)+star(418,246,13)+star(320,48,12);
 body+=text('月匣 · 月見',320,310,45,true)+text('M O O N   G A Z I N G',320,345,16,true)+text('月下回笺 · 收藏此刻的回响',320,391,18,true)+text(date,320,452,25,true)+text('北京时间 · 月匣灵笺',320,483,15,true);
 body+=`<path d="M70 518h190q60-20 120 0h190" fill="none" stroke="${ink}"/>`+star(320,518,10);
 let y=550;
 for(const section of sections){
  const rows=lines(section.text),height=66+rows.length*42;
  body+=`<rect x="45" y="${y}" width="550" height="${height}" rx="3" fill="none" stroke="${ink}" stroke-opacity=".65"/><path d="M45 ${y}h550v42H45Z" fill="#abbcc4"/>`;
  body+=`<g fill="#374e5a">${text('☾  —  '+section.title+'  —  ☽',320,y+29,22,true)}</g>`;
  rows.forEach((r,i)=>{body+=text(r,73,y+77+i*42,25);});
  y+=height+22;
 }
 body+=`<path d="M75 ${y+12}h180q65-16 130 0h180" fill="none" stroke="${ink}"/>`+star(320,y+12,11);
 body+=text('星月低语，落于此笺',320,y+72,22,true)+text('MOON GAZING  ·  KEEP THIS MOMENT',320,y+104,12,true);
 body+=`<path d="M35 ${y+143}q45-50 80-20t65-18m425 38q-45-50-80-20t-65-18" fill="none" stroke="${ink}" stroke-opacity=".4"/></g>`;
 const height=y+172;
 const teeth=Array.from({length:40},(_,i)=>`${640-i*16},${height-9} ${632-i*16},${height}`).join(' ');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><pattern id="grain" width="13" height="17" patternUnits="userSpaceOnUse"><path d="M1 4l3 1m5 7 2-1" stroke="#b6b0a0" stroke-width=".5" opacity=".16"/></pattern></defs><path d="M0 0H640V${height-9}L${teeth}0 ${height-9}Z" fill="#f8f5ec"/><rect width="640" height="${height-10}" fill="url(#grain)"/><rect x="25" y="25" width="590" height="${height-55}" rx="13" fill="none" stroke="${ink}" stroke-width="1.3"/><rect x="31" y="31" width="578" height="${height-67}" rx="12" fill="none" stroke="${ink}" stroke-width=".5"/>${star(40,40,10)}${star(600,40,10)}${body}</svg>`;
 return {svg,width,height,url:'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)};
}
