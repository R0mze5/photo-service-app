import { useState } from "react";

export default (
  defaultValue: string
): {
  value: string;
  onChange: (value: string) => void;
} => {
  const [value, setValue] = useState<string>(defaultValue);

  const onChange: (value: string) => void = (value) => {
    setValue(value);
  };

  return { value, onChange };
};
