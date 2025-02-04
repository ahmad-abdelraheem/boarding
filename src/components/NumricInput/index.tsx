import style from "./NumricInput.module.scss";

const NumricInput = ({
  value,
  increment,
  decrement,
  removeWhenZero = false,
  maximum,
}: DefaultProps) => {
  return (
    <div className={style.numericContainer}>
      <button onClick={() => increment()} className={style.nextButton} disabled={value === maximum}>
        +
      </button>
      <input className={style.number} value={value} disabled />
      <button onClick={() => decrement()} className={style.prevButton}>
        {removeWhenZero && value === 1 ? "X" : "-"}
      </button>
    </div>
  );
};

interface DefaultProps {
  value: number;
  increment: Function;
  decrement: Function;
  removeWhenZero: boolean;
  minimum?: number;
  maximum?: number;
}

export default NumricInput;
