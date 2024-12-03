import React from "react";
import style from "./InfoBlock.module.scss";

const InfoBlock = ({ children }: DefaultProps) => (
  <div className={style.infoBlock}>
    {React.Children.map(
      children,
      (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              className: `${child.props.className || ""} ${
                style.infoItem
              }`.trim(),
              key: `info-item-${index}`,
            })
          : child // If it's not a valid React element, just return it as-is
    )}
  </div>
);

export default InfoBlock;

interface DefaultProps {
  children: React.ReactNode[] | React.ReactNode;
}
