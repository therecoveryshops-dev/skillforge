import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { body, colors, heading } from "../theme";
import { PlungeIll, SaunaIll, SteamIll } from "../visuals/Illustrations";

// 3–8s :: Member walks out -> quick cuts to sauna, cold plunge, recovery studio.
const cuts = [
  { label: "SAUNAS", tint: colors.warm, Ill: SaunaIll, glow: "radial-gradient(circle at 50% 40%, rgba(255,138,61,0.35), transparent 60%)" },
  { label: "COLD PLUNGES", tint: colors.cold, Ill: PlungeIll, glow: "radial-gradient(circle at 50% 40%, rgba(94,231,255,0.32), transparent 60%)" },
  { label: "RECOVERY CLUBS", tint: colors.green, Ill: SteamIll, glow: "radial-gradient(circle at 50% 40%, rgba(84,227,142,0.28), transparent 60%)" },
];

export const Scene2Leaving: React.FC = () => {
  const frame = useCurrentFrame();

  // walking silhouette exits right in first ~40 frames
  const walkX = interpolate(frame, [0, 45], [0, 900], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const bob = Math.sin(frame / 3) * 10;
  const doorOpen = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const cutStart = 46;
  const cutLen = 30;

  return (
    <AbsoluteFill name="Scene2-Leaving" style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      {/* intro: gym exit with walking figure (first ~46 frames) */}
      {frame < cutStart && (
        <AbsoluteFill style={{ opacity: interpolate(frame, [40, cutStart], [1, 0], { extrapolateLeft: "clamp" }) }}>
          {/* doorway light */}
          <div
            style={{
              position: "absolute",
              right: 120,
              top: 500,
              width: 320,
              height: 920,
              borderRadius: 20,
              background: "linear-gradient(180deg, #1a2a36, #0d161d)",
              boxShadow: `0 0 ${120 * doorOpen}px rgba(94,231,255,0.4)`,
              border: "3px solid #23404f",
            }}
          />
          {/* walking silhouette */}
          <div
            style={{
              position: "absolute",
              bottom: 260,
              left: 300,
              translate: `${walkX}px ${bob}px`,
              width: 130,
              height: 340,
              borderRadius: "60px 60px 24px 24px",
              background: "#050708",
            }}
          />
          <Interactive.Div
            name="LeavingLabel"
            style={{
              position: "absolute",
              bottom: 180,
              left: 0,
              right: 0,
              textAlign: "center",
              fontFamily: body,
              fontWeight: 700,
              fontSize: 46,
              letterSpacing: 2,
              color: colors.muted,
            }}
          >
            …and they walk right out the door.
          </Interactive.Div>
        </AbsoluteFill>
      )}

      {/* quick cuts */}
      {cuts.map((c, i) => {
        const start = cutStart + i * cutLen;
        const on = frame >= start && frame < start + cutLen;
        if (!on && frame < start + cutLen) return null;
        const local = frame - start;
        return (
          <AbsoluteFill
            key={c.label}
            style={{
              opacity: on ? 1 : 0,
              background: colors.bgAlt,
            }}
          >
            <AbsoluteFill style={{ background: c.glow }} />
            <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 40 }}>
              <c.Ill
                glow={40}
                style={{
                  width: 620,
                  height: 620,
                  scale: interpolate(local, [0, 12], [0.8, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic), output: "perceptual-scale" }),
                }}
              />
              <div
                style={{
                  fontFamily: heading,
                  fontWeight: 700,
                  fontSize: 132,
                  color: c.tint,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  translate: `0px ${interpolate(local, [0, 8], [40, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px`,
                  textAlign: "center",
                  padding: "0 60px",
                }}
              >
                {c.label}
              </div>
            </AbsoluteFill>
          </AbsoluteFill>
        );
      })}

      {/* final stacked summary */}
      {frame >= cutStart + cuts.length * cutLen && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 24 }}>
          {cuts.map((c, i) => {
            const s = cutStart + cuts.length * cutLen;
            return (
              <div
                key={c.label}
                style={{
                  fontFamily: heading,
                  fontWeight: 700,
                  fontSize: 118,
                  color: c.tint,
                  textTransform: "uppercase",
                  opacity: interpolate(frame, [s + i * 5, s + i * 5 + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                  translate: `${interpolate(frame, [s + i * 5, s + i * 5 + 10], [-50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px 0px`,
                }}
              >
                {c.label}
              </div>
            );
          })}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
