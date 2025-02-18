"use client";

import React, { CSSProperties } from 'react';

const NewsAnnouncements: React.FC = () => {
  const links = [
    { text: 'New Arrivals', href: '#' },
    { text: 'Exclusive Discounts', href: '#' },
    { text: 'Upcoming Events', href: '#' },
    { text: 'Latest Releases', href: '#' },
    { text: 'Limited-Time Offers', href: '#' },
  ];

  const marqueeStyle: CSSProperties = {
    animation: 'marquee 10s linear infinite',
    display: 'inline-block',
  };

  return (
    <div className=''>
      <div className="relative overflow-hidden">
        <div className="w-full h-10 flex items-center bg-blue-950 border">
          <div
            className="animate-marquee whitespace-nowrap flex space-x-6 sm:space-x-8 md:space-x-10"
            style={marqueeStyle}
          >
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-xs sm:text-sm md:text-base font-semibold text-white hover:text-gray-50 transition-all duration-200"
                onMouseEnter={(e) => {
                  const target = e.currentTarget
                    .closest<HTMLDivElement>('.animate-marquee');
                  if (target) target.style.animationPlayState = 'paused';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget
                    .closest<HTMLDivElement>('.animate-marquee');
                  if (target) target.style.animationPlayState = 'running';
                }}
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default NewsAnnouncements;
