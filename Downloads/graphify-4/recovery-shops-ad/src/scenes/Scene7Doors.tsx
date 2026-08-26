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

// 36–41s :: ENGAGEMENT INTERRUPT. Three doors.
const doors = [
  { label: "SAUNA", photo: "sauna1.jpg", tint: colors.warm },
  { label: "COLD PLUNGE", photo: "plunge2.jpg", tint: colors.cold },
  { label: "COMPLETE ROOM", photo: "spa1.jpg", tint: colors.green },
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
                  border: `4px solid ${d.tint}`,
                  boxShadow: `0 0 55px ${d.tint}55`,
                  translate: `0px ${rise}px`,
                  opacity: interpolate(local, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* photo behind door */}
                <Img
                  src={staticFile(`photos/${d.photo}`)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    scale: interpolate(local, [0, 30], [1.15, 1.25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                  }}
                />
                <AbsoluteFill style={{ background: `linear-gradient(180deg, ${d.tint}22, rgba(6,9,14,0.2) 40%, rgba(6,9,14,0.9))` }} />
                <div
                  style={{
                    position: "absolute",
                    bottom: 40,
                    left: 0,
                    right: 0,
                    fontFamily: heading,
                    fontWeight: 700,
                    fontSize: 56,
                    color: d.tint,
                    textTransform: "uppercase",
                    textAlign: "center",
                    lineHeight: 1,
                    textShadow: "0 3px 20px rgba(0,0,0,0.9)",
                  }}
                >
                  {d.label}
                </div>
                {/* door handle */}
                <div style={{ position: "absolute", right: 22, top: "50%", width: 14, height: 60, borderRadius: 8, background: d.tint, boxShadow: `0 0 12px ${d.tint}`, opacity: 0.9 }} />
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
