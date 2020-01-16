import { CSSProperties } from "react";
/** */
const styles = ({
    style = undefined as CSSProperties | undefined,
    lineStyle = undefined as CSSProperties | undefined,
    knobCenter = [] as number[],
    cursorPos = [] as number[],
    degrees = 0,
    topPosition = 0,
    distance = 0,
    verticalLineScale = 0
}) => {
    const baseLineStyle: CSSProperties = {
        position: "absolute",
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        ...lineStyle
    };

    const knobPath: CSSProperties = Object.assign({}, baseLineStyle, {
        opacity: 0.5,
        transformOrigin: "left center",
        transform:
            `translateX(${knobCenter[0]}px) translateY(${knobCenter[1]}px) translateZ(0) ` +
            `rotate(${degrees}deg) ` +
            `scaleX(${distance})`,
    });

    const bodyPath: CSSProperties = Object.assign({}, baseLineStyle, {
        transformOrigin: "center top",
        transform:
            `translateX(${cursorPos[0]}px) translateY(${topPosition}px) translateZ(0) ` +
            `scaleY(${verticalLineScale})`,
    });

    const topPath: CSSProperties = Object.assign({}, baseLineStyle, {
        transform:
            `translateX(${cursorPos[0]}px) translateY(${topPosition}px) translateZ(0) ` +
            `scaleX(12)`,
    });

    const centerPath: CSSProperties = Object.assign({}, baseLineStyle, {
        transform:
            `translateX(${cursorPos[0]}px) ` +
            `translateY(${topPosition + verticalLineScale / 2}px) ` +
            `translateZ(0) scaleX(12)`,
    });

    const bottomPath: CSSProperties = Object.assign({}, baseLineStyle, {
        transform:
            `translateX(${cursorPos[0]}px) ` +
            `translateY(${topPosition + verticalLineScale}px) ` +
            `translateZ(0) scaleX(12)`,
    });

    const styles: { [key: string]: CSSProperties } = {
        knobPath,
        bodyPath,
        topPath,
        centerPath,
        bottomPath,
        overlay: {
            position: "fixed",
            zIndex: 100,
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            cursor: "ns-resize",
            touchAction: "none",
            pointerEvents: "none",
            ...style
        },
    };
    return styles;
};
export default styles;