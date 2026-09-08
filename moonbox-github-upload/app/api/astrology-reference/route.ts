import documents from '@/lib/astrology-documents.json';
import previousReference from '@/lib/astrology-reference.json';

export function GET(request:Request){
 const params=new URL(request.url).searchParams;
 const values=['planet','sign','house'].map(key=>params.get(key));
 if(values.some(value=>value===null||!/^(?:[0-9]|1[01])$/.test(value))){
  return Response.json({error:'planet、sign、house 必须分别为 0–11 的整数。'},{status:400});
 }
 const [planet,sign,house]=values.map(Number);
 return Response.json({
  provenance:'用户提供的占星象征资料，保留原文语境，供解析取材。',
  planet:documents.planets[planet],sign:documents.signs[sign],house:documents.houses[house],
  general:documents.general,previousReference,
  sources:documents.documents.map(({id,fileName,sha256})=>({id,fileName,sha256})),
 });
}
