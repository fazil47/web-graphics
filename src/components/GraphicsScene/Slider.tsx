import { useState } from "react";
import "./Slider.css";

interface sliderProps {
  label: string;
  min?: string;
  max?: string;
  step?: string;
  initialValue?: string;
  onChange: (value: number) => void;
}

export default function Slider({
  label,
  min = "0",
  max = "100",
  step = "1",
  initialValue = "0",
  onChange,
}: sliderProps) {
  const [value, setValue] = useState(parseFloat(initialValue));
  return (
    <label className="slider">
      <div>
        <span>{label}: </span>
        <span>{value}</span>
      </div>
      <input
        value={value}
        type="range"
        min={min}
        max={max}
        step={step}
        onChange={(event) => {
          const value = parseFloat(event.target.value);
          setValue(value);
          onChange(value);
        }}
      />
    </label>
  );
}
