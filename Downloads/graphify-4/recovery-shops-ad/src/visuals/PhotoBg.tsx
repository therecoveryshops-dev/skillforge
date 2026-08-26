import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { colors } from "../theme";

type Props = {
  src: string; // filename in public/photos
  from?: number; // frame at which the scene starts (for zoom timing)
  dim?: number; // 0..1 dark overlay strength
  zoom?: number; // extra scale over the scene
  tint?: string; // accent gradient tint
  pan?: "up" | "down" | "left" | "right";
};

// Full-bleed photo background with slow Ken Burns zoom + dark scrim so text stays legible.
export const PhotoBg: React.FC<Props> = ({ src, dim = 0.55, zoom = 0.12, tint, pan = "up" }) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 240], [1.02, 1.02 + zoom], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });
  const shift = interpolate(frame, [0, 240], [0, 40], { extrapolateRight: "clamp" });
  const translate =
    pan === "up"
      ? `0px ${-shift}px`
      : pan === "down"
        ? `0px ${shift}px`
        : pan === "left"
          ? `${-shift}px 0px`
          : `${shift}px 0px`;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <Img
        src={staticFile(`photos/${src}`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale,
          translate,
        }}
      />
      {/* dark scrim */}
      <AbsoluteFill style={{ backgroundColor: `rgba(6,9,14,${dim})` }} />
      {/* vignette + top/bottom gradient for text zones */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(6,9,14,0.75) 0%, rgba(6,9,14,0.15) 30%, rgba(6,9,14,0.15) 60%, rgba(6,9,14,0.85) 100%)",
        }}
      />
      {tint && <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 45%, ${tint}22, transparent 65%)` }} />}
    </AbsoluteFill>
  );
};
