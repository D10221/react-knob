import React, { SVGProps, useState, FunctionComponent } from "react";
import { round } from "./utils";
import Rotate from "./rotate";
import { DEFAULT_BUFFER_SIZE } from "./defaults";
import randomName from "./randomName";
import classNames from "./classNames";
import useStyle from "./react-css";
/** */
const DEFAULT_CLASSES = {
    outter: undefined,
    inner: undefined,
    labels: undefined
}
/** */
const DEFAULT_STYLES = {
    outter: undefined,
    inner: undefined,
    labels: undefined,
}
/** cached  */
const outterCicleClass = randomName();
/** cached  */
const innerCircleClass = randomName();
/** cached  */
const labelClass = randomName();
/**
 * @description fancy svg skin 
 */
const SvgSkin: FunctionComponent<SVGProps<SVGSVGElement> & {
    bufferSize: number,
    classes?: {
        outter?: string | undefined,
        inner?: string | undefined,
        labels?: string | undefined
    },
    styles?: {
        outter?: React.CSSProperties | undefined,
        inner?: React.CSSProperties | undefined
        labels?: React.CSSProperties | undefined
    }
}> = ({ className, bufferSize = DEFAULT_BUFFER_SIZE, style, styles = DEFAULT_STYLES, classes = DEFAULT_CLASSES, ...props }) => {
    useStyle(`fill: black`, outterCicleClass);
    useStyle(`fill: darkgrey`, innerCircleClass);
    useStyle(`    
    stroke: whitesmoke;
    font-size: .8rem;
    `, labelClass);
    return <svg className={className}
        viewBox="0 0 100 100"
        focusable={"false"}
        style={{
            // HAVE! to transfer down the transform
            ...style,
            touchAction: "none",
        }}
        {...props}
    >
        <g>
            <circle
                cx="50%"
                cy="50%"
                r={"47%"}
                className={classNames(outterCicleClass, classes.outter)}
                style={{ ...styles.outter }}
            />
            <circle
                cx="50%"
                cy="50%"
                r={"25%"}
                className={classNames(innerCircleClass, classes.inner)}
                style={{ ...styles.inner }}
            />
            <Labels
                rotation={bufferSize}
                labels={ZERO_TO_TEN}
                y="12.5"
                className={classNames(labelClass, classes.labels)}
                style={{ ...styles.labels }}
            />
        </g>
    </svg>
}
export default SvgSkin;

/** */
const ZERO_TO_TEN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
/** */
const TextLabel: FunctionComponent<React.SVGProps<SVGTextElement>> = ({
    children,
    ...props
}) => {
    return (
        <svg
            viewBox="0 0 100 100"
            style={{ pointerEvents: "none", touchAction: "none" }}
        >
            <text dominantBaseline="middle" textAnchor="middle" {...props}>
                {children}
            </text>
        </svg>
    );
};
/**
 *
 */
const Labels: FunctionComponent<
    SVGProps<SVGTextElement> & {
        labels: any[];
        rotation: number;
    }
> = ({ labels, rotation, id, ...props }) => {
    labels = labels && labels.length ? labels : [];
    const deg = round((rotation) / (labels.length - 1), 2);
    const [children, setChildren] = useState([] as any);
    if (!children.length)
        requestAnimationFrame(() => {
            setChildren(labels!.map((x, index) => {
                return <Rotate rotation={index * deg * -1} key={`${id}-label-${index}`}>
                    <TextLabel
                        id={`${id}-label-${index}`}
                        x={"50%"}
                        y={"10%"}
                        {...props}
                        children={x}
                    />
                </Rotate>
            }))
        });
    return children;
};

