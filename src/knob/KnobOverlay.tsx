import React from "react";
import { BASE_HEIGHT } from "./Constants";

//import ReactDOM from "react-dom";
// import "./App.css";

const cartesian2Polar: (
    x: number[],
    y: number[],
  ) => { distance: number; degrees: number } = ([x1, y1], [x2, y2]) => {
    const x = x2 - x1;
    const y = y2 - y1;
    const distance = Math.sqrt(x * x + y * y);
    const radians = Math.atan2(y, x);
    const degrees = radians * (180 / Math.PI);
    return { distance, degrees };
  };

const KnobOverlay = ({
    topPosition = 0,
    scale = 1,
    knobCenter = [] as number[],
    cursorPos = [] as number[],
    overlayColor = "#fff",
  }) => {
    const baseLineStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: 1,
      height: 1,
      backgroundColor: overlayColor,
    };
  
    const { distance, degrees } = cartesian2Polar(knobCenter, cursorPos);
    const verticalLineScale = BASE_HEIGHT * scale;
  
    const knobPath = Object.assign({}, baseLineStyle, {
      opacity: 0.5,
      transformOrigin: "left center",
      transform:
        `translateX(${knobCenter[0]}px) translateY(${knobCenter[1]}px) translateZ(0) ` +
        `rotate(${degrees}deg) ` +
        `scaleX(${distance})`,
    });
  
    const bodyPath = Object.assign({}, baseLineStyle, {
      transformOrigin: "center top",
      transform:
        `translateX(${cursorPos[0]}px) translateY(${topPosition}px) translateZ(0) ` +
        `scaleY(${verticalLineScale})`,
    });
  
    const topPath = Object.assign({}, baseLineStyle, {
      transform:
        `translateX(${cursorPos[0]}px) translateY(${topPosition}px) translateZ(0) ` +
        `scaleX(12)`,
    });
  
    const centerPath = Object.assign({}, baseLineStyle, {
      transform:
        `translateX(${cursorPos[0]}px) ` +
        `translateY(${topPosition + verticalLineScale / 2}px) ` +
        `translateZ(0) scaleX(12)`,
    });
  
    const bottomPath = Object.assign({}, baseLineStyle, {
      transform:
        `translateX(${cursorPos[0]}px) ` +
        `translateY(${topPosition + verticalLineScale}px) ` +
        `translateZ(0) scaleX(12)`,
    });
  
    const styles: any = {
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
      },
    };
  
    return (
      <div style={styles.overlay}>
        <div style={styles.knobPath}></div>
        <div style={styles.bodyPath}></div>
        <div style={styles.topPath}></div>
        <div style={styles.centerPath}></div>
        <div style={styles.bottomPath}></div>
      </div>
    );
  };
export default KnobOverlay