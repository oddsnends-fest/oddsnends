import React from "react";
import tyler from "src/app/components/PhotoIDCard/tyler.png";

const PhotoIDCard = () => {
  return (
    <div>
      <div className="m-auto flex gap-3 rounded-t-lg bg-amber-200">
        <div className="w-1/3">
          <img src={tyler.src} className="m-4 h-4/5 w-full" />
        </div>
        <div className="m-4 w-2/3">
          <div className="flex">
            <div className="w-3/4">
              <div className="mt-3 flex items-baseline gap-2">
                <p>Name</p>
                <p className="flex-1 border-b border-black">P'Fame</p>
              </div>
            </div>
            <div className="w-1/4">
              <img src={tyler.src} className="h-auto w-full" />
            </div>
          </div>
          <div>
            <div className="mt-3 flex items-baseline gap-2">
              <p>Date of birth</p>
              <p className="flex-1 border-b border-black"></p>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <p>Hobby</p>
              <div className="flex-1 border-b border-black"></div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <p>Spirit Animal</p>
              <div className="flex-1 border-b border-black"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto flex items-center justify-between rounded-b-lg bg-amber-200">
        {/* Date of Issue Section */}
        <div className="flex items-center gap-2">
          <p>Date of issue</p>
          <div className="w-20 border-b border-black"></div>
        </div>

        {/* Signature Section */}
        <div className="flex flex-col items-center">
          <div className="w-32 border-b border-black"></div>
          <p className="text-sm">Signature</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoIDCard;
