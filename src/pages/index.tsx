import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'

const HomePage = () => {
	const router = useRouter()

	const handleButtonClick = () => {
		router.push({
		  pathname: '/CompanyInfos'
		})
	  }

  return (
    <div className="bg-lightblue font-sans h-screen">
      <div className="flex justify-center mt-5 mb-10">
				<Image src={'/TCW.png'} alt={'TCW'} width={300} height={300} />
			</div>
      <h1 className="text-center text-navy mb-3">Willkommen beim TCW Resilienz Check</h1>
      <p className="text-center mx-auto w-1/2">Bitte klicke auf den Button unten, um den Fragebogen zu starten.</p>
      <button className="block mx-auto mt-4 p-2  bg-blue-500  text-white rounded-lg hover:bg-blue-700" onClick={handleButtonClick}>
        Start
      </button>
    </div>
  );
};

export default HomePage;
