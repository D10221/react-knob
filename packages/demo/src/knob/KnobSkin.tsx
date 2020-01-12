import React from "react";
import KnobHandle from "./KnobHandle";
import KnobInner from "./KnobInner";
export const KnobSkin = ({ ...props }) => <KnobInner {...props}><KnobHandle /></KnobInner>;
