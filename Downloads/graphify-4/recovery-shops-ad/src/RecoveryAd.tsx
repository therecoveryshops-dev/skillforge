import { AbsoluteFill, Sequence } from "remotion";
import { colors } from "./theme";
import { Scene1Interrupt } from "./scenes/Scene1Interrupt";
import { Scene2Leaving } from "./scenes/Scene2Leaving";
import { Scene3Split } from "./scenes/Scene3Split";
import { Scene4Amenities } from "./scenes/Scene4Amenities";
import { Scene5Process } from "./scenes/Scene5Process";
import { Scene6Benefits } from "./scenes/Scene6Benefits";
import { Scene7Doors } from "./scenes/Scene7Doors";
import { Scene8CTA } from "./scenes/Scene8CTA";

// The Recovery Shops — 45s vertical ad @ 30fps (1350 frames)
export const RecoveryAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <Sequence from={0} durationInFrames={90} name="1 · Pattern Interrupt">
        <Scene1Interrupt />
      </Sequence>
      <Sequence from={90} durationInFrames={150} name="2 · Leaving">
        <Scene2Leaving />
      </Sequence>
      <Sequence from={240} durationInFrames={120} name="3 · Split Decision">
        <Scene3Split />
      </Sequence>
      <Sequence from={360} durationInFrames={300} name="4 · Amenities">
        <Scene4Amenities />
      </Sequence>
      <Sequence from={660} durationInFrames={210} name="5 · Process">
        <Scene5Process />
      </Sequence>
      <Sequence from={870} durationInFrames={210} name="6 · Benefits">
        <Scene6Benefits />
      </Sequence>
      <Sequence from={1080} durationInFrames={150} name="7 · Doors">
        <Scene7Doors />
      </Sequence>
      <Sequence from={1230} durationInFrames={120} name="8 · CTA">
        <Scene8CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
