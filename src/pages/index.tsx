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
      <div className="text-center max-w-lg mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Herzlich Willkommen zum TCW Resilienz Check</h1>

      <p className="text-lg mb-4">
      Resilienz bezeichnet die Fähigkeit, in Krisensituationen widerstandsfähig und flexibel zu bleiben. In einer Welt, die zunehmend von Unsicherheit und Veränderung geprägt ist, wird Resilienz zu einer immer wichtigeren Kompetenz für Individuen und Organisationen.
      </p>
      <p className="text-lg mb-4">
      Vielen Dank, dass Sie sich die Zeit nehmen, um Ihre persönliche Resilienz einzuschätzen. Die vorliegende Resilienz-Analyse ermöglicht es Ihnen, Ihre aktuelle Widerstandsfähigkeit zu erfassen und gezielt zu stärken. Durch die Identifizierung von Resilienz-Faktoren, wie beispielsweise sozialer Unterstützung, Selbstwirksamkeit oder Flexibilität, können Sie gezielt an Ihrer Resilienz arbeiten und Ihre Fähigkeit zur Bewältigung von Krisen und Veränderungen verbessern.
      </p>
      <button className="block mx-auto mt-4 mb-10 p-2  bg-blue-500  text-white rounded-lg hover:bg-blue-700" onClick={handleButtonClick}>
        Start
      </button>
      <p className="text-lg mb-6">
        Mit freundlichen Grüßen,
        <br />
        Dr. Sebastian Eckert
        <br />
        Sachbearbeiter & Manager einer Reinigungsfirma
        <br />
        
      </p>
      <Image src='/SebastianEckert.jpg' alt="Sebastian Eckert" width={240} height={120} className="mx-auto" />


      
    </div>
      
    <p className="text-xs text-gray-500 mt-10 mb-4">
    Wir möchten Sie darüber informieren, dass wir bei der Nutzung unserer Analytics-Tools keine personenbezogenen Daten von Ihnen sammeln oder speichern, es sei denn, Sie geben diese Informationen freiwillig in der Befragung an. Die von uns durchgeführten Analysen werden anonymisiert und aggregiert, um sicherzustellen, dass keine Rückschlüsse auf Ihre Person gezogen werden können. Sie können sich auf unserer <a href="https://www.tcw.de/unternehmensberatung/sonstiges/impressum-150#3" target="_blank" rel="noreferrer">Website</a> unter dem angegebenen Link über unsere allgemeinen Datenschutzbestimmungen informieren.
  </p> 
    </div>
    
  );
};

export default HomePage;


/*<h1 className="text-center text-navy mb-3">Willkommen beim TCW Resilienz Check</h1>
      <p className="text-center mx-auto w-1/2">Bitte klicken Sie auf den Button unten, um den Fragebogen zu starten.</p>
      <p className="text-center mx-auto w-1/2">Unsere Datenschutzbestimmungen finden Sie <a href="https://www.tcw.de/unternehmensberatung/sonstiges/impressum-150#3" target="_blank" rel="noreferrer">hier</a>. Es werden keinerlei persönliche Daten zu Ihnen und Ihrem Unternehmen erhoben.</p>
      */