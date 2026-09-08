import {useId} from 'react';
export default function TarotLoading(){
 const sandClip=useId();
 return <div className="tarot-loading" role="status">
  <svg className="star-hourglass" viewBox="0 0 240 220" fill="none" aria-hidden="true">
   <defs><clipPath id={sandClip}><path d="M86 44H154C145 68 130 88 122 105H118C110 88 95 68 86 44Z"/></clipPath></defs>
   <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <path className="hourglass-orbit-back" d="M71 125C-12 140 5 176 77 149L202 94C259 65 220 48 164 78" opacity=".45"/>
    <ellipse cx="120" cy="32" rx="43" ry="7"/>
    <path d="M77 32v6c17 9 69 9 86 0v-6M81 41c8 23 23 43 33 64v13c-10 22-25 44-33 66M159 41c-8 23-23 43-33 64v13c10 22 25 44 33 66"/>
    <path d="M86 44c9 24 24 44 32 61M154 44c-9 24-24 44-32 61M117 120c-9 22-21 42-30 59M123 120c9 22 21 42 30 59" opacity=".4"/>
    <ellipse cx="120" cy="186" rx="43" ry="7"/>
    <path d="M77 186v6c19 9 67 9 86 0v-6"/>
   </g>
   <g clipPath={`url(#${sandClip})`}><path className="hourglass-upper-sand" d="m104 81 16-16 16 16-14 25h-4Z" fill="currentColor" opacity=".33"/></g>
   <path className="hourglass-lower-sand" d="m86 184 34-37 34 37q-34 9-68 0Z" fill="currentColor" opacity=".32"/>
   <g className="hourglass-falling" fill="currentColor"><circle cx="120" cy="112" r="1.2"/><circle cx="120" cy="122" r="1"/><circle cx="120" cy="132" r=".9"/><circle cx="120" cy="142" r=".7"/></g>
   <g fill="currentColor"><path d="m120 158 1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5ZM106 174l1 3 3 1-3 1-1 3-1-3-3-1 3-1ZM137 173l1 3 3 1-3 1-1 3-1-3-3-1 3-1Z" opacity=".75"/></g>
   <path d="M161 81c73-29 80-1 38 20L76 155C8 184-7 143 70 126" stroke="#e4ebf1" strokeWidth="7" strokeLinecap="round"/>
   <path d="M161 81c73-29 80-1 38 20L76 155C8 184-7 143 70 126" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
   <path d="M164 86c62-24 70-4 31 13L74 150c-48 20-62 4-27-12" stroke="currentColor" strokeWidth=".7" opacity=".5"/>
   <g className="hourglass-stars" stroke="currentColor" strokeWidth="1">
    <path d="m46 55 2 6 6 2-6 2-2 6-2-6-6-2 6-2ZM185 139l2 6 6 2-6 2-2 6-2-6-6-2 6-2ZM56 96l2 5 4 2-4 2-2 5-2-5-4-2 4-2Z"/>
    <path d="M120 9v10m-5-5h10M120 204v10m-5-5h10M193 43v8m-4-4h8M44 178v8m-4-4h8"/>
    <circle cx="48" cy="83" r="1" fill="currentColor"/><circle cx="186" cy="166" r="1" fill="currentColor"/>
   </g>
  </svg>
  <strong>星砂流转，正在洗牌…</strong>
  <small>静静地，想一想你的问题。</small>
 </div>;
}
