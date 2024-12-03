import React from "react";
import style from "./InfoBlock.module.scss";

/**
 * A component that wraps children in a container with a specific class.
 *
 * @param {DefaultProps} props
 * @returns {React.ReactElement}
 */
const InfoBlock = ({ children }: DefaultProps): React.ReactElement => (
  <div className={style.infoBlock}>
    {React.Children.map(
      children,
      (child, index) => {
        if (React.isValidElement(child)) {
          const element = child as React.ReactElement; // Narrow the type to ReactElement
          return React.cloneElement(element, {
            className: `${element.props.className || ""} ${
              style.infoItem
            }`.trim(),
            key: `info-item-${index}`,
          });
        } else {
          return child; // If it's not a valid React element, just return it as-is
        }
      }
    )}
  </div>
);

export default InfoBlock;

interface DefaultProps {
  children: React.ReactNode[] | React.ReactNode;
}