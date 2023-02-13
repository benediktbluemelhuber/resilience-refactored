import React from "react";

const EmailButton = () => {
  const handleClick = () => {
    window.location.href = "mailto:ulrich.von.waldow@tcw.de";
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleClick}
    >
      Kontaktieren Sie uns.
    </button>
  );
};

export default EmailButton;