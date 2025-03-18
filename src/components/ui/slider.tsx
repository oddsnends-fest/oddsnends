"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    value?: number[];
    onValueChange?: (value: number[]) => void;
  }
>(({ className, value, onValueChange, ...props }, ref) => {
  const [buttonValue, setButtonValue] = useState(value);
  const [isSliding, setIsSliding] = useState(false);
  const handlePointerUp = () => {
    setTimeout(() => {
      setIsSliding(false);
    }, 500);
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className,
      )}
      value={value}
      onValueChange={(val) => {
        onValueChange?.(val);
        setButtonValue(val);
      }}
      onPointerDown={() => setIsSliding(true)}
      onPointerUp={handlePointerUp}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full border-2 border-custom-light-gray bg-white">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-6 w-6 rounded-full border-2 border-black bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
        {isSliding && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-custom-light-gray p-1 text-xs">
            {buttonValue?.[0] ?? props.min}
          </div>
        )}
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
