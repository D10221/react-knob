import React from "react";
/**
 * It needs to forward down the style: transform
 */
export default function SimpleSkin(props: React.SVGProps<SVGSVGElement>) {
  const { style, ...p } = props;
  return <svg {...p}
    viewBox="0 0 100 100"
    focusable={"false"}
    style={{
      ...style,
      touchAction: "none"
    }}>
    <circle
      cx="50%"
      cy="50%"
      r={"47%"}
      style={{
        // filter: "url(#drop-shadow)"
      }}
    />
    <rect x="48%" y="4%" width="5%" height="33%" fill="white" />
  </svg>
}