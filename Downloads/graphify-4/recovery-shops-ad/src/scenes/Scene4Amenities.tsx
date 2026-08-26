import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { body, colors, heading } from "../theme";
import { ChamberIll, HotTubIll, OxygenIll, PlungeIll, SaunaIll, SteamIll } from "../visuals/Illustrations";

// 12–22s :: Rapid cinematic reveals of recovery amenities, one at a time.
const items = [
  { label: "INFRARED SAUNAS", Ill: SaunaIll, tint: colors.warm },
  { label: "COLD PLUNGES", Ill: PlungeIll, tint: colors.cold },
  { label: "HYPERBARIC CHAMBERS", Ill: ChamberIll, tint: "#B79CFF" },
  { label: "OXYGEN SYSTEMS", Ill: OxygenIll, tint: "#7FE3FF" },
  { label: "HOT TUBS", Ill: HotTubIll, tint: colors.warm },
  { label: "STEAM & RECOVERY ROOMS", Ill: SteamIll, tint: colors.green },
];

const introLen = 42;
const step = 42; // frames per item

export const Scene4Amenities: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Scene4-Amenities" style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      {/* ambient gym glow */}
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 12%, rgba(94,231,255,0.10), transparent 55%)" }} />

      {/* brand intro */}
      <Interactive.Div
        name="AmenitiesKicker"
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: body,
          fontWeight: 800,
          letterSpacing: 8,
          fontSize: 40,
          color: colors.cold,
          opacity: interpolate(frame, [6, introLen], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        AT THE RECOVERY SHOPS
      </Interactive.Div>
      <Interactive.Div
        name="AmenitiesTitle"
        style={{
          position: "absolute",
          top: 210,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: heading,
          fontWeight: 700,
          fontSize: 84,
          color: colors.ink,
          textTransform: "uppercase",
          opacity: interpolate(frame, [14, introLen], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        Complete Recovery
      </Interactive.Div>

      {/* stacked amenity cards */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingTop: 120 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, width: 900 }}>
          {items.map((it, i) => {
            const start = introLen + i * step;
            const local = frame - start;
            const enter = interpolate(local, [0, 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            });
            const isNew = frame >= start && frame < start + 16;
            return (
              <div
                key={it.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 30,
                  padding: "26px 34px",
                  borderRadius: 20,
                  background: "linear-gradient(90deg, rgba(20,28,36,0.95), rgba(12,18,24,0.9))",
                  border: `2px solid ${isNew ? it.tint : "#1c2833"}`,
                  boxShadow: isNew ? `0 0 45px ${it.tint}55` : "none",
                  opacity: enter,
                  translate: `${interpolate(local, [0, 12], [-70, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px 0px`,
                }}
              >
                <div
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${it.tint}1f`,
                    flexShrink: 0,
                  }}
                >
                  <it.Ill glow={isNew ? 16 : 0} style={{ width: 100, height: 100 }} />
                </div>
                <div
                  style={{
                    fontFamily: heading,
                    fontWeight: 700,
                    fontSize: 66,
                    color: it.tint,
                    textTransform: "uppercase",
                    lineHeight: 1,
                  }}
                >
                  {it.label}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
