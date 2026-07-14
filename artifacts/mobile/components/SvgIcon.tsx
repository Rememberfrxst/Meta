/**
 * SvgIcon — drop-in SVG replacement for Ionicons.
 * Zero font-loading dependency → no Japanese/Chinese glyph fallback on Android.
 * viewBox is 24×24 for all icons.
 */
import React from 'react';
import Svg, { Path, Circle, Rect, Polygon, G, Defs, ClipPath } from 'react-native-svg';

interface Props {
  name: string;
  size?: number;
  color?: string;
  style?: object;
}

type Renderer = (color: string) => React.ReactNode;

/* ── helpers ─────────────────────────────────────────────────────────────── */
const sp = (color: string, d: string, sw = 1.8) => (
  <Path
    d={d}
    fill="none"
    stroke={color}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);
const fp = (color: string, d: string) => <Path d={d} fill={color} />;

/* ── icon map ────────────────────────────────────────────────────────────── */
const ICONS: Record<string, Renderer> = {

  /* ── Navigation / arrows ── */
  'chevron-forward': (c) => sp(c, 'M9 6l6 6-6 6'),
  'chevron-down':    (c) => sp(c, 'M6 9l6 6 6-6'),
  'arrow-forward':   (c) => sp(c, 'M5 12h14M13 6l6 6-6 6'),
  'navigate':        (c) => fp(c, 'M12 2L2 22l10-4 10 4z'),

  /* ── Actions ── */
  'add':    (c) => sp(c, 'M12 5v14M5 12h14'),
  'remove': (c) => sp(c, 'M5 12h14'),
  'close':  (c) => sp(c, 'M18 6L6 18M6 6l12 12'),

  'add-circle': (c) => (
    <>
      <Circle cx={12} cy={12} r={10} fill={c} />
      <Path d="M12 8v8M8 12h8" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  'add-circle-outline': (c) => (
    <>
      <Circle cx={12} cy={12} r={10} fill="none" stroke={c} strokeWidth={1.8} />
      {sp(c, 'M12 8v8M8 12h8')}
    </>
  ),
  'close-circle': (c) => (
    <>
      <Circle cx={12} cy={12} r={10} fill={c} />
      <Path d="M15 9l-6 6M9 9l6 6" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  'close-circle-outline': (c) => (
    <>
      <Circle cx={12} cy={12} r={10} fill="none" stroke={c} strokeWidth={1.8} />
      {sp(c, 'M15 9l-6 6M9 9l6 6')}
    </>
  ),
  'ellipsis-vertical': (c) => (
    <>
      <Circle cx={12} cy={5}  r={1.5} fill={c} />
      <Circle cx={12} cy={12} r={1.5} fill={c} />
      <Circle cx={12} cy={19} r={1.5} fill={c} />
    </>
  ),
  'share-outline': (c) => sp(c, 'M4 12v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8M16 6l-4-4-4 4M12 2v13'),

  /* ── Check marks ── */
  'checkmark': (c) => sp(c, 'M5 13l4 4L19 7', 2),
  'checkmark-circle': (c) => (
    <>
      <Circle cx={12} cy={12} r={10} fill={c} />
      <Path d="M7.5 12l3 3 6-6" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  'checkmark-circle-outline': (c) => (
    <>
      <Circle cx={12} cy={12} r={10} fill="none" stroke={c} strokeWidth={1.8} />
      {sp(c, 'M7.5 12l3 3 6-6', 1.8)}
    </>
  ),
  'checkmark-done-circle': (c) => (
    <>
      <Circle cx={12} cy={12} r={10} fill={c} />
      <Path d="M5 12l3 3 5-5M9 12l3 3 5-5" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  'checkmark-done-circle-outline': (c) => (
    <>
      <Circle cx={12} cy={12} r={10} fill="none" stroke={c} strokeWidth={1.8} />
      {sp(c, 'M5 12l3 3 5-5M9 12l3 3 5-5', 1.6)}
    </>
  ),

  /* ── Stars / Rating ── */
  'star': (c) => (
    <Polygon
      points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
      fill={c}
    />
  ),
  'star-outline': (c) => (
    <Polygon
      points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
      fill="none"
      stroke={c}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
  ),
  'star-half': (c) => (
    <>
      {/* filled left half */}
      <Defs>
        <ClipPath id="lhalf">
          <Rect x={0} y={0} width={12} height={24} />
        </ClipPath>
      </Defs>
      <Polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill={c}
        clipPath="url(#lhalf)"
      />
      <Polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill="none"
        stroke={c}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </>
  ),

  /* ── Heart ── */
  'heart': (c) => fp(c, 'M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z'),
  'heart-outline': (c) => (
    <Path
      d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
      fill="none"
      stroke={c}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
  ),

  /* ── Search ── */
  'search':         (c) => sp(c, 'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0', 2),
  'search-outline': (c) => sp(c, 'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0'),

  /* ── Eye ── */
  'eye-outline': (c) => sp(c, 'M1 12s4-8 11-8 11 8-11 8-11-8zm11 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'),
  'eye-off-outline': (c) => sp(c, 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22'),

  /* ── Person / User ── */
  'person-outline': (c) => sp(c, 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'),
  'person-circle-outline': (c) => (
    <>
      <Circle cx={12} cy={12} r={10} fill="none" stroke={c} strokeWidth={1.8} />
      {sp(c, 'M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-6.5 8a6.5 6.5 0 0 1 13 0')}
    </>
  ),
  'person-circle': (c) => (
    <>
      <Circle cx={12} cy={12} r={10} fill={c} />
      <Path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-6.5 8a6.5 6.5 0 0 1 13 0" fill="none" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" />
    </>
  ),

  /* ── Location / Map ── */
  'location': (c) => fp(c, 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'),
  'location-outline': (c) => sp(c, 'M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0zM12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'),
  'location-sharp':   (c) => fp(c, 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'),

  /* ── Notification / Bell ── */
  'notifications-outline': (c) => sp(c, 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0'),

  /* ── Mail ── */
  'mail-outline': (c) => (
    <>
      {sp(c, 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z')}
      {sp(c, 'M22 6l-10 7L2 6')}
    </>
  ),

  /* ── Lock ── */
  'lock-closed-outline': (c) => (
    <>
      {sp(c, 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z')}
      {sp(c, 'M7 11V7a5 5 0 0 1 10 0v4')}
      <Circle cx={12} cy={16} r={1} fill={c} />
    </>
  ),

  /* ── Mic ── */
  'mic-outline': (c) => sp(c, 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8'),

  /* ── Information ── */
  'information-circle': (c) => (
    <>
      <Circle cx={12} cy={12} r={10} fill={c} />
      <Path d="M12 16v-4M12 8h.01" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
    </>
  ),

  /* ── Bag / Cart ── */
  'bag': (c) => fp(c, 'M6 2a1 1 0 0 0 0 2h1.22l2.27 9.22A3 3 0 0 0 10 19h9a1 1 0 0 0 0-2h-9a1 1 0 0 1-.97-.76L8.73 15H18a2 2 0 0 0 1.94-1.5l1.5-6A2 2 0 0 0 19.5 5H7.28L6.8 3H6zm4.5 17.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm6.5 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z'),
  'bag-outline': (c) => (
    <>
      {sp(c, 'M6 2H4M6 2l2.27 9.22A3 3 0 0 0 11 15h8a2 2 0 0 0 1.94-1.5l1.5-6A2 2 0 0 0 20.5 5H7.28')}
      <Circle cx={11} cy={20} r={1} fill={c} />
      <Circle cx={17} cy={20} r={1} fill={c} />
    </>
  ),
  'bag-handle': (c) => (
    <>
      {sp(c, 'M6 2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4', 0)}
      {sp(c, 'M3 7h18l-2 11H5L3 7z')}
      {sp(c, 'M9 7a3 3 0 0 1 6 0')}
    </>
  ),
  'bag-add': (c) => (
    <>
      {sp(c, 'M6 2H4M6 2l2 9')}
      {sp(c, 'M8 11h10l-1.5 7H9.5L8 11z')}
      <Path d="M15 5v6M12 8h6" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),

  /* ── Receipt ── */
  'receipt': (c) => fp(c, 'M4 2h16v20l-2-1-2 1-2-1-2 1-2-1-2 1-2-1V2zm4 6h8M8 10h8M8 14h5'),
  'receipt-outline': (c) => (
    <>
      {sp(c, 'M4 2h16v20l-2-1-2 1-2-1-2 1-2-1-2 1-2-1V2z')}
      {sp(c, 'M8 8h8M8 12h8M8 16h5')}
    </>
  ),

  /* ── Trash ── */
  'trash-outline': (c) => (
    <>
      {sp(c, 'M3 6h18M19 6l-1 14H6L5 6M10 6V4h4v2')}
      {sp(c, 'M10 11v6M14 11v6')}
    </>
  ),

  /* ── Card / Credit ── */
  'card': (c) => (
    <>
      <Rect x={2} y={5} width={20} height={14} rx={2} fill={c} />
      <Rect x={2} y={9} width={20} height={3} fill="rgba(0,0,0,0.25)" />
    </>
  ),
  'card-outline': (c) => (
    <>
      <Rect x={2} y={5} width={20} height={14} rx={2} fill="none" stroke={c} strokeWidth={1.8} />
      {sp(c, 'M2 10h20')}
    </>
  ),

  /* ── Shield ── */
  'shield-checkmark': (c) => (
    <>
      <Path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z" fill={c} />
      <Path d="M9 12l2 2 4-4" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),

  /* ── Cash ── */
  'cash-outline': (c) => (
    <>
      <Rect x={2} y={6} width={20} height={12} rx={2} fill="none" stroke={c} strokeWidth={1.8} />
      <Circle cx={12} cy={12} r={3} fill="none" stroke={c} strokeWidth={1.8} />
      {sp(c, 'M6 6v12M18 6v12')}
    </>
  ),

  /* ── QR Code ── */
  'qr-code-outline': (c) => (
    <>
      <Rect x={3}  y={3}  width={7} height={7} rx={1} fill="none" stroke={c} strokeWidth={1.8} />
      <Rect x={14} y={3}  width={7} height={7} rx={1} fill="none" stroke={c} strokeWidth={1.8} />
      <Rect x={3}  y={14} width={7} height={7} rx={1} fill="none" stroke={c} strokeWidth={1.8} />
      <Rect x={5}  y={5}  width={3} height={3} fill={c} />
      <Rect x={16} y={5}  width={3} height={3} fill={c} />
      <Rect x={5}  y={16} width={3} height={3} fill={c} />
      {sp(c, 'M14 14h3v3M17 14v7M14 17h7')}
    </>
  ),

  /* ── Log out ── */
  'log-out-outline': (c) => sp(c, 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9'),

  /* ── Language / Globe ── */
  'language-outline': (c) => (
    <>
      <Circle cx={12} cy={12} r={10} fill="none" stroke={c} strokeWidth={1.8} />
      {sp(c, 'M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z')}
    </>
  ),

  /* ── Storefront ── */
  'storefront': (c) => fp(c, 'M20 4H4v2l-1 5a3 3 0 0 0 2 3v8h2v-4h10v4h2v-8a3 3 0 0 0 2-3L20 6V4zM9 16H7v-2h2v2zm8 0h-2v-2h2v2zM5.18 9l.82-3h12l.82 3H5.18z'),
  'storefront-outline': (c) => (
    <>
      {sp(c, 'M3 9l1-5h16l1 5a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z')}
      {sp(c, 'M5 9v12h14V9')}
      {sp(c, 'M9 21v-4h6v4')}
    </>
  ),

  /* ── Cube / Box ── */
  'cube': (c) => fp(c, 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'),
  'cube-outline': (c) => (
    <>
      {sp(c, 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z')}
      {sp(c, 'M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12')}
    </>
  ),

  /* ── Time / Clock ── */
  'time': (c) => (
    <>
      <Circle cx={12} cy={12} r={10} fill={c} />
      <Path d="M12 6v6l4 2" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  'time-outline': (c) => (
    <>
      <Circle cx={12} cy={12} r={10} fill="none" stroke={c} strokeWidth={1.8} />
      {sp(c, 'M12 6v6l4 2')}
    </>
  ),

  /* ── Flash / Lightning ── */
  'flash': (c) => fp(c, 'M13 2L3 14h9l-1 8 10-12h-9l1-8z'),

  /* ── Sunny / Sun ── */
  'sunny': (c) => (
    <>
      <Circle cx={12} cy={12} r={5} fill="none" stroke={c} strokeWidth={1.8} />
      {sp(c, 'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42')}
    </>
  ),

  /* ── Moon ── */
  'moon': (c) => fp(c, 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'),

  /* ── Phone portrait ── */
  'phone-portrait-outline': (c) => (
    <>
      <Rect x={7} y={2} width={10} height={20} rx={2} fill="none" stroke={c} strokeWidth={1.8} />
      <Circle cx={12} cy={18} r={0.5} fill={c} stroke={c} strokeWidth={1} />
    </>
  ),

  /* ── Shirt / Clothing ── */
  'shirt-outline': (c) => sp(c, 'M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z'),

  /* ── Leaf ── */
  'leaf-outline': (c) => sp(c, 'M17 8C8 10 5.9 16.17 3.82 19.98A1 1 0 0 0 5 21c1-1 2-2 3-2 2 0 4 2 6 2 6 0 11-6 11-13 0-3-1-4-1-4S17 8 17 8z'),

  /* ── Food / Fast food ── */
  'fast-food-outline': (c) => (
    <>
      {sp(c, 'M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z')}
      {sp(c, 'M6 1v3M10 1v3M14 1v3')}
    </>
  ),

  /* ── Sparkles ── */
  'sparkles-outline': (c) => sp(c, 'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5zM5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75zM18 16l.75 2.25L21 19l-2.25.75L18 22l-.75-2.25L15 19l2.25-.75z'),

  /* ── Football / Sports ── */
  'football-outline': (c) => (
    <>
      <Circle cx={12} cy={12} r={10} fill="none" stroke={c} strokeWidth={1.8} />
      {sp(c, 'M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83')}
    </>
  ),

  /* ── Book ── */
  'book-outline': (c) => (
    <>
      {sp(c, 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20')}
      {sp(c, 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z')}
    </>
  ),

  /* ── Call / Phone ── */
  'call-outline': (c) => sp(c, 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.09 6.09l1.79-1.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z'),

  /* ── Headset ── */
  'headset': (c) => (
    <>
      {sp(c, 'M3 18v-6a9 9 0 0 1 18 0v6')}
      {sp(c, 'M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z')}
    </>
  ),

  /* ── Trending up ── */
  'trending-up': (c) => sp(c, 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6'),

  /* ── Pricetag ── */
  'pricetag-outline': (c) => (
    <>
      {sp(c, 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z')}
      <Circle cx={7} cy={7} r={1.5} fill={c} />
    </>
  ),

  /* ── Bicycle ── */
  'bicycle': (c) => (
    <>
      <Circle cx={6}  cy={15} r={4} fill="none" stroke={c} strokeWidth={1.8} />
      <Circle cx={18} cy={15} r={4} fill="none" stroke={c} strokeWidth={1.8} />
      {sp(c, 'M6 15l3-6h5l2 3M14 9l2 6M10 9H7')}
      {sp(c, 'M10 9l3.5 2')}
    </>
  ),
  'bicycle-outline': (c) => (
    <>
      <Circle cx={6}  cy={15} r={4} fill="none" stroke={c} strokeWidth={1.8} />
      <Circle cx={18} cy={15} r={4} fill="none" stroke={c} strokeWidth={1.8} />
      {sp(c, 'M6 15l3-6h5l2 3M14 9l2 6M10 9H7')}
      {sp(c, 'M10 9l3.5 2')}
    </>
  ),

  /* ── Home (also used by CategoryCard) ── */
  'home': (c) => fp(c, 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'),
  'home-outline': (c) => sp(c, 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6'),
};

/* ── component ─────────────────────────────────────────────────────────── */
export default function SvgIcon({ name, size = 24, color = '#000', style }: Props) {
  const renderer = ICONS[name];
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      {renderer
        ? renderer(color)
        : /* fallback: small square so nothing explodes */
          <Rect x={4} y={4} width={16} height={16} rx={3} fill="none" stroke={color} strokeWidth={1.5} />
      }
    </Svg>
  );
}
