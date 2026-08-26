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

// 22–29s :: Empty room -> finished branded recovery suite.
const steps = ["DESIGN", "EQUIPMENT", "DELIVERY", "INSTALLATION"];
const stepStart = 40;
const stepGap = 34;

export const Scene5Process: React.FC = () => {
  const frame = useCurrentFrame();

  // room "builds" — glow ramps as steps complete
  const build = interpolate(frame, [stepStart, stepStart + steps.length * stepGap], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill name="Scene5-Process" style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      {/* room floor + walls transforming */}
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 78%, rgba(94,231,255,${0.05 + build * 0.22}), transparent 60%)` }} />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 620,
          background: `linear-gradient(180deg, rgba(20,30,40,${0.2 + build * 0.6}), rgba(8,12,18,1))`,
          borderTop: `2px solid rgba(94,231,255,${0.2 + build * 0.6})`,
        }}
      />
      {/* finished recovery suite photo reveals as the build completes */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          left: 90,
          right: 90,
          height: 560,
          borderRadius: 24,
          overflow: "hidden",
          border: `3px solid rgba(94,231,255,${0.3 + build * 0.5})`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 ${build * 60}px rgba(94,231,255,0.3)`,
          opacity: interpolate(build, [0.4, 0.8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: `0px ${interpolate(build, [0.4, 0.85], [80, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px`,
        }}
      >
        <Img
          src={staticFile("photos/spa1.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            scale: interpolate(build, [0.4, 1], [1.05, 1.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        />
        <AbsoluteFill style={{ background: "linear-gradient(180deg, transparent 55%, rgba(6,9,14,0.8))" }} />
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: 30,
            fontFamily: body,
            fontWeight: 800,
            fontSize: 34,
            letterSpacing: 3,
            color: colors.cold,
            opacity: interpolate(build, [0.7, 0.95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          ✓ READY FOR MEMBERS
        </div>
      </div>

      <Interactive.Div
        name="ProcessTitle"
        style={{
          position: "absolute",
          top: 170,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: heading,
          fontWeight: 700,
          fontSize: 92,
          color: colors.ink,
          textTransform: "uppercase",
          opacity: interpolate(frame, [4, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        We handle it all
      </Interactive.Div>

      {/* vertical pipeline of steps */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {steps.map((s, i) => {
            const start = stepStart + i * stepGap;
            const local = frame - start;
            const on = frame >= start;
            const pop = interpolate(local, [0, 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.back(1.6)),
            });
            return (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 30 }}>
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: on ? colors.cold : "#16222c",
                    color: on ? colors.bg : colors.muted,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: body,
                    fontWeight: 900,
                    fontSize: 48,
                    scale: pop,
                    boxShadow: on ? `0 0 40px ${colors.cold}88` : "none",
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    fontFamily: heading,
                    fontWeight: 700,
                    fontSize: 92,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: on ? colors.ink : "#33424e",
                    opacity: interpolate(local, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                    translate: `${interpolate(local, [0, 12], [-40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px 0px`,
                  }}
                >
                  {s}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
