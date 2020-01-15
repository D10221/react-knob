import React, { FunctionComponent } from "react";
import { DEFAULT_SIZE } from "./defaults";
export type KnobContainerProps = Partial<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> & {
  size: number | string;
};

/** 
 * @description sets overall size removes touch action from inner children
 * 
*/
const KnobContainer: FunctionComponent<KnobContainerProps> = ({
  children,
  size = DEFAULT_SIZE,
  className,
  style,
  ...props
}) => {
  return (
    <div
      {...props}
      style={{
        width: size, // it should just work
        height: size,
        ...style, //but, allow override
      }}
      className={className}
    >
      {React.Children.map(children, (c => {
        if (React.isValidElement(c)) {
          const { style, ...p } = c.props;
          return React.cloneElement(c, {
            ...p, style: {
              // disable children 'clicks'
              touchAction: "none", // it should just work
              pointerEvents: "none",
              ...style, // but, allow override
            } as React.CSSProperties
          })
        }
        return c;
      }))}
    </div>
  );
};

export default KnobContainer;
