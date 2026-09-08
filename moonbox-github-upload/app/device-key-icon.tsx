export default function DeviceKeyIcon({kind}:{kind:'next'|'select'|'back'}){
 return <svg width="23" height="23" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  {kind==='next'?<>
   <path d="M4 21c4-1 7-3 10-6M4 15c3-.5 5-1.5 7-3M10 24l5-4"/>
   <path d="m19 4 1.6 4.4L25 10l-4.4 1.6L19 16l-1.6-4.4L13 10l4.4-1.6Z"/>
  </>:kind==='select'?<>
   <path d="m14 4 2.6 7.4L24 14l-7.4 2.6L14 24l-2.6-7.4L4 14l7.4-2.6Z"/>
   <path d="m6 6 2 2m12 12 2 2M22 6l-2 2M8 20l-2 2" opacity=".55"/>
  </>:<>
   <path d="M17 4a10 10 0 1 0 7 15A9 9 0 0 1 17 4Z"/>
   <path d="m21 5 .9 2.6L24.5 8.5l-2.6.9L21 12l-.9-2.6-2.6-.9 2.6-.9Z" strokeWidth=".85"/>
  </>}
 </svg>;
}
