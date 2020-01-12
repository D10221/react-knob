import { useEffect } from "react";
import css from "./css";
import randomName from "./randomName";
/** */
export default function useStyle(style: string, className = randomName()) {  
  useEffect(() => css(style, className));
  return className;
}
