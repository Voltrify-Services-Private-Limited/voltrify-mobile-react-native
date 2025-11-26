import React from "react";
import Svg, { Path } from "react-native-svg";

const CartIcon = ({ width = 18, height = 20, color = "#A09CAB" }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 20"
      fill="none"
    >
      <Path
        d="M1 1H4L5.5 13L16 11L17 4H4.5M6 19C5.44772 19 5 18.5523 5 18C5 17.4477 5.44772 17 6 17C6.55228 17 7 17.4477 7 18C7 18.5523 6.55228 19 6 19ZM13 19C12.4477 19 12 18.5523 12 18C12 17.4477 12.4477 17 13 17C13.5523 17 14 17.4477 14 18C14 18.5523 13.5523 19 13 19Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CartIcon;
