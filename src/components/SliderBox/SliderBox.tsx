import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface SliderBoxProps {
  maxPoint: number;
  minPoint: number;
}

function SliderBox({ maxPoint, minPoint }: SliderBoxProps) {
  const [value, setValue] = useState(minPoint);
  return (
    <div className="flex flex-col gap-2">
      <Slider
        defaultValue={[minPoint]}
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
      <div>{value}</div>
    </div>
  );
}

export default SliderBox;
