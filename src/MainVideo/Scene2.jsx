import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { COLOR_PRIMARY, COLOR_ACCENT, FONT_FAMILY } from "./constants";

export const Scene2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };

  const title1Opacity = interpolate(frame, [0, 14], [0, 1], clamp);
  const title1Y = interpolate(frame, [0, 18], [60, 0], clamp);
  const title1Scale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  const title2Opacity = interpolate(frame, [22, 36], [0, 1], clamp);
  const title2Y = interpolate(frame, [22, 40], [50, 0], clamp);
  const title2Scale = spring({
    frame: frame - 18,
    fps,
    config: { damping: 16, mass: 0.9 },
  });

  const blob1X = Math.sin(frame / 22) * 120;
  const blob1Y = Math.cos(frame / 28) * 80;
  const blob2X = Math.cos(frame / 26) * 140;
  const blob2Y = Math.sin(frame / 20) * 90;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 20% 25%, rgba(253, 193, 52, 0.18), transparent 55%), linear-gradient(135deg, ${COLOR_PRIMARY}, #002b55)`,
        fontFamily: FONT_FAMILY,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.9,
          mixBlendMode: "screen",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: 9999,
            backgroundColor: "rgba(253, 193, 52, 0.22)",
            filter: "blur(80px)",
            left: 140,
            top: 140,
            transform: `translate(${blob1X}px, ${blob1Y}px)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 640,
            height: 640,
            borderRadius: 9999,
            backgroundColor: "rgba(255, 255, 255, 0.10)",
            filter: "blur(90px)",
            right: 120,
            bottom: 80,
            transform: `translate(${blob2X}px, ${blob2Y}px)`,
          }}
        />
      </div>
      <div className="flex flex-col items-center">
        <h1
          style={{
            opacity: title1Opacity,
            transform: `translateY(${title1Y}px) scale(${interpolate(
              title1Scale,
              [0, 1],
              [0.92, 1],
              clamp
            )})`,
          }}
          className="text-7xl font-bold text-white mb-6"
        >
          Effortless Payments
        </h1>
        <h2
          style={{
            opacity: title2Opacity,
            transform: `translateY(${title2Y}px) scale(${interpolate(
              title2Scale,
              [0, 1],
              [0.92, 1],
              clamp
            )})`,
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
