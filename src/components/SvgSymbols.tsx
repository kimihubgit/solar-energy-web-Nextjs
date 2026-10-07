export default function SvgSymbols() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <pattern id="cells" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect x="1" y="1" width="14" height="14" rx="1.5" fill="#2A6299" />
        </pattern>
        <path id="circ" d="M75,75 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0" />
      </defs>
      <symbol id="i-arrow" viewBox="0 0 24 24">
        <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <symbol id="i-bolt" viewBox="0 0 24 24">
        <path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="currentColor" />
      </symbol>
      <symbol id="i-phone" viewBox="0 0 24 24">
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.570a1 1 0 0 1-.25 1z" fill="currentColor" />
      </symbol>
      <symbol id="i-pin" viewBox="0 0 24 24">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="currentColor" />
      </symbol>
      <symbol id="i-doc" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm0 2.5L17.5 8H14zM8 13h8v1.6H8zm0 4h8v1.6H8z" fill="currentColor" />
      </symbol>
      <symbol id="i-user" viewBox="0 0 24 24">
        <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4 0-8 2-8 5v2h16v-2c0-3-4-5-8-5z" fill="currentColor" />
      </symbol>
      <symbol id="i-search" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </g>
      </symbol>
      <symbol id="i-shield" viewBox="0 0 24 24">
        <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5zm-1.2 14.2-3.5-3.5 1.4-1.4 2.1 2.1 4.9-4.9 1.4 1.4z" fill="currentColor" />
      </symbol>
      <symbol id="i-tool" viewBox="0 0 24 24">
        <path d="M22.7 19 13.6 9.9c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" fill="currentColor" />
      </symbol>
      <symbol id="i-head" viewBox="0 0 24 24">
        <path d="M12 1a9 9 0 0 0-9 9v7a3 3 0 0 0 3 3h3v-8H5v-2a7 7 0 0 1 14 0v2h-4v8h4v1h-7v2h6a3 3 0 0 0 3-3V10a9 9 0 0 0-9-9z" fill="currentColor" />
      </symbol>
      <symbol id="i-chat" viewBox="0 0 24 24">
        <path d="M12 3C6.5 3 2 6.9 2 11.6c0 2.6 1.4 5 3.7 6.5L5 21.5l3.9-2.1c1 .3 2 .4 3.1.4 5.5 0 10-3.9 10-8.6S17.5 3 12 3z" fill="currentColor" />
      </symbol>
      <symbol id="i-play" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" fill="currentColor" />
      </symbol>

      <symbol id="p-sun" viewBox="0 0 64 64">
        <g stroke="#FFC93C" strokeWidth="4" strokeLinecap="round">
          <path d="M32 4v8M32 52v8M4 32h8M52 32h8M12.2 12.2l5.6 5.6M46.2 46.2l5.6 5.6M12.2 51.8l5.6-5.6M46.2 17.8l5.6-5.6" />
        </g>
        <circle cx="32" cy="32" r="13" fill="#FFC93C" />
      </symbol>
      <symbol id="p-panel" viewBox="0 0 120 100">
        <path d="M24 8h80l-12 66H12z" fill="#163A5C" />
        <path d="M27 12h73l-10.5 58H16.5z" fill="url(#cells)" />
        <path d="M58 74h6v14h-6z" fill="#8FA394" />
        <path d="M40 88h42v5H40z" fill="#5E7465" />
      </symbol>
      <symbol id="p-inverter" viewBox="0 0 100 110">
        <rect x="14" y="6" width="72" height="98" rx="10" fill="#F4F7F2" stroke="#0F2A17" strokeWidth="3" />
        <rect x="26" y="20" width="48" height="28" rx="4" fill="#0F2A17" />
        <path d="M32 38l6-8 6 6 6-10 6 8 6-4" fill="none" stroke="#7CCB5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="34" cy="62" r="3.5" fill="#5DBB3F" />
        <circle cx="46" cy="62" r="3.5" fill="#F5A000" />
        <circle cx="58" cy="62" r="3.5" fill="#DCE8D6" />
        <g stroke="#C6D3C4" strokeWidth="3" strokeLinecap="round">
          <path d="M28 78h44M28 86h44M28 94h44" />
        </g>
      </symbol>
      <symbol id="p-battery" viewBox="0 0 80 120">
        <rect x="28" y="4" width="24" height="10" rx="3" fill="#E8F3E3" />
        <rect x="10" y="12" width="60" height="102" rx="12" fill="none" stroke="#E8F3E3" strokeWidth="4" />
        <g fill="#5DBB3F">
          <rect x="19" y="86" width="42" height="18" rx="4" />
          <rect x="19" y="64" width="42" height="18" rx="4" />
          <rect x="19" y="42" width="42" height="18" rx="4" opacity=".75" />
          <rect x="19" y="20" width="42" height="18" rx="4" opacity=".3" />
        </g>
      </symbol>
      <symbol id="p-house" viewBox="0 0 120 100">
        <path d="M60 8 10 48h10v46h80V48h10z" fill="#fff" stroke="#0F2A17" strokeWidth="3" strokeLinejoin="round" />
        <path d="M60 12 26 40h68z" fill="url(#cells)" />
        <path d="M48 94V66h24v28" fill="#E6F5DD" stroke="#0F2A17" strokeWidth="3" />
        <rect x="28" y="58" width="14" height="14" rx="2" fill="#FFE59A" stroke="#0F2A17" strokeWidth="2.5" />
        <rect x="78" y="58" width="14" height="14" rx="2" fill="#FFE59A" stroke="#0F2A17" strokeWidth="2.5" />
      </symbol>
    </svg>
  );
}
