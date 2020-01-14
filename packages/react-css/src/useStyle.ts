import { useEffect } from "react";
import css from "./createStyle";
import randomName from "./randomName";
/** */
export default function useStyle(style: string, className = randomName()) {  
  useEffect(() => css(style, className));
  return className;
}
