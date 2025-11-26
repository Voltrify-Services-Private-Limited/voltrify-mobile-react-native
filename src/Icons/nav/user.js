import React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

const UserIcon = ({ width = 24, height = 24, color = "#A09CAB" }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <G clipPath="url(#clip0_218_706)">
        <Path
          d="M19 20L18.2045 15.8C17.1756 14.7538 14.8016 14 12 14C9.19847 14 6.82429 14.7538 5.79545 15.8L5 20"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>

      <Defs>
        <ClipPath id="clip0_218_706">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default UserIcon;
