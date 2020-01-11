import React, { useEffect } from "react";
import css from "./css";
const KnobInner = ({
  children = undefined as React.ReactNode | undefined,
  ...props
}) => {
  const className = "knobInner";
  useEffect(() =>
    css(
      `
        position: relative;
        width: 85%;
        height: 85%;
        border-radius: 50%;
        border: solid #111111 5px;  
        background-color: #F37D02;
        margin:0;
        padding: 0;
        overflow: hidden;
  `,
      className,
    ),
  );
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};
export default KnobInner;
