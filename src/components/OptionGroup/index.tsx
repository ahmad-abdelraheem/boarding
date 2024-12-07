import { Product } from "../../types";
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
            option.id === selectedOption ? style.selected : ""
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
  options: Product[];
  selectedOption: number;
  selectHandler: Function;
  children: React.ReactNode;
}

export default OptionGroup;
