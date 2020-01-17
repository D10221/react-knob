import React, { CSSProperties } from "react";
import useStyle from "@d10221/react-css";
import { classNames, randomName } from "@d10221/jss";
/**
 * Roland color
 */
export const DEFAULT_COLOR = "#f37d02";

const circleClass = randomName();
const dialClass = randomName();
const DEFAULT_STYLES = {
  circle: undefined,
  dial: undefined,
};
const DEFAULT_CLASSES = {
  circle: undefined,
  dial: undefined,
};
/**
 *
 */
export default function SimpleSkin(
  props: React.SVGProps<SVGSVGElement> & {
    classes?: {
      circle?: string | undefined;
      dial?: string | undefined;
    };
    styles?: {
      circle?: CSSProperties | undefined;
      dial?: CSSProperties | undefined;
    };
  },
) {
  const {
    className,
    style,
    styles = DEFAULT_STYLES,
    classes = DEFAULT_CLASSES,
    ...rest
  } = props;
  useStyle(
    `fill: ${DEFAULT_COLOR}; stroke: black; stroke-width: 5%`,
    circleClass,
  );
  useStyle(`width: 8%;height: 35%; fill: black;`, dialClass);
  return (
    <svg
      viewBox="0 0 100 100"
      focusable={"false"}
      className={className}
      style={{
        // It needs to forward down the style: transform
        ...style,
        touchAction: "none",
      }}
      {...rest}
    >
      <circle
        cx="50%"
        cy="50%"
        r={"47%"}
        className={classNames(circleClass, classes.dial)}
        style={styles.circle}
      />
      <rect
        x="48%"
        y="4%"
        className={classNames(dialClass, classes.dial)}
        style={styles.dial}
      />
    </svg>
  );
}
