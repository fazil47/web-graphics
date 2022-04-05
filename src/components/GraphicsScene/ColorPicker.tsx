import { useState } from "react";
import "./ColorPicker.css";
import { Color, ColorRepresentation } from "three";

interface colorPickerProps {
  label: string;
  onChange: (value: Color) => void;
  initialColor?: ColorRepresentation;
}

export default function ColorPicker({
  label,
  onChange,
  initialColor,
}: colorPickerProps) {
  const [color, setColor] = useState(
    initialColor ? new Color(initialColor) : new Color(0xffffff)
  );

  return (
    <label className="colorPicker">
      <span>{label}: </span>
      <input
        type="color"
        title={label}
        value={"#" + color.getHexString()}
        onChange={(event) => {
          setColor(new Color(event.target.value));
          onChange(new Color(event.target.value));
        }}
      ></input>
    </label>
  );
}
