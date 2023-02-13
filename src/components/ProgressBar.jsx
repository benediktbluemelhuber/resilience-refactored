import React from "react";

const ProgressBar = ({ value }) => {
  return (
    <div class="w-full flex flex-col">
      <div class="w-full bg-gray-300 h-4 rounded-lg">
        <div
          class="bg-blue-500 h-full rounded-lg"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <div class="text-center mt-2">{value}%</div>
    </div>
  );
};

export default ProgressBar;