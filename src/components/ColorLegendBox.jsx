import React from "react";

const Box = ({ text, color }) => {
  return (
    <div className="flex items-center">
      <div
        className={`h-6 w-6 bg-${color}-500  mr-4 mb-2`}
      ></div>
      <p className="text-center">{text}</p>
    </div>
  );
};

export default Box;