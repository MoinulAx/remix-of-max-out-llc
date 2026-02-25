import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleEnter = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/home');
    }, 1800);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        
        {/* Animated gradient light sweeps - simulating studio lighting */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent animate-[pulse_4s_ease-in-out_infinite]" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary/20 via-transparent to-transparent animate-[pulse_6s_ease-in-out_infinite_1s]" />
          <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-t from-accent/15 via-transparent to-transparent animate-[pulse_5s_ease-in-out_infinite_2s]" />
        </div>
        
        {/* Camera flash effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white rounded-full opacity-0 animate-[cameraFlash_3s_ease-in-out_infinite]" style={{ boxShadow: '0 0 60px 30px rgba(255,255,255,0.3)' }} />
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white rounded-full opacity-0 animate-[cameraFlash_4s_ease-in-out_infinite_1.5s]" style={{ boxShadow: '0 0 80px 40px rgba(255,255,255,0.2)' }} />
          <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-white rounded-full opacity-0 animate-[cameraFlash_5s_ease-in-out_infinite_0.8s]" style={{ boxShadow: '0 0 40px 20px rgba(255,255,255,0.25)' }} />
        </div>

        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />

        {/* Horizontal film strip lines */}
        <div className="absolute inset-0 opacity-[0.04]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="absolute w-full h-px bg-white/50" style={{ top: `${12.5 * (i + 1)}%` }} />
          ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      {/* Transition overlay */}
      <div className={`fixed inset-0 z-50 bg-black transition-opacity duration-700 pointer-events-none ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}>
        {isTransitioning && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Flash burst on transition */}
            <div className="absolute inset-0 bg-white/10 animate-[cameraFlashBurst_1.8s_ease-out_forwards]" />
            <div className="absolute w-32 h-32 bg-white/20 rounded-full animate-[ping_1s_ease-out_forwards]" style={{ boxShadow: '0 0 120px 60px rgba(255,255,255,0.15)' }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="text-center z-10 px-4 animate-fade-in">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
          MAX OUT MANAGEMENT LLC
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12 font-light">
          Maximizing Talent. Investing in Vision.
        </p>
        <button 
          onClick={handleEnter}
          disabled={isTransitioning}
          className="inline-block bg-white text-black px-12 py-5 text-lg font-bold hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl disabled:opacity-50"
        >
          ENTER MANAGEMENT HUB
        </button>
      </div>

      <style>{`
        @keyframes cameraFlash {
          0%, 85%, 100% { opacity: 0; transform: scale(1); }
          90% { opacity: 0.8; transform: scale(1.5); }
          95% { opacity: 0; transform: scale(2); }
        }
        @keyframes cameraFlashBurst {
          0% { opacity: 0; }
          15% { opacity: 0.4; }
          40% { opacity: 0; }
          55% { opacity: 0.2; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Splash;
