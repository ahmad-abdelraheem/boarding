import { Children, useState } from "react";
import style from "./OptionGroup.module.scss";

const OptionGroup = ({
  options,
  selectedOption,
  selectHandler,
  children,
}: DefaultProps) => {
  return (
    <div className={style.optionsGroup}>
      {children}
      {options.map((option, index) => (
        <div
          className={`${style.option} ${
            index === selectedOption ? style.selected : ""
          }`}
          key={`option-${index}`}
          onClick={() => selectHandler(index)}
        >
          <div className={style.info}>
            <span className={style.name}>{option.name}</span>
            <span className={style.price}>{option.price} د.أ</span>
          </div>
          <ul className={style.features}>
            {option.features.map((feature, index) => (
              <li className={style.feature} key={`option-feature-${index}`}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

interface DefaultProps {
  options: Option[];
  selectedOption: number;
  selectHandler: Function;
  children: React.ReactNode;
}

interface Option {
  name: string;
  features: string[];
  price: number;
}
export default OptionGroup;
