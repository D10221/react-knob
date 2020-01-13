import React, { SVGProps, useState, FunctionComponent } from "react";
import { round } from "./utils";
import Rotate from "./rotate";

const SvgSkin: FunctionComponent<SVGProps<SVGSVGElement> & {
    className?: string | undefined,
    bufferSize: number,
}> = ({ className, bufferSize, style, ...props }) => {
    return <svg className={""}
        viewBox="0 0 100 100"
        focusable={"false"}
        style={{
            // HAVE! to transfer down the transform
            ...style,
            touchAction: "none"
        }}
        {...props}
    >
        <g>
            <circle
                cx="50%"
                cy="50%"
                r={"47%"}
                style={{
                    // filter: "url(#drop-shadow)"
                }}
            />
            <circle
                cx="50%"
                cy="50%"
                r={"25%"}
                style={{
                    // filter: `url(#inner-drop-shadow${active ? "-active" : ""})`,
                    fill: "darkgrey"
                }}
            />
            <Labels
                rotation={bufferSize}
                labels={ZERO_TO_TEN}
                y="12.5"
                style={{
                    // filter: "url(#text-shadow)",
                    fill: "pink",
                    stroke: "yellow",
                    fontSize: ".8rem"
                }}
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

