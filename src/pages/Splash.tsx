import React from 'react';
import { Link } from 'react-router-dom';
import { images } from '@/assets/images';

const Splash = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 -z-10">
        <img 
          src="/lovable-uploads/4d40bf6f-b67b-4203-a5d4-4448b598571b.png"
          alt="Max Out Management"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="text-center z-10 px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
          MAX OUT MANAGEMENT LLC
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12 font-light">
          Maximizing Talent. Investing in Vision.
        </p>
        <Link 
          to="/home"
          className="inline-block bg-white text-black px-12 py-5 text-lg font-bold hover:bg-white/90 transition-colors shadow-2xl"
        >
          ENTER MANAGEMENT HUB
        </Link>
      </div>
    </div>
  );
};

export default Splash;
