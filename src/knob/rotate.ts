import React, { SFC } from "react";
/**
 * Applies style transform to children  
 */
const Rotate: SFC<{ rotation: number; translateZ?: number | undefined }> = ({
  rotation: rotate,
  translateZ,
  children,
}) => {
  const style: React.CSSProperties = {
    transform: `rotate(${rotate}deg) translateZ(${translateZ || 0}px)`,
    transformOrigin: "50% 50%",
    transformBox: "fill-box",
  };
  return React.createElement(
    React.Fragment,
    {},
    React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          style: {
            ...child.props.style,
            ...style,
          },
        });
      }
      return child;
    }),
  );
};
export default Rotate;
