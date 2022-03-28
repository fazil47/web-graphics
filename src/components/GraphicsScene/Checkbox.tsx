import { useState } from "react";
import "./Checkbox.css";

interface checkboxProps {
  label: string;
  onChange: (value: boolean) => void;
  initialChecked?: boolean;
}

export default function Checkbox({
  label,
  onChange,
  initialChecked,
}: checkboxProps) {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <label className="checkbox">
      <span>{label}: </span>
      <input
        type="checkbox"
        title={label}
        checked={checked}
        onChange={(event) => {
          setChecked(event.target.checked);
          onChange(event.target.checked);
        }}
      ></input>
    </label>
  );
}
