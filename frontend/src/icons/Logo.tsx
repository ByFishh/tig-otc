import React from "react";

const Logo = () => {
  return (
    <svg width="30" height="30" viewBox="0 0 143 122" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_241_360)">
        <path
          d="M98.5715 100.397H42.7666L70.9973 56.4098M98.5715 100.397L126.802 55.7533L70.9973 56.4098M98.5715 100.397L70.9973 56.4098"
          stroke="#ffc53d"
          strokeWidth="8"
        />
        <path
          d="M15.1934 57.0661L43.4241 13.0786M70.9983 57.0661L43.4241 13.0786M99.229 12.4221L43.4241 13.0786"
          stroke="#F0EDD0"
          strokeWidth="8"
        />
        <path d="M126.804 55.7536L99.2295 12.4221" stroke="#ffc53d" strokeWidth="8" />
        <circle cx="18" cy="55" r="14" fill="#F0EDD0" />
        <circle cx="45" cy="14" r="14" fill="#F0EDD0" />
        <circle cx="97" cy="14" r="14" fill="#F0EDD0" />
        <circle cx="71" cy="55" r="14" fill="#ffc53d" />
        <circle cx="125" cy="55" r="14" fill="#ffc53d" />
        <circle cx="45" cy="100" r="14" fill="#ffc53d" />
        <circle cx="97" cy="100" r="14" fill="#ffc53d" />
      </g>
      <defs>
        <filter
          id="filter0_d_241_360"
          x="0"
          y="0"
          width="143"
          height="122"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_241_360" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_241_360" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default Logo;
