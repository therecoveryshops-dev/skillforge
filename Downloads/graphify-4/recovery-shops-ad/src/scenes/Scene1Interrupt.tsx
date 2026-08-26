import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  random,
  useCurrentFrame,
} from "remotion";
import { body, colors, heading } from "../theme";
import { DumbbellIll } from "../visuals/Illustrations";

// 0–3s :: PATTERN INTERRUPT
// Crowded gym freezes, red warning flashes, headline slams in.
export const Scene1Interrupt: React.FC = () => {
  const frame = useCurrentFrame();
  const freeze = 22; // frame where the "video" freezes

  // subtle handheld motion before the freeze, then locked
  const drift = frame < freeze ? Math.sin(frame / 3) * 6 : 0;

  // red warning flash pulses
  const flash = frame >= freeze ? Math.abs(Math.sin((frame - freeze) / 4)) : 0;
  const flashOpacity = frame >= freeze ? interpolate(frame, [freeze, freeze + 30, 90], [0.5, 0.18, 0.18]) * flash : 0;

  return (
    <AbsoluteFill name="Scene1-Interrupt" style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      {/* faux crowded-gym: rows of moving equipment silhouettes */}
      <AbsoluteFill
        style={{
          translate: `${drift}px 0px`,
          filter: frame >= freeze ? "grayscale(0.8) brightness(0.55)" : "none",
        }}
      >
        {new Array(7).fill(0).map((_, row) =>
          new Array(4).fill(0).map((_, col) => {
            const i = row * 4 + col;
            const speed = 0.4 + random(`s${i}`) * 0.9;
            const cycle = frame < freeze ? Math.sin(frame / (14 / speed) + i) : Math.sin(freeze / (14 / speed) + i);
            const isGym = i % 3 === 0;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 60 + col * 250,
                  top: 120 + row * 250,
                  width: 150,
                  height: 150 + cycle * 40,
                  borderRadius: 22,
                  background: "#12202B",
                  border: "2px solid #1B3140",
                  opacity: 0.9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isGym && <DumbbellIll style={{ width: 110, height: 110, opacity: 0.5 }} />}
              </div>
            );
          })
        )}
      </AbsoluteFill>

      {/* red warning overlay */}
      <AbsoluteFill style={{ backgroundColor: colors.danger, opacity: flashOpacity, mixBlendMode: "screen" }} />

      {/* scanline/glitch bar on freeze */}
      {frame >= freeze && (
        <div
          style={{
            position: "absolute",
            top: interpolate((frame - freeze) % 24, [0, 24], [0, 1920]),
            left: 0,
            width: "100%",
            height: 6,
            background: colors.danger,
            opacity: 0.5,
          }}
        />
      )}

      {/* warning chip */}
      <Interactive.Div
        name="WarningChip"
        style={{
          position: "absolute",
          top: 360,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(frame, [freeze, freeze + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            fontFamily: body,
            fontWeight: 800,
            letterSpacing: 6,
            fontSize: 34,
            color: colors.danger,
            border: `3px solid ${colors.danger}`,
            padding: "14px 30px",
            borderRadius: 10,
            background: "rgba(255,59,78,0.08)",
          }}
        >
          ⚠ WARNING
        </div>
      </Interactive.Div>

      {/* headline slams in */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
        <Interactive.Div
          name="Headline1"
          style={{
            fontFamily: heading,
            fontWeight: 700,
            fontSize: 120,
            lineHeight: 1.02,
            textAlign: "center",
            color: colors.ink,
            textTransform: "uppercase",
            opacity: interpolate(frame, [freeze + 2, freeze + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            scale: interpolate(frame, [freeze + 2, freeze + 12], [1.3, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
              output: "perceptual-scale",
            }),
          }}
        >
          Your members are recovering…
        </Interactive.Div>
        <Interactive.Div
          name="Headline1b"
          style={{
            fontFamily: heading,
            fontWeight: 700,
            fontSize: 132,
            lineHeight: 1.02,
            textAlign: "center",
            color: colors.danger,
            textTransform: "uppercase",
            marginTop: 30,
            opacity: interpolate(frame, [freeze + 12, freeze + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            translate: `0px ${interpolate(frame, [freeze + 12, freeze + 22], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px`,
          }}
        >
          Just not at your gym.
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
