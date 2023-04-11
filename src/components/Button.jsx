import classNames from "classnames";
import { twMerge } from "tailwind-merge";

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  rounded,
  outline,
  ...rest
}) {
  let classes = classNames(
    rest.className,
    "px-6 py-2 border text-xl rounded hover:drop-shadow-lg",
    {
      "border-brand-orange bg-brand-orange text-white": primary,
      "border-secondary bg-secondary text-white": secondary,
      "border-success bg-success text-white": success,
      "border-warning bg-warning text-white": warning,
      "border-danger bg-danger text-white": danger,
      "rounded-full": rounded,
      "bg-white": outline,
      "text-brand-orange": outline && primary,
      "text-secondary": outline && secondary,
      "text-success": outline && success,
      "text-warning": outline && warning,
      "text-danger": outline && danger,
    }
  );
  classes = twMerge(classes);

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

Button.propTypes = {
  // 客製化對 props 的規則，primary,secondary,success,warning,danger 只能有一個 true
  // checkVariationValue 為函式，第一個參數是 props，這裡直接解構出那五個
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
    // Number(true) 等於 1, !!undefined 為 false，Number(false) 等於 0
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger);

    if (count > 1) {
      return new Error(
        "Only ONE of primary, secondary, success, warning, danger can be TRUE!"
      );
    }
  },
};

export default Button;
