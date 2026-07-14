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

/* ─── Cart / Bag — FA style ─────────────────────────────────────────────── */
export function CartIconFilledFA({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 640 640">
      <Path
        fill={color}
        d="M211.2 32C196.8 32 184.5 42.1 181.4 56.2L160.5 160L64 160C46.3 160 32 174.3 32 192C32 192.5 32 193 32.1 193.5L73.2 501.7C76.9 530.9 101.8 552 131.3 552L508.7 552C538.2 552 563.1 530.9 566.8 501.7L607.9 193.5C608 193 608 192.5 608 192C608 174.3 593.7 160 576 160L479.5 160L458.6 56.2C455.5 42.1 443.2 32 428.8 32L211.2 32zM240.4 160L399.6 160L415.3 80L224.7 80L240.4 160zM224 288C224 262.3 244.3 241.6 270 240.1C271.3 240 272.7 240 274 240C301.4 240 323.9 261.5 323.9 288C323.9 314.5 302.4 336 276 336C249.5 336 228 314.5 228 288zM364 288C364 261.5 385.5 240 412 240C438.5 240 460 261.5 460 288C460 314.5 438.5 336 412 336C385.5 336 364 314.5 364 288z"
      />
    </Svg>
  );
}

/* ─── Orders — FA package style ─────────────────────────────────────────── */
export function OrdersIconFilledFA({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 640 640">
      <Path
        fill={color}
        d="M58.7 165.5L288 68.8L288 480L58.7 383.3C40.5 375.7 28.9 357.8 28.9 338.1L28.9 210.7C28.9 191 40.5 173.1 58.7 165.5zM340.3 68.8L581.3 165.5C599.5 173.1 611.1 191 611.1 210.7L611.1 338.1C611.1 357.8 599.5 375.7 581.3 383.3L352 480L352 68.8L340.3 68.8zM288 32L320 32L352 32L596 130.2C619.9 139.9 640 165 640 210.7L640 338.1C640 383.8 619.9 408.9 596 418.6L320 528L44 418.6C20.1 408.9 0 383.8 0 338.1L0 210.7C0 165 20.1 139.9 44 130.2L288 32zM224 176L224 256L416 256L416 176L368 176L368 224L272 224L272 176L224 176z"
      />
    </Svg>
  );
}

export function OrdersIconOutlineFA({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 640 640">
      <Path
        fill={color}
        d="M58.7 165.5L288 68.8L288 480L58.7 383.3C40.5 375.7 28.9 357.8 28.9 338.1L28.9 210.7C28.9 191 40.5 173.1 58.7 165.5zM340.3 68.8L581.3 165.5C599.5 173.1 611.1 191 611.1 210.7L611.1 338.1C611.1 357.8 599.5 375.7 581.3 383.3L352 480L352 68.8L340.3 68.8zM288 32L320 32L352 32L596 130.2C619.9 139.9 640 165 640 210.7L640 338.1C640 383.8 619.9 408.9 596 418.6L320 528L44 418.6C20.1 408.9 0 383.8 0 338.1L0 210.7C0 165 20.1 139.9 44 130.2L288 32zM224 176L224 256L416 256L416 176L368 176L368 224L272 224L272 176L224 176z"
        opacity={0.6}
      />
    </Svg>
  );
}
