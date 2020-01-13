import React, { FunctionComponent } from "react";
import useStyle from "./react-css";
import classNames from "./classNames";
import randomName from "./randomName";

export const DEFAULT_BORDER_COLOR = "black";
export const DEFAULT_COLOR = "#F37D02";

type CircleProps = Partial<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> & {
  borderColor?: string;
};
/** preformance issues */
const circleClassName = randomName();
/** */
const Circle: FunctionComponent<CircleProps> = ({
  children,
  className,
  borderColor = DEFAULT_BORDER_COLOR,
  color = DEFAULT_COLOR,
  ...props
}) => {
  return (
    <div
      className={classNames(
        className,
        useStyle(
          `
      position: relative;
      width: 85%;
      height: 85%;
      border-radius: 50%;
      border: solid ${borderColor} 5px;  
      background-color: ${color};
      margin:0;
      padding: 0;
      overflow: hidden;
      `,
          circleClassName,
        ),
      )}
      {...props}
    >
      {children}
    </div>
  );
};
type DialProps = Partial<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>;
/** preformance */
const dialClassName = randomName();
/** */
const Dial: FunctionComponent<DialProps> = ({
  children,
  className,
  color = DEFAULT_BORDER_COLOR,
  ...props
}) => {
  return (
    <div
      className={classNames(
        className,
        useStyle(
          `
      position: relative;
      width: 10%;
      height: 45%;
      background-color: ${color};
      top: -5%;
      left: 50%;
      transform: translateX(-50%);  
      margin:0;
      padding: 0;
      `,
          dialClassName,
        ),
      )}
      {...props}
    >
      {children}
    </div>
  );
};
/**
 * Default skin
    note: 
    because the knob component injects css, 
    it's css will be last 
    on every render
    and will have higher priority, 
    to override color from 'main' css 
    mak overriding rule as !important 
 */
const KnobSkin: FunctionComponent<CircleProps & {
  circleClass?: string | undefined;
  dialClass?: string | undefined;
}> = ({ color, borderColor, circleClass, dialClass, ...props }) => (
  <Circle
    {...props}
    color={color}
    borderColor={borderColor}
    className={circleClass}
  >
    <Dial color={borderColor} className={dialClass} />
  </Circle>
);
export default KnobSkin;
