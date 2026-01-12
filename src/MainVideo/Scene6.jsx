import { AbsoluteFill, Img, useCurrentFrame, interpolate, staticFile } from "remotion";
import { COLOR_PRIMARY, FONT_FAMILY } from "./constants";

export const Scene6 = () => {
  const frame = useCurrentFrame();
  
  // Float animation
  const floatY = Math.sin(frame / 30) * 15; // Increased float amplitude
  const scale = interpolate(frame, [0, 90], [0.95, 1.0], { extrapolateRight: "clamp" });
  
  const textOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });
  const textX = interpolate(frame, [10, 30], [50, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLOR_PRIMARY, fontFamily: FONT_FAMILY }}>
      <div className="flex flex-row items-center justify-center h-full w-full max-w-6xl mx-auto space-x-24">
        
        {/* Phone Mockup - Modern "iPhone 15 Pro" Style */}
        <div 
            className="relative w-[320px] h-[650px] border-[8px] border-[#1f2937] rounded-[3.5rem] bg-[#1f2937] overflow-hidden shadow-2xl"
            style={{ 
                transform: `translateY(${floatY}px) scale(${scale})`,
                boxShadow: "0 50px 100px -20px rgba(0,0,0,0.5)"
            }}
        >
             {/* Dynamic Island / Notch */}
             <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-20 flex items-center justify-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#1f2937]/50"></div>
             </div>
             
             {/* Screen Content */}
             <div className="w-full h-full bg-white overflow-hidden relative">
                <Img 
                    src={staticFile("screenshots/mobile_dashboard.png")}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top"
                    }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = '<div class="flex items-center justify-center h-full text-gray-400 text-xs text-center p-4">Mobile View<br/>(Dashboard)</div>';
                    }}
                />
                
                {/* Simulated Mobile Header Overlay (Optional, adds realism) */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-white/90 backdrop-blur-sm z-10 border-b border-gray-100"></div>
             </div>
        </div>

        {/* Text */}
        <div style={{ opacity: textOpacity, transform: `translateX(${textX}px)` }} className="flex flex-col space-y-8 text-left max-w-xl">
            <div>
                <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
                    Accessible on <br/>
                    <span className="text-[#fdc134]">desktop</span> and <span className="text-[#fdc134]">mobile</span>
                </h2>
                <div className="h-2 w-24 bg-[#fdc134] rounded-full"></div>
            </div>
            <p className="text-3xl text-gray-300 font-light">
                Installable as a Progressive Web App (PWA)
            </p>
            <Img
                src={staticFile("screenshots/PWA.png")}
                style={{ width: "100%", height: "auto" }}
                className="max-w-md rounded-2xl shadow-2xl border border-white/10"
            />
        </div>

      </div>
    </AbsoluteFill>
  );
};
