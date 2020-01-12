import React, { FunctionComponent } from "react";
import useStyle from "./react-css";
import classNames from "./classNames";
import randomName from "./randomName";
type KnobInnerProps = Partial<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>;
const styles = `
position: relative;
width: 85%;
height: 85%;
border-radius: 50%;
border: solid #111111 5px;  
background-color: #F37D02;
margin:0;
padding: 0;
overflow: hidden;
`;
/** preformance issues */
const cachedNamee = randomName();
/** */
const KnobInner: FunctionComponent<KnobInnerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames(useStyle(styles, cachedNamee), className)}
      {...props}
    >
      {children}
    </div>
  );
};
export default KnobInner;
