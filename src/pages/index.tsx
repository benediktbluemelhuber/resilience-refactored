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
      <div className="text-center max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Herzlich Willkommen zum TCW Resilienz Check</h1>

      <p className="text-xl mb-4">
      Resilienz bezeichnet die Fähigkeit, in Krisensituationen widerstandsfähig und flexibel zu bleiben. In einer Welt, die zunehmend von Unsicherheit und Veränderung geprägt ist, wird Resilienz zu einer immer wichtigeren Kompetenz für Individuen und Organisationen.
      </p>
      <p className="text-xl mb-4">
      Vielen Dank, dass Sie sich die Zeit nehmen, um Ihre persönliche Resilienz einzuschätzen. Die vorliegende Resilienz-Analyse ermöglicht es Ihnen, Ihre aktuelle Widerstandsfähigkeit zu erfassen und gezielt zu stärken. Durch das Assessment von Werttreibern, wie beispielsweise Produktportfolio, Kundenoriertierung oder Lieferanten, können Sie gezielt an Ihrer Resilienz arbeiten und Ihre Fähigkeit zur Bewältigung von Krisen und Veränderungen verbessern.
      </p>
      <button className="block mx-auto mt-4 mb-10 px-4 py-2 bg-blue-500 text-large text-2xl text-white rounded-lg hover:bg-blue-700" onClick={handleButtonClick}>
        Start
      </button>
      
      <h2 className="text-2xl font-bold mb-6">Kontakt:</h2>
      <p className="text-lg mb-6">
      TCW Transfer-Centrum für Produktions-Logistik und Technologie-Management GmbH & Co. KG
        <br />
        Leopoldstraße 145
        <br />
        80804 München
        <br />
        <a href="https://www.tcw.de/unternehmensberatung/sonstiges/impressum-150#3" target="_blank" rel="noreferrer">TCW.de</a>
        <br />
        </p>


      
    </div>
      
    <p className="text-xs text-gray-500 mt-10 mb-4  w-full text-center">
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