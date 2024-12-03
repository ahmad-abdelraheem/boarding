import style from "./NumericInput.module.scss";

const NumericInput = ({ value, increment, decrement }: DefaultProps) => {
  return (
    <div className={style.numericContainer}>
      <button onClick={() => increment()} className={style.nextButton}>+</button>
      <input className={style.number} type="number" value={value} />
      <button onClick={() => decrement()} className={style.prevButton}>-</button>
    </div>
  );
};

interface DefaultProps {
  value: number;
  increment: Function;
  decrement: Function;
}

export default NumericInput;
