import {
  Sequence,
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { Scene1 } from "./Scene1";
import { Scene2 } from "./Scene2";
import { Scene3 } from "./Scene3";
import { Scene4 } from "./Scene4";
import { Scene6 } from "./Scene6";
import { Scene7 } from "./Scene7";
import {
  SCENE_1_DURATION,
  SCENE_2_DURATION,
  SCENE_3_DURATION,
  SCENE_4_DURATION,
  SCENE_6_DURATION,
  SCENE_7_DURATION,
  COLOR_PRIMARY,
  FPS,
  TOTAL_DURATION,
} from "./constants";

export const MainVideo = () => {
  const frame = useCurrentFrame();
  let currentFrame = 0;
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };

  const baseVolume = 0.9;
  const fadeOutDurationInFrames = FPS;
  const volume = interpolate(
    frame,
    [TOTAL_DURATION - fadeOutDurationInFrames, TOTAL_DURATION],
    [baseVolume, 0],
    clamp
  );

  const scenes = [
    { component: Scene1, duration: SCENE_1_DURATION },
    { component: Scene2, duration: SCENE_2_DURATION },
    { component: Scene3, duration: SCENE_3_DURATION },
    { component: Scene4, duration: SCENE_4_DURATION },
    { component: Scene6, duration: SCENE_6_DURATION },
    { component: Scene7, duration: SCENE_7_DURATION },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLOR_PRIMARY }}>
      <Audio src={staticFile("music/Background.mp3")} volume={volume} />
      {scenes.map((scene, index) => {
        const from = currentFrame;
        currentFrame += scene.duration;
        return (
          <Sequence key={index} from={from} durationInFrames={scene.duration}>
            <scene.component />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
