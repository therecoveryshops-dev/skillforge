import "./index.css";
import { Composition, Folder } from "remotion";
import { FPS, HEIGHT, WIDTH } from "./theme";
import { RecoveryAd } from "./RecoveryAd";
import { Scene1Interrupt } from "./scenes/Scene1Interrupt";
import { Scene2Leaving } from "./scenes/Scene2Leaving";
import { Scene3Split } from "./scenes/Scene3Split";
import { Scene4Amenities } from "./scenes/Scene4Amenities";
import { Scene5Process } from "./scenes/Scene5Process";
import { Scene6Benefits } from "./scenes/Scene6Benefits";
import { Scene7Doors } from "./scenes/Scene7Doors";
import { Scene8CTA } from "./scenes/Scene8CTA";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RecoveryAd"
        component={RecoveryAd}
        durationInFrames={1350}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Folder name="Scenes">
        <Composition id="Scene1-Interrupt" component={Scene1Interrupt} durationInFrames={90} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene2-Leaving" component={Scene2Leaving} durationInFrames={150} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene3-Split" component={Scene3Split} durationInFrames={120} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene4-Amenities" component={Scene4Amenities} durationInFrames={300} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene5-Process" component={Scene5Process} durationInFrames={210} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene6-Benefits" component={Scene6Benefits} durationInFrames={210} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene7-Doors" component={Scene7Doors} durationInFrames={150} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene8-CTA" component={Scene8CTA} durationInFrames={120} fps={FPS} width={WIDTH} height={HEIGHT} />
      </Folder>
    </>
  );
};
