import React, { useState, useEffect } from 'react';

const HorizontalBar = ({ value }) => {
  const [pointerValue, setPointerValue] = useState(0);

  useEffect(() => {
    setPointerValue(value);
  }, [value]);

  let pointerDiv;
  if (pointerValue >= 0 && pointerValue < 20) {
    pointerDiv = <div className="bg-red-500 h-full mb-2 w-1/5 rounded-l-lg text-center my-text flex items-center justify-center"></div>
  } else if (pointerValue >= 20 && pointerValue < 40) {
    pointerDiv = <div className="bg-orange-500 h-full mb-2 w-1/5 text-center my-text flex items-center justify-center"></div>
  } else if (pointerValue >= 40 && pointerValue < 60) {
    pointerDiv = <div className="bg-yellow-500 h-full mb-2 w-1/5 text-center my-text flex items-center justify-center"></div>
  } else if (pointerValue >= 60 && pointerValue < 80) {
    pointerDiv = <div className="bg-green-500 h-full mb-2 w-1/5 text-center my-text flex items-center justify-center"></div>
  } else if (pointerValue >= 40 && pointerValue < 60) {
    pointerDiv = <div className="bg-blue-500 h-full mb-2 w-1/5 text-center my-text flex items-center justify-center"></div>
  }
;
};

export default HorizontalBar