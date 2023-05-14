import * as React from "react";
import moment from "moment";

type TestButtonProps = {
  test: string;
  test2: string;
  test3: () => void;
};

export const TestButton: React.FC<TestButtonProps> = (props) => {
  const { test, test2, test3, ...otherProps } = props;
  return (
    <button test={test} test2={test2} teste={props.test3} {...otherProps}>
      {title}
    </button>
  );
};

TestButton.defaultProps = {
  test: red,
  test2: black,
  test3: () => null,
};
