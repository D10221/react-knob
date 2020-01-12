import React, { FunctionComponent } from "react";
import useStyle from "./react-css";
import classNames from "./classNames";
import randomName from "./randomName";
type Props = Partial<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>;
/** */
const styles = `
  position: relative;
  width: 10%;
  height: 45%;
  background-color: #111111;
  top: -5%;
  left: 50%;
  transform: translateX(-50%);  
  margin:0;
  padding: 0;
  `;
/** preformance */
const cachedName = randomName();
/** */
const KnobHandle: FunctionComponent<Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames(useStyle(styles, cachedName), className)}
      {...props}
    >
      {children}
    </div>
  );
};
export default KnobHandle;
