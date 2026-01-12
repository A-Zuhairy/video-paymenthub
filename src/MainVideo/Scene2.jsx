import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLOR_PRIMARY, COLOR_ACCENT, FONT_FAMILY } from "./constants";

export const Scene2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title1Opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const title1Y = interpolate(frame, [0, 20], [50, 0], { extrapolateRight: "clamp" });

  const title2Opacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });
  const title2Y = interpolate(frame, [30, 50], [50, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLOR_PRIMARY,
        fontFamily: FONT_FAMILY,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="flex flex-col items-center">
        <h1
          style={{
            opacity: title1Opacity,
            transform: `translateY(${title1Y}px)`,
          }}
          className="text-7xl font-bold text-white mb-6"
        >
          Effortless Payments
        </h1>
        <h2
          style={{
            opacity: title2Opacity,
            transform: `translateY(${title2Y}px)`,
            color: COLOR_ACCENT,
          }}
          className="text-5xl font-semibold"
        >
          Anytime. Anywhere.
        </h2>
      </div>
    </AbsoluteFill>
  );
};
