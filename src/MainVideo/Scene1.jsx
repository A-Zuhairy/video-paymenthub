import { AbsoluteFill, Img, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";
import { COLOR_PRIMARY, FONT_FAMILY } from "./constants";

export const Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, 90], [0.9, 1.05], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(to bottom right, ${COLOR_PRIMARY}, #002b55)`,
        fontFamily: FONT_FAMILY,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ opacity, transform: `scale(${scale})`, textAlign: "center" }}>
        <Img
          src={staticFile("screenshots/logo-payment-hub-512.png")}
          style={{ width: 200, height: 200, margin: "0 auto 20px" }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        {/* Fallback if image missing or just text below */}
        <h1 className="text-5xl font-bold text-white mb-4">UTeM Payment Hub</h1>
        <p className="text-xl text-gray-200">The Official Payment Platform of Universiti Teknikal Malaysia Melaka</p>
      </div>
    </AbsoluteFill>
  );
};
