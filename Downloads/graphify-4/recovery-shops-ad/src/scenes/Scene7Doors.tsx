import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { body, colors, heading } from "../theme";
import { PlungeIll, SaunaIll, SteamIll } from "../visuals/Illustrations";

// 36–41s :: ENGAGEMENT INTERRUPT. Three doors.
const doors = [
  { label: "SAUNA", Ill: SaunaIll, tint: colors.warm },
  { label: "COLD PLUNGE", Ill: PlungeIll, tint: colors.cold },
  { label: "COMPLETE ROOM", Ill: SteamIll, tint: colors.green },
];

export const Scene7Doors: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Scene7-Doors" style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, rgba(94,231,255,0.08), transparent 60%)" }} />

      <Interactive.Div
        name="DoorsQuestion"
        style={{
          position: "absolute",
          top: 180,
          left: 80,
          right: 80,
          textAlign: "center",
          fontFamily: heading,
          fontWeight: 700,
          fontSize: 88,
          lineHeight: 1.05,
          color: colors.ink,
          textTransform: "uppercase",
          opacity: interpolate(frame, [4, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        Which would you add first?
      </Interactive.Div>

      {/* doors */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 30 }}>
          {doors.map((d, i) => {
            const start = 20 + i * 12;
            const local = frame - start;
            const rise = interpolate(local, [0, 16], [500, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            });
            return (
              <div
                key={d.label}
                style={{
                  width: 300,
                  height: 640,
                  borderRadius: "18px 18px 8px 8px",
                  background: "linear-gradient(180deg,#141f28,#0b141b)",
                  border: `3px solid ${d.tint}`,
                  boxShadow: `0 0 55px ${d.tint}44`,
                  translate: `0px ${rise}px`,
                  opacity: interpolate(local, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "50px 20px",
                }}
              >
                <d.Ill glow={20} style={{ width: 200, height: 200 }} />
                <div
                  style={{
                    fontFamily: heading,
                    fontWeight: 700,
                    fontSize: 58,
                    color: d.tint,
                    textTransform: "uppercase",
                    textAlign: "center",
                    lineHeight: 1,
                  }}
                >
                  {d.label}
                </div>
                {/* door handle */}
                <div style={{ position: "absolute", right: 26, top: "50%", width: 16, height: 60, borderRadius: 8, background: d.tint, opacity: 0.8 }} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* comment prompt */}
      <Interactive.Div
        name="CommentPrompt"
        style={{
          position: "absolute",
          bottom: 180,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(frame, [70, 86], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            fontFamily: body,
            fontWeight: 800,
            fontSize: 42,
            letterSpacing: 2,
            color: colors.bg,
            background: colors.ink,
            padding: "22px 40px",
            borderRadius: 60,
            textAlign: "center",
          }}
        >
          💬 COMMENT: SAUNA, PLUNGE, OR COMPLETE ROOM
        </div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
