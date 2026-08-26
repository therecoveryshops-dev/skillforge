import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { body, colors, heading } from "../theme";

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
      {/* real crowded gym — live, then freezes on the interrupt */}
      <AbsoluteFill
        style={{
          translate: `${drift}px 0px`,
          filter: frame >= freeze ? "grayscale(0.85) brightness(0.5) contrast(1.1)" : "brightness(0.9)",
        }}
      >
        <Img
          src={staticFile("photos/gym1.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            scale: frame < freeze ? interpolate(frame, [0, freeze], [1.04, 1.1]) : 1.1,
          }}
        />
      </AbsoluteFill>
      {/* darken for text */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(6,9,14,0.5), rgba(6,9,14,0.2) 40%, rgba(6,9,14,0.85))" }} />

      {/* FREEZE stamp */}
      {frame >= freeze && (
        <div
          style={{
            position: "absolute",
            top: 250,
            right: 70,
            fontFamily: body,
            fontWeight: 900,
            fontSize: 30,
            letterSpacing: 4,
            color: colors.danger,
            border: `2px solid ${colors.danger}`,
            padding: "8px 16px",
            borderRadius: 6,
            rotate: "6deg",
            opacity: interpolate(frame, [freeze, freeze + 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          ❚❚ FREEZE
        </div>
      )}

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
