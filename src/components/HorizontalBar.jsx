import React, {useState, useRef, useEffect} from 'react';

const HorizontalBar = (props) => {

  const value = props.values;
  console.log(value)
  const parentContainerRef = useRef(null);

  useEffect(() => {
    if (parentContainerRef.current) {
      const marker = document.querySelector(".z-40.absolute.mt-8");
      
    }
  }, [value])
return (
  <>

<div ref={parentContainerRef} class="flex justify-center items-center h-10 w-3/4">
        <div class="bg-red-500 h-full mb-2 w-1/5 rounded-l-lg text-center my-text flex items-center justify-center">Reaktiv</div>
      <div class="bg-orange-500 h-full mb-2 w-1/5 text-center my-text flex items-center justify-center">Proaktiv</div>
      <div class="bg-yellow-500 h-full mb-2 w-1/5 text-center my-text flex items-center justify-center">Vorbeugend</div>
      <div class="bg-green-500 h-full mb-2 w-1/5 text-center my-text flex items-center justify-center">Widerstandsfähig</div>
      <div class="bg-blue-500 h-full mb-2 w-1/5 rounded-r-lg text-center my-text flex items-center justify-center">Innovativ</div>
          
            </div>
      <div class="flex justify-center items-center h-10 w-3/4">
        {value >= 0 && value <= 12 ? (<div class="h-full mb-2 w-1/5 rounded-l-lg text-center text-xl flex items-center justify-center">🛆</div>) : <div class="h-full mb-2 w-1/5 rounded-l-lg text-center my-text flex items-center justify-center"></div>}
        {value > 12 && value <= 29 ? (<div class="h-full mb-2 w-1/5 rounded-l-lg  text-xl flex items-center justify-center items-left " style={{left: `${value}px`}}>🛆</div>) : <div class="h-full mb-2 w-1/5 rounded-l-lg text-center my-text flex items-center justify-center"></div>}
        {value > 28 && value < 52 ? (<div class="h-full mb-2 w-1/5 rounded-l-lg text-center text-xl flex items-center justify-center">🛆</div>) : <div class="h-full mb-2 w-1/5 rounded-l-lg text-center my-text flex items-center justify-center"></div>}
        {value > 53 && value < 87 ? (<div class="h-full mb-2 w-1/5 rounded-l-lg text-center text-xl flex items-center justify-center">🛆</div>) : <div class="h-full mb-2 w-1/5 rounded-l-lg text-center my-text flex items-center justify-center"></div>}
        {value > 87 && value < 100 ? (<div class="h-full mb-2 w-1/5 rounded-l-lg text-center text-xl flex items-center justify-center">🛆</div>) : <div class="h-full mb-2 w-1/5 rounded-l-lg text-center my-text flex items-center justify-center"></div>}
      </div>
   </>
          );
          }
          export default HorizontalBar;
