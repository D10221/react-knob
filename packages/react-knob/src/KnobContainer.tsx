import React, { FunctionComponent } from "react";
import classNames from "./classNames";
import useStyle from "./react-css";
import { DEFAULT_SIZE } from "./defaults";

export type KnobContainerProps = Partial<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> & {
  size: number | string;
};
const cssclass = `
  margin:0;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;  
    `;
/** */
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
        ...style,
        width: size,
        height: size,
      }}
      className={classNames(useStyle(cssclass), className)}
    >
      {children}
    </div>
  );
};

export default KnobContainer;
