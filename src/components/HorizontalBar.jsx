import React, {useState, useRef, useEffect} from 'react';

const HorizontalBar = (props) => {

  const value = props.values;
  const parentContainerRef = useRef(null);

  useEffect(() => {
    if (parentContainerRef.current) {
      const marker = document.querySelector(".z-40.absolute.mt-8");
      
    }
  }, [value])

  function checkRange(value) {
    if (value >= 0 && value < 15) {
        return ["Auf Grundlage unserer Datenbasis ist Ihr Resilienzniveau", "reaktiv", ". Ihr Unternehmen handelt aufgrund von Intuition und Erfahrung, ohne die Ursachen von Ereignissen zu analysieren. Es reagiert erst, wenn es von einer Krise oder einem Schock betroffen ist, und versucht dann, den Schaden möglichst gering zu halten.", "text-red-500"];
    } else if (value >= 15 && value < 35) {
        return ["Auf Grundlage unserer Datenbasis ist Ihr Resilienzniveau", "proaktiv", ". Ihr Unternehmen hat sich auf mögliche Risiken und Krisen vorbereitet und hat Pläne und Maßnahmen im Vorfeld festgelegt um aktiv auf Veränderungen zu reagieren und sich an solche anzupassen.", "text-orange-500"];
    } else if (value >= 35 && value < 70) {
        return ["Auf Grundlage unserer Datenbasis ist Ihr Resilienzniveau", "vorbeugend", ". Ihr Unternehmen hat Maßnahmen etabliert, um mögliche Risiken und Herausforderungen im Voraus zu identifizieren und zu minimieren.", "text-yellow-500"];
      } else if (value > 70 && value < 85) {
        return ["Auf Grundlage unserer Datenbasis ist Ihr Resilienzniveau", "widerstandsfähig", ". Ihr Unternehmen ist in der Lage, sich schnell von Rückschlägen zu erholen und hat mehrere Optionen, um auf unerwartete Ereignisse zu reagieren. Dadurch hat es die Möglichkeit langfristig erfolgreich zu bleiben.", "text-green-500"];
      } else if (value > 87 && value < 100) {
        return ["Auf Grundlage unserer Datenbasis ist Ihr Resilienzniveau", "innovativ", ". Ihr Unternehmen hat eine starke und flexible Unternehmensstruktur und eine Kultur der kontinuierlichen Verbesserung etabliert, die es ermöglicht, schnell auf Veränderungen zu reagieren und die notwendigen Anpassungen vorzunehmen. Es nutzt unerwartete Ereignisse als Möglichkeit, sich weiterzuentwickeln und neue Geschäftsmöglichkeiten zu erschließen.", "text-blue-500"];
    
}}
return (
  <>
<div class="text-m font-medium text-gray-700 mb-2 ">
      {checkRange(value)[0] } <strong className={checkRange(value)[3]}>
  {checkRange(value)[1]}
</strong>{checkRange(value)[2]} </div>
<div ref={parentContainerRef} class="flex justify-center items-center h-10 w-3/4">
        <div class="bg-red-500 h-full mb-2 w-1/5 rounded-l-lg text-center my-text flex items-center justify-center">Reaktiv</div>
      <div class="bg-orange-500 h-full mb-2 w-1/5 text-center my-text flex items-center justify-center">Proaktiv</div>
      <div class="bg-yellow-500 h-full mb-2 w-1/5 text-center my-text flex items-center justify-center">Vorbeugend</div>
      <div class="bg-green-500 h-full mb-2 w-1/5 text-center my-text flex items-center justify-center">Widerstandsfähig</div>
      <div class="bg-blue-500 h-full mb-2 w-1/5 rounded-r-lg text-center my-text flex items-center justify-center">Innovativ</div>
          
            </div>
      <div class="flex justify-center items-center h-10 w-3/4">
        {value >= 0 && value < 15 ? (<div class="h-full mb-2 w-1/5 rounded-l-lg text-center text-xl flex items-center justify-center">🛆</div>) : <div class="h-full mb-2 w-1/5 rounded-l-lg text-center my-text flex items-center justify-center"></div>}
        {value > 15 && value < 35 ? (<div class="h-full mb-2 w-1/5 rounded-l-lg text-center text-xl flex items-center justify-center">🛆</div>) : <div class="h-full mb-2 w-1/5 rounded-l-lg text-center my-text flex items-center justify-center"></div>}
        {value > 35 && value < 70 ? (<div class="h-full mb-2 w-1/5 rounded-l-lg text-center text-xl flex items-center justify-center">🛆</div>) : <div class="h-full mb-2 w-1/5 rounded-l-lg text-center my-text flex items-center justify-center"></div>}
        {value > 70 && value < 85 ? (<div class="h-full mb-2 w-1/5 rounded-l-lg text-center text-xl flex items-center justify-center">🛆</div>) : <div class="h-full mb-2 w-1/5 rounded-l-lg text-center my-text flex items-center justify-center"></div>}
        {value > 85 && value < 100 ? (<div class="h-full mb-2 w-1/5 rounded-l-lg text-center text-xl flex items-center justify-center">🛆</div>) : <div class="h-full mb-2 w-1/5 rounded-l-lg text-center my-text flex items-center justify-center"></div>}
      </div>
   </>
          );
          }
          export default HorizontalBar;
