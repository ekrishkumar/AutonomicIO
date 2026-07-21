import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  withGlow?: boolean;
}

export default function Logo({ className = "", size = 32, withGlow = true }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      <defs>
        {/* Continuous multi-stop linear gradient from top-left to bottom-right representing the official color palette */}
        <linearGradient id="logo-brand-grad" x1="15%" y1="20%" x2="85%" y2="80%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F3F4F5" />   {/* Cream / Off-White */}
          <stop offset="25%" stopColor="#FF9408" />  {/* Bright Sunset Orange */}
          <stop offset="55%" stopColor="#CA3F16" />  {/* Warm Red-Orange / Rust */}
          <stop offset="100%" stopColor="#95122C" /> {/* Deep Crimson / Burgundy */}
        </linearGradient>

        {/* Premium ambient shadow matching the warm branding */}
        <filter id="logo-warm-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#CA3F16" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* Styled symmetric "Y/T" brand icon with perfectly rounded corners and smooth fillets */}
      <path
        d="M 18 32
           V 30
           Q 18 24, 24 24
           H 32
           Q 38 24, 38 30
           V 38
           Q 38 44, 44 44
           H 56
           Q 62 44, 62 38
           V 30
           Q 62 24, 68 24
           H 76
           Q 82 24, 82 30
           V 38
           Q 82 44, 76 44
           H 68
           Q 60 44, 60 52
           V 70
           Q 60 76, 54 76
           H 46
           Q 40 76, 40 70
           V 52
           Q 40 44, 32 44
           H 24
           Q 18 44, 18 38
           V 32
           Z"
        fill="url(#logo-brand-grad)"
        filter={withGlow ? "url(#logo-warm-shadow)" : undefined}
      />
    </svg>
  );
}

