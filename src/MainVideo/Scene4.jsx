import { AbsoluteFill, Img, useCurrentFrame, interpolate, staticFile } from "remotion";
import { FONT_FAMILY, SCENE_4_DURATION } from "./constants";

export const Scene4 = () => {
  const frame = useCurrentFrame();
  
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
  const opacity = interpolate(frame, [0, 12], [0, 1], clamp);

  const captionY = interpolate(frame, [8, 34], [44, 0], clamp);
  const captionOpacity = interpolate(frame, [8, 34], [0, 1], clamp);
 
  // Static view, same logic as Scene 3 to fit perfectly
  const browserWidth = 1400;
  const aspectRatio = 1872 / 931;
  const browserHeight = browserWidth / aspectRatio;

  const windowY = interpolate(frame, [0, SCENE_4_DURATION], [10, -6], clamp);
  const windowScale = interpolate(frame, [0, SCENE_4_DURATION], [0.99, 1.03], clamp);
  const windowRotate = interpolate(frame, [0, SCENE_4_DURATION], [0.2, -0.2], clamp);

  const chip1 = interpolate(frame, [22, 34], [0, 1], clamp);
  const chip2 = interpolate(frame, [34, 46], [0, 1], clamp);
  const chip3 = interpolate(frame, [46, 58], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: "#f8fafc", fontFamily: FONT_FAMILY }}>
       <div 
        className="absolute inset-0" 
        style={{
            background: `
                radial-gradient(circle at 10% 20%, rgba(0, 64, 128, 0.05) 0%, transparent 40%),
                radial-gradient(circle at 90% 80%, rgba(253, 193, 52, 0.05) 0%, transparent 40%)
            `
        }}
      />

       <div 
        className="absolute left-1/2 top-1/2 shadow-2xl rounded-xl overflow-hidden bg-white border border-gray-200/50"
        style={{ 
            opacity,
            width: browserWidth,
            height: browserHeight + 40,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            transform: `translate(-50%, -50%) translateY(${windowY}px) scale(${windowScale}) rotate(${windowRotate}deg)`,
            transformOrigin: "center",
        }}
      >
        <div className="h-10 bg-white border-b border-gray-100 flex items-center px-4 space-x-4">
            <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50"></div>
            </div>
             <div className="flex-1 max-w-2xl mx-auto h-7 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-center">
                 <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
                    <span className="text-gray-400">🔒</span>
                    <span>paymenthub.utem.edu.my</span>
                 </div>
            </div>
        </div>
        
        <div className="relative w-full h-full bg-white flex items-start justify-center overflow-hidden">
             <Img 
                src={staticFile("screenshots/transaksi.png")}
                style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "contain"
                }}
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<div class="flex items-center justify-center h-full text-gray-400">Transaction History Screenshot Placeholder</div>';
                }}
             />
        </div>
      </div>

      <div
        className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-row gap-3"
        style={{ opacity }}
      >
        <div
          className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/60 text-[#004080] font-semibold"
          style={{
            opacity: chip1,
            transform: `translateY(${interpolate(chip1, [0, 1], [12, 0], clamp)}px)`,
          }}
        >
          Search quickly
        </div>
        <div
          className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/60 text-[#004080] font-semibold"
          style={{
            opacity: chip2,
            transform: `translateY(${interpolate(chip2, [0, 1], [12, 0], clamp)}px)`,
          }}
        >
          Filter by status
        </div>
        <div
          className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/60 text-[#004080] font-semibold"
          style={{
            opacity: chip3,
            transform: `translateY(${interpolate(chip3, [0, 1], [12, 0], clamp)}px)`,
          }}
        >
          Export records
        </div>
      </div>

      {/* Caption */}
      <div 
        className="absolute bottom-12 left-0 right-0 text-center"
        style={{ opacity: captionOpacity, transform: `translateY(${captionY}px)` }}
      >
        <div className="inline-block px-10 py-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50">
             <h2 className="text-3xl font-bold text-[#004080] tracking-tight">
                Track <span className="text-[#fdc134]">transactions</span> and payment history easily
             </h2>
        </div>
      </div>
    </AbsoluteFill>
  );
};
