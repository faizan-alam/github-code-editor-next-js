import * as React from "react";
import moment from "moment";

type Props = {
  test: string;
  test2: string;
  test3: () => void;
};

export const Button: React.FC<Props> = (props) => {
  const { test, test2, ...otherProps } = props;
  return (
    <button test={test} test2={test2} onClick={props.test3} {...otherProps}>
      {title}
    </button>
  );
};

Button.defaultProps = {
  test: "test",
  test2: "test3",
  test3: () => null,
};
