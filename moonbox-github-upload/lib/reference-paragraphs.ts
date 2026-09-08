/** Repair line wraps from Word extraction without changing the source wording. */
export function referenceParagraphs(text: string): string[] {
 const paragraphs: string[] = [];
 const lines = text.replace(/\r\n?/g, '\n').split('\n').map(line => line.trim()).filter(Boolean);
 const heading = (line: string) => /^[◆◇■●]/u.test(line) || /^第[一二三四五六七八九十十二]+宮[：:]/u.test(line);
 const label = (line: string) => /^[\p{Script=Han}、（）()\s]{1,14}[：:]/u.test(line);
 for (const line of lines) {
  const previous = paragraphs.at(-1);
  if (!previous || heading(line) || heading(previous) || label(line) || /[。！？!?]$/u.test(previous)) {
   paragraphs.push(line);
  } else {
   // Latin words retain their separating space; Chinese soft wraps do not.
   paragraphs[paragraphs.length - 1] += /[A-Za-z0-9]$/u.test(previous) && /^[A-Za-z0-9]/u.test(line) ? ' ' + line : line;
  }
 }
 return paragraphs.map(p => p.replace(/([\p{Script=Han}])\s+(?=[\p{Script=Han}])/gu, '$1'));
}
