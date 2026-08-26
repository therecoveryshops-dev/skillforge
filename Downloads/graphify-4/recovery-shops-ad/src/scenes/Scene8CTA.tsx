import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { body, colors, heading } from "../theme";
import { PhotoBg } from "../visuals/PhotoBg";

// 41–45s :: CTA. Logo over a luxury gym recovery room.
export const Scene8CTA: React.FC = () => {
  const frame = useCurrentFrame();

  const logoScale = interpolate(frame, [0, 18], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.6)),
  });

  const ctaPulse = 0.5 + 0.5 * Math.sin(frame / 8);

  return (
    <AbsoluteFill name="Scene8-CTA" style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      {/* luxury recovery room photo backdrop */}
      <PhotoBg src="sauna1.jpg" dim={0.72} zoom={0.1} tint={colors.cold} pan="up" />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 35%, rgba(94,231,255,0.18), transparent 55%)" }} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
        {/* free plan kicker */}
        <Interactive.Div
          name="CTAKicker"
          style={{
            fontFamily: body,
            fontWeight: 800,
            letterSpacing: 6,
            fontSize: 40,
            color: colors.cold,
            opacity: interpolate(frame, [4, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            marginBottom: 24,
          }}
        >
          GET YOUR FREE RECOVERY AMENITY PLAN
        </Interactive.Div>

        {/* logo mark */}
        <Interactive.Div
          name="Logo"
          style={{
            scale: logoScale,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              fontFamily: heading,
              fontWeight: 700,
              fontSize: 140,
              lineHeight: 0.95,
              color: colors.ink,
              textTransform: "uppercase",
              textAlign: "center",
              marginTop: 16,
            }}
          >
            The Recovery
          </div>
          <div
            style={{
              fontFamily: heading,
              fontWeight: 700,
              fontSize: 140,
              lineHeight: 0.95,
              color: colors.cold,
              textTransform: "uppercase",
              textAlign: "center",
              textShadow: "0 0 40px rgba(94,231,255,0.5)",
            }}
          >
            Shops
          </div>
        </Interactive.Div>

        {/* CTA button */}
        <Interactive.Div
          name="CTAButton"
          style={{
            marginTop: 70,
            fontFamily: body,
            fontWeight: 900,
            fontSize: 52,
            color: colors.bg,
            background: colors.cold,
            padding: "30px 60px",
            borderRadius: 70,
            textAlign: "center",
            boxShadow: `0 0 ${40 + ctaPulse * 40}px rgba(94,231,255,0.7)`,
            opacity: interpolate(frame, [30, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            scale: interpolate(frame, [30, 44], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.6)), output: "perceptual-scale" }),
          }}
        >
          BOOK A 15-MINUTE CONSULTATION
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
