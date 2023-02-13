import React, { useState, useEffect } from 'react';
import RecommendationsArray from '../assets/recommendations.json';

const CompareArrays = ({ scoresAssessment, scoresBenchmark, titles }) => {
  const [array1, setArray1] = useState([]);
  const [array2, setArray2] = useState([]);
  const [toggles, setToggles] = useState(
    Array.from({ length: scoresAssessment.length }, (_, i) => false)
  );

  useEffect(() => {
    setArray1(scoresAssessment);
    setArray2(scoresBenchmark);
    setToggles(
      Array.from({ length: scoresAssessment.length }, (_, i) => false)
    );
  }, [scoresAssessment, scoresBenchmark]);

  const handleToggle = (index) => {
    const newToggles = [...toggles];
    newToggles[index] = !newToggles[index];
    setToggles(newToggles);
  };

  return (
    <div class="flex flex-col">
      {array1.map((element, index) => {
        return (
          array2[index] && array2[index] * 10 > element ? (
            <div key={index} class="mb-2 p-2 border-2  border-blue-500 rounded ">
              <label class="relative">
                <input
                  type="checkbox"
                  checked={toggles[index]}
                  onChange={() => handleToggle(index)}
                  class="form-checkbox p-2 border  border-gray-300 rounded text-white "
                />
                <span class="pl-3">
                <strong> Handlungsempfehlung für {titles[index]}</strong>
                </span>
              </label>
              {toggles[index] && (
                <div class="p-2 flex flex-center h-full text-center">
                  {RecommendationsArray[index].recommendation}
                </div>
              )}
            </div>
          ) : null
        );
      })}
    </div>
  );
};

export default CompareArrays;