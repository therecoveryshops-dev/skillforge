import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { body, colors, heading } from "../theme";
import { PhotoBg } from "../visuals/PhotoBg";

// 29–36s :: Members using recovery, upgrade notification, retention graph rises.
const benefits = [
  { label: "PREMIUM MEMBERSHIPS", tint: colors.warm },
  { label: "NEW REVENUE", tint: colors.green },
  { label: "STRONGER RETENTION", tint: colors.cold },
];

export const Scene6Benefits: React.FC = () => {
  const frame = useCurrentFrame();

  // rising retention graph
  const graphProgress = interpolate(frame, [30, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const pts = [
    [0, 260],
    [120, 220],
    [240, 240],
    [360, 150],
    [480, 170],
    [600, 60],
    [720, 20],
  ];
  const shown = Math.max(1, Math.floor(graphProgress * (pts.length - 1)));
  const path = pts
    .slice(0, shown + 1)
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`)
    .join(" ");

  return (
    <AbsoluteFill name="Scene6-Benefits" style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <PhotoBg src="sauna3.jpg" dim={0.68} zoom={0.14} tint={colors.green} pan="down" />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 30%, rgba(84,227,142,0.10), transparent 60%)" }} />

      {/* retention graph */}
      <div style={{ position: "absolute", top: 220, left: 180, width: 720, height: 300 }}>
        <svg width={720} height={300} viewBox="0 0 720 300">
          <line x1="0" y1="290" x2="720" y2="290" stroke="#1e2c37" strokeWidth="3" />
          <path d={path} fill="none" stroke={colors.green} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
          {shown >= 0 && (
            <circle
              cx={pts[shown][0]}
              cy={pts[shown][1]}
              r={16}
              fill={colors.green}
              opacity={interpolate(frame % 20, [0, 10, 20], [1, 0.4, 1])}
            />
          )}
        </svg>
        <Interactive.Div
          name="GraphLabel"
          style={{
            position: "absolute",
            top: -60,
            left: 0,
            fontFamily: body,
            fontWeight: 800,
            fontSize: 40,
            color: colors.green,
            letterSpacing: 3,
            opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          ↑ RETENTION
        </Interactive.Div>
      </div>

      {/* phone upgrade notification */}
      <Interactive.Div
        name="UpgradeNotif"
        style={{
          position: "absolute",
          top: 560,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(frame, [55, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: `0px ${interpolate(frame, [55, 72], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px`,
        }}
      >
        <div
          style={{
            width: 780,
            background: "rgba(18,26,34,0.96)",
            border: "2px solid #26414f",
            borderRadius: 26,
            padding: "26px 34px",
            display: "flex",
            alignItems: "center",
            gap: 24,
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ fontSize: 60, width: 96, height: 96, borderRadius: 20, background: `${colors.warm}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>💳</div>
          <div>
            <div style={{ fontFamily: body, fontWeight: 800, fontSize: 40, color: colors.ink }}>Membership upgraded</div>
            <div style={{ fontFamily: body, fontWeight: 600, fontSize: 32, color: colors.muted }}>+ Recovery Access · Premium tier</div>
          </div>
        </div>
      </Interactive.Div>

      {/* benefit list */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 220, gap: 20 }}>
        {benefits.map((b, i) => {
          const start = 90 + i * 22;
          return (
            <div
              key={b.label}
              style={{
                fontFamily: heading,
                fontWeight: 700,
                fontSize: 108,
                color: b.tint,
                textTransform: "uppercase",
                opacity: interpolate(frame, [start, start + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                scale: interpolate(frame, [start, start + 14], [1.15, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic), output: "perceptual-scale" }),
              }}
            >
              {b.label}
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
