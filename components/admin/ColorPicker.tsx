import React from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
interface IColorPickerProps {
  value?: string;
  onPickerChange: (color: string) => void;
}
const ColorPicker: React.FC<IColorPickerProps> = ({
  value,
  onPickerChange,
}) => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center">
        <p>#</p>
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          className="hex-input"
        />
      </div>
      <HexColorPicker color={value} onChange={onPickerChange} />
    </div>
  );
};

export default ColorPicker;
