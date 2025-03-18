import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface SliderBoxProps {
  maxPoint: number;
  minPoint: number;
  defaultValue?: number;
}

function SliderBox({ maxPoint, minPoint, defaultValue }: SliderBoxProps) {
  const [value, setValue] = useState(defaultValue ?? minPoint);
  return (
    <div className="flex flex-col gap-3">
      <Slider
        defaultValue={[defaultValue ?? minPoint]}
        min={minPoint}
        max={maxPoint}
        step={1}
        onValueChange={(val) => setValue(val[0] ?? value)}
      />
      <div className="flex justify-between">
        <div className="flex h-[18px] w-[31px] items-center justify-center rounded-lg bg-custom-light-gray text-xs">
          {minPoint}
        </div>
        <div className="flex h-[18px] w-[31px] items-center justify-center rounded-lg bg-custom-light-gray text-xs">
          {maxPoint}
        </div>
      </div>
    </div>
  );
}

export default SliderBox;
