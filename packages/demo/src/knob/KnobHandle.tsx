import React, { useEffect } from "react";
import css from "./css";
const KnobHandle = ({
  children = undefined as React.ReactNode | undefined,
  ...props
}) => {
  const className = "knobHandle-xxx-yyy-123";
  const style = `
  position: relative;
  width: 10%;
  height: 45%;
  background-color: #111111;
  top: -5%;
  left: 50%;
  transform: translateX(-50%);  
  margin:0;
  padding: 0;
  `;
  useEffect(() => css(style, className));
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};
export default KnobHandle;
