import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  interpolate,
  staticFile,
  spring,
  useVideoConfig,
} from "remotion";
import { COLOR_PRIMARY, COLOR_ACCENT, FONT_FAMILY } from "./constants";

export const Scene7 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
  
  const opacityIn = interpolate(frame, [0, 10], [0, 1], clamp);
  
  const opacityOut = interpolate(frame, [78, 90], [1, 0], clamp);
  const opacity = opacityIn * opacityOut;

  const pop = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  const logoScale = interpolate(pop, [0, 1], [0.86, 1], clamp);
  const titleY = interpolate(frame, [10, 26], [18, 0], clamp);
  const subtitleY = interpolate(frame, [18, 34], [18, 0], clamp);
  const ringScale = interpolate(frame, [0, 60], [0.9, 1.15], clamp);
  const ringOpacity = interpolate(frame, [10, 60], [0.35, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 35%, rgba(253, 193, 52, 0.16), transparent 55%), linear-gradient(135deg, ${COLOR_PRIMARY}, #002b55)`,
        fontFamily: FONT_FAMILY,
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 220,
            height: 220,
            margin: "0 auto 26px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 9999,
              border: `3px solid ${COLOR_ACCENT}`,
              opacity: ringOpacity,
              transform: `scale(${ringScale})`,
              filter: "blur(0.2px)",
            }}
          />
        <Img
          src={staticFile("screenshots/logo-payment-hub-512.png")}
          style={{
            width: 180,
            height: 180,
            margin: "0 auto",
            transform: `scale(${logoScale})`,
            filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.35))",
          }}
           onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        </div>
        <h1
          className="text-6xl font-bold text-white mb-5"
          style={{
            transform: `translateY(${titleY}px)`,
          }}
        >
          UTeM Payment Hub
        </h1>
        <h2
          className="text-3xl font-semibold tracking-wider"
          style={{
            color: COLOR_ACCENT,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          Fast. Secure. Centralized.
        </h2>
      </div>
    </AbsoluteFill>
  );
};
