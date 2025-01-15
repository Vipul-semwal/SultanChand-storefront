import React from 'react';

// Define the prop types for the component
interface IndexProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
}

const GlobalHero: React.FC<IndexProps> = ({ backgroundImage, title, subtitle }) => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat text-white py-8 px-6"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Dynamic background image
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-red-500 opacity-60"></div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto text-center p-6 rounded-lg">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-4">
          {title} {/* Dynamic Title */}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
          {subtitle} {/* Dynamic Subtitle */}
        </p>
      </div>
    </div>
  );
};

export default GlobalHero;
