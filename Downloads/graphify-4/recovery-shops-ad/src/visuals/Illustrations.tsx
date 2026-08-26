import React from "react";
import { colors } from "../theme";

// Reusable SVG illustrations for gym + recovery amenities.
// Drawn to a 400x400 viewBox, scaled by parent.
type IllProps = { style?: React.CSSProperties; glow?: number };

const wrap = (glow: number | undefined, tint: string): React.CSSProperties => ({
  filter: glow ? `drop-shadow(0 0 ${glow}px ${tint}aa)` : undefined,
});

// Infrared sauna — wood cabin with warm glow
export const SaunaIll: React.FC<IllProps> = ({ style, glow }) => (
  <svg viewBox="0 0 400 400" style={{ ...wrap(glow, colors.warm), ...style }}>
    <defs>
      <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8a5a2b" />
        <stop offset="1" stopColor="#5c3a17" />
      </linearGradient>
      <radialGradient id="heat" cx="0.5" cy="0.7" r="0.7">
        <stop offset="0" stopColor={colors.warm} stopOpacity="0.9" />
        <stop offset="1" stopColor={colors.warm} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect x="70" y="70" width="260" height="280" rx="14" fill="url(#wood)" stroke="#3a2410" strokeWidth="6" />
    {[100, 140, 180, 220, 260, 300].map((y) => (
      <line key={y} x1="80" y1={y} x2="320" y2={y} stroke="#3a2410" strokeWidth="3" opacity="0.5" />
    ))}
    {/* glass door with heat */}
    <rect x="150" y="120" width="100" height="200" rx="8" fill="#1a2630" opacity="0.85" />
    <ellipse cx="200" cy="250" rx="90" ry="90" fill="url(#heat)" />
    {/* heater rocks */}
    <rect x="170" y="290" width="60" height="24" rx="6" fill="#2a1c10" />
    <circle cx="182" cy="288" r="9" fill={colors.warm} />
    <circle cx="200" cy="285" r="9" fill="#ff5a1a" />
    <circle cx="218" cy="288" r="9" fill={colors.warm} />
  </svg>
);

// Cold plunge — tub with ice cubes and cold mist
export const PlungeIll: React.FC<IllProps> = ({ style, glow }) => (
  <svg viewBox="0 0 400 400" style={{ ...wrap(glow, colors.cold), ...style }}>
    <defs>
      <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7ef0ff" />
        <stop offset="1" stopColor="#1c7fa0" />
      </linearGradient>
    </defs>
    <rect x="60" y="140" width="280" height="200" rx="24" fill="#0e1b24" stroke="#2a4a5c" strokeWidth="8" />
    <rect x="80" y="160" width="240" height="150" rx="14" fill="url(#water)" />
    {/* ripples */}
    <ellipse cx="160" cy="200" rx="40" ry="10" fill="#ffffff" opacity="0.4" />
    <ellipse cx="250" cy="230" rx="30" ry="8" fill="#ffffff" opacity="0.3" />
    {/* ice cubes */}
    {[
      [120, 185, 26],
      [180, 200, 30],
      [240, 185, 24],
      [200, 245, 28],
    ].map(([x, y, s], i) => (
      <rect key={i} x={x} y={y} width={s} height={s} rx="5" fill="#eaffff" opacity="0.9" stroke="#bff0ff" strokeWidth="2" />
    ))}
    {/* cold mist */}
    {[110, 200, 290].map((x, i) => (
      <circle key={i} cx={x} cy="150" r="26" fill={colors.cold} opacity="0.18" />
    ))}
  </svg>
);

// Hyperbaric chamber — capsule pod
export const ChamberIll: React.FC<IllProps> = ({ style, glow }) => (
  <svg viewBox="0 0 400 400" style={{ ...wrap(glow, "#B79CFF"), ...style }}>
    <defs>
      <linearGradient id="pod" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#2a2340" />
        <stop offset="0.5" stopColor="#4a3d78" />
        <stop offset="1" stopColor="#2a2340" />
      </linearGradient>
    </defs>
    <rect x="40" y="150" width="320" height="120" rx="60" fill="url(#pod)" stroke="#B79CFF" strokeWidth="6" />
    {/* window */}
    <rect x="120" y="172" width="160" height="76" rx="38" fill="#0e1420" opacity="0.9" />
    <ellipse cx="180" cy="205" rx="30" ry="20" fill="#B79CFF" opacity="0.25" />
    {/* bubbles */}
    {[150, 200, 250].map((x, i) => (
      <circle key={i} cx={x} cy={205 - i * 4} r={6 + i * 2} fill="#cdbcff" opacity="0.6" />
    ))}
    {/* base */}
    <rect x="90" y="270" width="220" height="26" rx="10" fill="#1a1630" />
  </svg>
);

// Hot tub — round tub with steam jets
export const HotTubIll: React.FC<IllProps> = ({ style, glow }) => (
  <svg viewBox="0 0 400 400" style={{ ...wrap(glow, colors.warm), ...style }}>
    <ellipse cx="200" cy="250" rx="150" ry="90" fill="#0e1b24" stroke="#2a4a5c" strokeWidth="8" />
    <ellipse cx="200" cy="245" rx="120" ry="66" fill="#2a7a8f" />
    <ellipse cx="200" cy="240" rx="120" ry="60" fill="#3a9ab0" opacity="0.6" />
    {/* jets bubbles */}
    {[140, 200, 260].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy="238" r="10" fill="#eaffff" opacity="0.7" />
        <circle cx={x - 6} cy="222" r="7" fill="#eaffff" opacity="0.5" />
        <circle cx={x + 8} cy="210" r="5" fill="#eaffff" opacity="0.4" />
      </g>
    ))}
    {/* steam */}
    {[150, 250].map((x, i) => (
      <path key={i} d={`M${x} 190 q -14 -30 6 -50 q 20 -20 4 -50`} stroke={colors.warm} strokeWidth="6" fill="none" opacity="0.35" strokeLinecap="round" />
    ))}
  </svg>
);

// Oxygen system — canister with O2
export const OxygenIll: React.FC<IllProps> = ({ style, glow }) => (
  <svg viewBox="0 0 400 400" style={{ ...wrap(glow, "#7FE3FF"), ...style }}>
    <rect x="150" y="90" width="100" height="240" rx="50" fill="#1a2a34" stroke="#7FE3FF" strokeWidth="6" />
    <rect x="180" y="60" width="40" height="40" rx="8" fill="#2a3a44" />
    <text x="200" y="230" fontSize="72" fontWeight="900" fill="#7FE3FF" textAnchor="middle" fontFamily="sans-serif">
      O
    </text>
    <text x="248" y="250" fontSize="40" fontWeight="900" fill="#7FE3FF" textAnchor="middle" fontFamily="sans-serif">
      2
    </text>
    {/* mist */}
    {[110, 290].map((x, i) => (
      <circle key={i} cx={x} cy="150" r="24" fill="#7FE3FF" opacity="0.15" />
    ))}
  </svg>
);

// Steam / recovery room — bench with steam
export const SteamIll: React.FC<IllProps> = ({ style, glow }) => (
  <svg viewBox="0 0 400 400" style={{ ...wrap(glow, colors.green), ...style }}>
    <rect x="60" y="80" width="280" height="260" rx="16" fill="#12241c" stroke="#2a4a3a" strokeWidth="6" />
    {/* bench */}
    <rect x="90" y="250" width="220" height="26" rx="6" fill="#2a4a3a" />
    <rect x="100" y="276" width="14" height="50" fill="#2a4a3a" />
    <rect x="286" y="276" width="14" height="50" fill="#2a4a3a" />
    {/* steam clouds */}
    {[130, 200, 270].map((x, i) => (
      <path key={i} d={`M${x} 220 q -18 -34 8 -60 q 26 -26 4 -64`} stroke={colors.green} strokeWidth="8" fill="none" opacity="0.4" strokeLinecap="round" />
    ))}
  </svg>
);

// Dumbbell — gym
export const DumbbellIll: React.FC<IllProps> = ({ style, glow }) => (
  <svg viewBox="0 0 400 400" style={{ ...wrap(glow, colors.muted), ...style }}>
    <rect x="120" y="180" width="160" height="40" rx="8" fill="#2a3a44" />
    {[70, 100, 300, 330].map((x, i) => (
      <rect key={i} x={x} y={150 - (i === 1 || i === 2 ? 20 : 0)} width="30" height={100 + (i === 1 || i === 2 ? 40 : 0)} rx="8" fill="#3a4a54" />
    ))}
  </svg>
);
