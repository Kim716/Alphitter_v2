function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  rounded,
  outline,
}) {
  return <button className="text-brand-orange">{children}</button>;
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
