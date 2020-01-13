import React, { FunctionComponent } from "react";
/**
 * Applies style transform to children  
 */
const Rotate: FunctionComponent<{ rotation: number; translateZ?: number | undefined }> = ({
  rotation,
  translateZ,
  children,
}) => {
  const style: React.CSSProperties = {
    transform: `rotate(${rotation}deg) translateZ(${translateZ || 0}px)`,
    transformOrigin: "50% 50%",
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
}; export default Rotate;
