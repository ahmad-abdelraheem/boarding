import style from "./NumricInput.module.scss";

const NumricInput = ({ value, increment, decrement, removeWhenZero = false }: DefaultProps) => {
  return (
    <div className={style.numericContainer}>
      <button onClick={() => increment()} className={style.nextButton}>
        +
      </button>
      <input className={style.number} type="number" value={value} disabled />
      <button onClick={() => decrement()} className={style.prevButton}>
      {removeWhenZero && value === 1 ? 'X' : '-'}
      </button>
    </div>
  );
};

interface DefaultProps {
  value: number;
  increment: Function;
  decrement: Function;
  removeWhenZero: boolean;
}

export default NumricInput;
