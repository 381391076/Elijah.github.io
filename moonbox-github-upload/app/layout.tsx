import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'月匣 · 月見',description:'把未知放进口袋。六爻、小六壬、塔罗、星骰与生命课题，一刻安静的自我探索。'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}
