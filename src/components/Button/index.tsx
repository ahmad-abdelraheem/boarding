import style from "./Button.module.scss";

const Button = ({
  handler,
  placeHolder,
  className,
  restProps,
}: DefaultProps) => {
  return (
    <button onClick = {() => handler()} className={`${style.buyBtn} ${className}`} {...restProps}>
      {placeHolder}
    </button>
  );
};

interface DefaultProps {
  handler: Function;
  placeHolder: string;
  className: string;
  restProps?: object;
}
export default Button;
