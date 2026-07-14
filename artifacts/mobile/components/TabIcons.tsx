/**
 * TabIcons — pure SVG tab bar icons.
 * No font loading = no Japanese/Chinese glyph fallbacks on physical Android.
 */
import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  color: string;
  size?: number;
}

/* ─── Home ─────────────────────────────────────────────────────────────── */
export function HomeIconFilled({ color, size = 24 }: Props) {
  // Font Awesome Free v7 — house (filled)
  return (
    <Svg width={size} height={size} viewBox="0 0 640 640">
      <Path
        fill={color}
        d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z"
      />
    </Svg>
  );
}

export function HomeIconOutline({ color, size = 24 }: Props) {
  // Font Awesome Free v7 — house (outline)
  return (
    <Svg width={size} height={size} viewBox="0 0 640 640">
      <Path
        fill={color}
        d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"
      />
    </Svg>
  );
}

/* ─── Search ────────────────────────────────────────────────────────────── */
export function SearchIconFilled({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.53 3.531a1 1 0 1 0 1.415-1.414l-3.53-3.531A8.5 8.5 0 0 0 10.5 2zm0 2a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13z"
      />
    </Svg>
  );
}

export function SearchIconOutline({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
      />
    </Svg>
  );
}

/* ─── Cart / Bag — stroke icon (user-supplied) ──────────────────────────── */
export function CartIconNew({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.875 17.25H7.79719C7.44591 17.2499 7.10579 17.1266 6.83612 16.9015C6.56646 16.6764 6.38435 16.3637 6.32156 16.0181L3.93 2.86594C3.8986 2.69313 3.80755 2.53681 3.67272 2.42425C3.53789 2.31169 3.36783 2.25003 3.19219 2.25H1.5"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.875 21C8.91053 21 9.75 20.1605 9.75 19.125C9.75 18.0895 8.91053 17.25 7.875 17.25C6.83947 17.25 6 18.0895 6 19.125C6 20.1605 6.83947 21 7.875 21Z"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.875 21C17.9105 21 18.75 20.1605 18.75 19.125C18.75 18.0895 17.9105 17.25 16.875 17.25C15.8395 17.25 15 18.0895 15 19.125C15 20.1605 15.8395 21 16.875 21Z"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.86406 13.5H17.6344C17.9857 13.4999 18.3258 13.3766 18.5954 13.1515C18.8651 12.9264 19.0472 12.6137 19.11 12.2681L20.25 6H4.5"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/* ─── Orders — box/package stroke icon (user-supplied) ──────────────────── */
export function OrdersIconNew({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 16.621V7.37727C20.9993 7.24374 20.9634 7.11277 20.8959 6.99755C20.8284 6.88234 20.7317 6.78695 20.6156 6.72102L12.3656 2.08039C12.2545 2.01621 12.1284 1.98242 12 1.98242C11.8716 1.98242 11.7455 2.01621 11.6344 2.08039L3.38437 6.72102C3.26827 6.78695 3.1716 6.88234 3.10411 6.99755C3.03663 7.11277 3.00072 7.24374 3 7.37727V16.621C3.00072 16.7545 3.03663 16.8855 3.10411 17.0007C3.1716 17.1159 3.26827 17.2113 3.38437 17.2773L11.6344 21.9179C11.7455 21.9821 11.8716 22.0159 12 22.0159C12.1284 22.0159 12.2545 21.9821 12.3656 21.9179L20.6156 17.2773C20.7317 17.2113 20.8284 17.1159 20.8959 17.0007C20.9634 16.8855 20.9993 16.7545 21 16.621V16.621Z"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.5938 14.2959V9.4209L7.5 4.40527"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.8973 6.99316L12.0848 11.9994L3.10352 6.99316"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.0844 11.999L12 22.0115"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/* ─── Profile / Me — Font Awesome style ────────────────────────────────── */
export function ProfileIconFilled({ color, size = 24 }: Props) {
  // FA v7 circle-user (filled) — viewBox 640×640
  return (
    <Svg width={size} height={size} viewBox="0 0 640 640">
      <Path
        fill={color}
        d="M463 448.2C440.9 409.8 399.4 384 352 384L288 384C240.6 384 199.1 409.8 177 448.2C212.2 487.4 263.2 512 320 512C376.8 512 427.8 487.3 463 448.2zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM320 336C359.8 336 392 303.8 392 264C392 224.2 359.8 192 320 192C280.2 192 248 224.2 248 264C248 303.8 280.2 336 320 336z"
      />
    </Svg>
  );
}

export function ProfileIconOutline({ color, size = 24 }: Props) {
  // Circle-user outline — viewBox 640×640
  return (
    <Svg width={size} height={size} viewBox="0 0 640 640">
      <Path
        fill={color}
        d="M320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64zM320 112C205.1 112 112 205.1 112 320C112 373 132 421.3 165.1 457.7C188.1 415.8 232.5 388 283.2 384.4C300.2 395.3 319 401.4 338.8 401.4C358.7 401.4 377.5 395.3 394.5 384.4C445.3 388.1 489.7 415.8 512.6 457.7C545.8 421.3 565.8 373 565.8 320C565.8 205.1 472.7 112 357.8 112zM320 192C359.8 192 392 224.2 392 264C392 303.8 359.8 336 320 336C280.2 336 248 303.8 248 264C248 224.2 280.2 192 320 192z"
      />
    </Svg>
  );
}

