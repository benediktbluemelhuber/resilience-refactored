// Handlungsempfehlung component
import React from 'react';
import HandlungsempfehlungArray from '../assets/handlungsempfehlung_total.json';

const Handlungsempfehlung = ({ propValue }) => {
  const selectedData = HandlungsempfehlungArray[propValue];
  console.log(selectedData)
  return (
    <div className="my-4">
      
        <div key={selectedData[0].text}>
          <p className="font-bold">{selectedData[0].text}</p>
          <ol className="list-decimal ml-4">
            {selectedData.slice(1).map(({ id, text }) => (
              <li key={id} className="mt-2">{text}</li>
            ))}
          </ol>
        </div>
      
    </div>
  );
};

export default Handlungsempfehlung;

