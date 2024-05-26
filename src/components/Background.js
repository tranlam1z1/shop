import React from "react";
import imageSrc from "../photos/Carousal1.jpg"; 

const Background = () => {
  return (
    <div className="text-white text-center py-4">
      <img src={imageSrc} alt="Description of the image" className="max-w-full h-auto" />
    </div>
  );
};

export default Background;
