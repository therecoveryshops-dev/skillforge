import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { body, colors, heading } from "../theme";

// 8–12s :: SECOND PATTERN INTERRUPT. Split screen decision.
export const Scene3Split: React.FC = () => {
  const frame = useCurrentFrame();

  // divider slams down
  const divide = interpolate(frame, [0, 12], [0, 1920], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // right side "wins" -> highlight after 60
  const winPulse = frame > 60 ? 0.5 + 0.5 * Math.sin((frame - 60) / 6) : 0;

  return (
    <AbsoluteFill name="Scene3-Split" style={{ backgroundColor: colors.bg }}>
      {/* top: More equipment? */}
      <AbsoluteFill
        style={{
          height: 960,
          background: "linear-gradient(180deg,#141a20,#0b1014)",
          justifyContent: "center",
          alignItems: "center",
          opacity: interpolate(frame, [4, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <Interactive.Div
          name="OptionLeft"
          style={{
            fontFamily: heading,
            fontWeight: 700,
            fontSize: 130,
            color: colors.muted,
            textTransform: "uppercase",
            textAlign: "center",
            opacity: interpolate(frame, [70, 90], [1, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          More equipment?
        </Interactive.Div>
      </AbsoluteFill>

      {/* bottom: New revenue stream? */}
      <AbsoluteFill
        style={{
          top: 960,
          height: 960,
          background: "linear-gradient(180deg,#0b1a13,#07120d)",
          justifyContent: "center",
          alignItems: "center",
          opacity: interpolate(frame, [8, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 50%, rgba(84,227,142,${0.15 + winPulse * 0.2}), transparent 65%)` }} />
        <Interactive.Div
          name="OptionRight"
          style={{
            fontFamily: heading,
            fontWeight: 700,
            fontSize: 138,
            color: colors.green,
            textTransform: "uppercase",
            textAlign: "center",
            scale: interpolate(frame, [60, 78], [1, 1.08], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
              output: "perceptual-scale",
            }),
            textShadow: `0 0 ${30 + winPulse * 40}px rgba(84,227,142,0.6)`,
          }}
        >
          New revenue stream?
        </Interactive.Div>
      </AbsoluteFill>

      {/* divider */}
      <div
        style={{
          position: "absolute",
          top: 953,
          left: 0,
          width: divide,
          height: 14,
          background: colors.ink,
          boxShadow: "0 0 30px rgba(255,255,255,0.5)",
        }}
      />

      {/* VS badge */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            fontFamily: body,
            fontWeight: 900,
            fontSize: 64,
            color: colors.bg,
            background: colors.ink,
            width: 150,
            height: 150,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            scale: interpolate(frame, [14, 24], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.back(2)),
              output: "perceptual-scale",
            }),
          }}
        >
          VS
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
