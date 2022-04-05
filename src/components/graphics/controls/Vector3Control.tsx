import { useState } from "react";
import { Vector3 } from "three";
import "./Vector3Control.css";

interface vector3ControlProps {
  label: string;
  min?: string;
  max?: string;
  step?: string;
  initialValue?: Vector3;
  onChange: (value: Vector3) => void;
}

export default function Vector3Control({
  label,
  min = "0",
  max = "100",
  step = "1",
  initialValue = new Vector3(0, 0, 0),
  onChange,
}: vector3ControlProps) {
  const [value, setValue] = useState(initialValue);
  return (
    <div className="vector3Control">
      <span>{label}</span>
      <div className="Vector3Inputs">
        <label className="vector3X">
          <span>X: </span>
          <input
            title="x"
            value={value.x}
            type="number"
            min={min}
            max={max}
            step={step}
            onChange={(event) => {
              const newX = parseFloat(event.target.value);
              const newValue = new Vector3(newX, value.y, value.z);
              setValue(newValue);
              onChange(newValue);
            }}
          />
        </label>
        <label className="vector3Y">
          <span>Y: </span>
          <input
            title="y"
            value={value.y}
            type="number"
            min={min}
            max={max}
            step={step}
            onChange={(event) => {
              const newY = parseFloat(event.target.value);
              const newValue = new Vector3(value.x, newY, value.z);
              setValue(newValue);
              onChange(newValue);
            }}
          />
        </label>
        <label className="vector3Z">
          <span>Z: </span>
          <input
            title="z"
            value={value.z}
            type="number"
            min={min}
            max={max}
            step={step}
            onChange={(event) => {
              const newZ = parseFloat(event.target.value);
              const newValue = new Vector3(value.x, value.y, newZ);
              setValue(newValue);
              onChange(newValue);
            }}
          />
        </label>
      </div>
    </div>
  );
}
