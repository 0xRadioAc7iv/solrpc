import React from "react";

const NUM_SPARKLES = 80;

const getRandomSparkles = () =>
  Array.from({ length: NUM_SPARKLES }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 6 + Math.random() * 6,
    size: 2 + Math.random() * 2,
  }));

const AnimatedBackground: React.FC = () => {
  const sparkles = getRandomSparkles();

  return (
    <div className="inset-0 w-full h-full overflow-hidden bg-[#050816] relative">
      {/* Sparkles - BELOW static circle, ABOVE rotating ones */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {sparkles.map(({ id, left, delay, duration, size }) => (
          <div
            key={id}
            className="absolute bottom-0 bg-white rounded-full opacity-70"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animation: `floatUp ${duration}s ease-in infinite`,
              animationDelay: `${delay}s`,
              background: "radial-gradient(circle, #ffffff, #a855f7)",
              boxShadow: `0 0 6px #c084fc`,
            }}
          />
        ))}
      </div>

      {/* Static circle above all, near bottom center */}
      <div
        className="absolute top-[70vh] left-1/2 w-[280vh] h-[280vh] -ml-[65rem] rounded-full border border-purple-700/30 z-20"
        style={{
          background: `
            radial-gradient(circle at center,
              rgba(168, 85, 247, 0.7) 0%,
              rgba(168, 85, 247, 0.3) 50%,
              rgba(168, 85, 247, 0.05) 100%
            )`,
          boxShadow:
            "0 0 20px rgba(168, 85, 247, 0.9), 0 0 90px rgba(147, 51, 234, 0.5)",
        }}
      />

      {/* Circle 1 */}
      <div
        className="absolute top-1/2 left-1/2 w-[90vh] h-[90vh] -mt-[45vh] -ml-[45vh] rounded-full border border-purple-400/20"
        style={{
          animation: "rotate 60s linear infinite",
          transformOrigin: "center center",
        }}
      >
        <div className="beam-dot" />
      </div>

      {/* Circle 2 */}
      <div
        className="absolute top-1/2 left-1/2 w-[120vh] h-[120vh] -mt-[60vh] -ml-[60vh] rounded-full border border-purple-400/15"
        style={{
          animation: "rotate 60s linear infinite",
          animationDelay: "2s",
          transformOrigin: "center center",
        }}
      >
        <div className="beam-dot" />
      </div>

      {/* Circle 3 */}
      <div
        className="absolute top-1/2 left-1/2 w-[150vh] h-[150vh] -mt-[75vh] -ml-[75vh] rounded-full border border-purple-400/10"
        style={{
          animation: "rotate 60s linear infinite",
          animationDelay: "4s",
          transformOrigin: "center center",
        }}
      >
        <div className="beam-dot" />
      </div>

      {/* Blue glow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-purple-600/20 to-transparent" />

      {/* Global styles */}
      <style jsx global>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .beam-dot {
          position: absolute;
          top: 0%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: radial-gradient(circle, #ffffff, #a855f7);
          box-shadow: 0 0 15px #a855f7, 0 0 30px #9333ea;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.7;
          }
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          30% {
            opacity: 0.5;
          }
          60% {
            transform: translateY(-50vh) scale(0.6);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
