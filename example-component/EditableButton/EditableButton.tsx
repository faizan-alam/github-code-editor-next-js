import * as React from "react";
import moment from "moment";

type Props = {
  test: string;
  test2: string;
  test3: () => void;
};

export const TestButton: React.FC<Props> = (props) => {
  const { test, test2, ...otherProps } = props;
  return (
    <button test={test} test2={test2} test3={props.test3} {...otherProps}>
      {title}
    </button>
  );
};

TestButton.defaultProps = {
  test: "red",
  test2: "black",
  test3: () => null,
};
