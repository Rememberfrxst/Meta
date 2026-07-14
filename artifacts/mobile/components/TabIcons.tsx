/**
 * TabIcons — pure SVG tab bar icons.
 * No font loading = no Japanese/Chinese glyph fallbacks on physical Android.
 */
import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

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

/* ─── Cart / Bag ────────────────────────────────────────────────────────── */
export function CartIconFilled({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M6 2a1 1 0 0 0 0 2h1.22l1.7 7.39A3 3 0 0 0 10 17h9a1 1 0 0 0 0-2h-9a1 1 0 0 1-.97-.76L8.73 13H18a2 2 0 0 0 1.94-1.5l1.5-6A2 2 0 0 0 19.5 3H7.28L6.8 2H6zm3.5 17.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm7.5 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"
      />
    </Svg>
  );
}

export function CartIconOutline({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 2H4M6 2l2 9m-2-9h13.5a1 1 0 0 1 .97 1.25l-1.5 6A2 2 0 0 1 17 11H8.5M8 18h9M9 21.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm7 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0z"
      />
    </Svg>
  );
}

/* ─── Orders / Receipt ─────────────────────────────────────────────────── */
export function OrdersIconFilled({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M4 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm2 4h12v2H6V7zm0 4h12v2H6v-2zm0 4h8v2H6v-2z"
      />
    </Svg>
  );
}

export function OrdersIconOutline({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect
        x={3}
        y={3}
        width={18}
        height={18}
        rx={2}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        d="M7 8h10M7 12h10M7 16h6"
      />
    </Svg>
  );
}

/* ─── Profile / Me ─────────────────────────────────────────────────────── */
export function ProfileIconFilled({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={8} r={4} fill={color} />
      <Path
        fill={color}
        d="M4 20c0-4 3.58-7 8-7s8 3 8 7H4z"
      />
    </Svg>
  );
}

export function ProfileIconOutline({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle
        cx={12}
        cy={8}
        r={4}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        d="M4 20c0-4 3.58-7 8-7s8 3 8 7"
      />
    </Svg>
  );
}
