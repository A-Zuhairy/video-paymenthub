import { AbsoluteFill, Img, useCurrentFrame, interpolate, staticFile } from "remotion";
import { COLOR_PRIMARY, FONT_FAMILY } from "./constants";

export const Scene7 = () => {
  const frame = useCurrentFrame();
  
  // Entry fade
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  
  // Exit fade (last 10 frames of 90 frames)
  const exitOpacity = interpolate(frame, [80, 90], [1, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLOR_PRIMARY,
        fontFamily: FONT_FAMILY,
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity
      }}
    >
      <div style={{ opacity, textAlign: "center" }}>
        <Img
          src={staticFile("screenshots/logo-payment-hub-512.png")}
          style={{ width: 180, height: 180, margin: "0 auto 30px" }}
           onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <h1 className="text-6xl font-bold text-white mb-6">UTeM Payment Hub</h1>
        <h2 className="text-3xl text-[#fdc134] font-semibold tracking-wider">Fast. Secure. Centralized.</h2>
      </div>
    </AbsoluteFill>
  );
};
