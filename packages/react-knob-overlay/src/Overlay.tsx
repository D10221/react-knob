import React, { FunctionComponent } from "react";
/** */
const BASE_HEIGHT = 100;
/** */
type KnobOverlayProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    topPosition: number;
    scale: number;
    knobCenter: number[];
    cursorPos: number[];
    overlayColor?: string | undefined;
    className?: string | undefined,
    lineClassName?: string | undefined,
    lineStyle?: React.CSSProperties | undefined
};
/** */
const cartesian2Polar: (
    x: number[],
    y: number[],
) => { distance: number; degrees: number } =
    /** */
    ([x1, y1], [x2, y2]) => {
        const x = x2 - x1;
        const y = y2 - y1;
        const distance = Math.sqrt(x * x + y * y);
        const radians = Math.atan2(y, x);
        const degrees = radians * (180 / Math.PI);
        return { distance, degrees };
    };
import Styles from "./styles";
/** */
const KnobOverlay: FunctionComponent<KnobOverlayProps> = ({
    topPosition = 0,
    scale = 1,
    knobCenter = [],
    cursorPos = [],
    className,
    lineClassName,
    style,
    lineStyle,
    ...props
}) => {
    if (!topPosition) return null;
    const { distance, degrees } = cartesian2Polar(knobCenter, cursorPos);
    const verticalLineScale = BASE_HEIGHT * scale;
    const styles = Styles({ style, lineStyle, distance, degrees, cursorPos, topPosition, verticalLineScale, knobCenter });
    return (
        <div className={className} style={styles.overlay} {...props} >
            <div className={lineClassName} style={styles.knobPath}></div>
            <div className={lineClassName} style={styles.bodyPath}></div>
            <div className={lineClassName} style={styles.topPath}></div>
            <div className={lineClassName} style={styles.centerPath}></div>
            <div className={lineClassName} style={styles.bottomPath}></div>
        </div>
    );
};

export default KnobOverlay;
