import { useEffect } from "react";
import { createStyle, randomName } from "@d10221/jss";

/** */
export default function useStyle(style: string, className = randomName()) {
  useEffect(() => createStyle(style, className), [style]);
  return className;
}
