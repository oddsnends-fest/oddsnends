import React from "react";

const ImageCanvas = () => {
  return (
    <div
      style={{ backgroundImage: "url(starlogo.png)" }}
      className="absolute top-0 -z-20 h-full w-full bg-cover bg-center"
    ></div>
  );
};

export default ImageCanvas;
