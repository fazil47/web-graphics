import { useState } from "react";
import "./Dropdown.css";

interface dropdownProps {
  label: string;
  options: { label: string; value: string }[];
  initialSelection?: string;
  onChange: (value: string) => void;
}

export default function Dropdown({
  label,
  options,
  onChange,
  initialSelection,
}: dropdownProps) {
  const [selection, setSelection] = useState(initialSelection);

  return (
    <label className="dropdown">
      <span>{label}: </span>
      <select
        onChange={(event) => {
          setSelection(event.target.value);
          onChange(event.target.value);
        }}
        value={selection}
      >
        <option disabled selected>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
