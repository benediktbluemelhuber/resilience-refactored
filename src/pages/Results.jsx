import React, { useState, useEffect, component } from 'react'
import { useRouter } from 'next/router'
import HorizontalBar from '../components/HorizontalBar';
import Chart from './Chart'
import ChartOverall from './ChartOverall'

import CustomerOrientationArray from '../assets/customer_orientation.json'
import FinancialSustainabilityArray from '../assets/financial_sustainability.json'
import SuppliersArray from '../assets/suppliers.json'
import ProductportfolioArray from '../assets/product_portfolio.json'
import GoToMarketChannelsArray from '../assets/go_to_market.json'
import LogisticSystemsArray from '../assets/logistic_systems.json'

const titles_overall = ["Produktportfolio", "Kundenorientierung", "Finanzielle Nachhaltigkeit", "Go-to-Market-Kanäle", "Lieferanten", "Logistiksysteme"]

const Results = () => {
  const [average, setAverage] = useState(0);
  const [values_state, setValues] = useState({});
  const [averagePerClass, setAveragePerClass] = useState([0,0,0,0,0,0]);
  const [handlungsempfehlung, setHandlungsEmpfehlung] = useState();
  const [industry, setIndustry] = useState('');
	const [companySize, setCompanySize] = useState('');
  console.log("companySize", companySize)
  useEffect(() => {
		const storedValueIndustry = localStorage.getItem('industry');
		const storedValuesCompany = localStorage.getItem('companySize');
    console.log(storedValueIndustry)
		if (storedValueIndustry) {
			setIndustry(storedValueIndustry);
		}
		if (storedValuesCompany) {
			setCompanySize(storedValuesCompany);
		}
	}, []);
  const createNote = async () => {
    console.log("JOS:",JSON.stringify({
      industry,
      companySize,
      valuesProduct, 
      valuesCustomer,
      valuesFinancials,
      valuesGoToMarket,
      valuesSuppliers,
      valuesLogisticsSystems,
      averagePerClass,
      average
      
    }))
    try {
      const res = await fetch('https://tcw-resilienz.herokuapp.com/api/resilience', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          industry,
      companySize,
      valuesProduct, 
      valuesCustomer,
      valuesFinancials,
      valuesGoToMarket,
      valuesSuppliers,
      valuesLogisticsSystems,
      averagePerClass,
      average
          
        })
      });
    } catch (error) {
      console.log(error);
    }
  };

  function getHandlungsempfehlung(reifegrad) {
    var handlungsempfehlung = "";
    if (reifegrad >= 0 && reifegrad < 20) {
        handlungsempfehlung = "<p>Um vom ersten in den zweiten Reifegrad (von reaktiv zu proaktiv) zu gelangen, könnten folgende Handlungsempfehlungen helfen:</p><ol><li> Entwickeln Sie eine Krisenmanagementstrategie: Eine solche Strategie sollte klare Verfahren und Prozesse für das Management von Notfällen und unerwarteten Ereignissen definieren. Sie kann dazu beitragen, dass das Unternehmen auf Ereignisse besser vorbereitet ist und schneller reagieren kann.</li><li> Führen Sie regelmäßige Übungen und Simulationen durch: Durch regelmäßige Übungen und Simulationen können Mitarbeiterinnen und Mitarbeiter lernen, wie sie auf unerwartete Ereignisse reagieren sollen. Dies kann dazu beitragen, dass sie im Falle eines Notfalls besser vorbereitet sind.</li><li> Identifizieren Sie mögliche Risiken und Herausforderungen: Es ist wichtig, mögliche Risiken und Herausforderungen im Voraus zu identifizieren und dafür vorzusorgen. Dies kann dazu beitragen, dass das Unternehmen auf unerwartete Ereignisse besser vorbereitet ist.</li><li> Schaffen Sie Transparenz und Kommunikation: Eine offene und transparente Kommunikation ist wichtig, um alle Beteiligten über mögliche Risiken und Herausforderungen zu informieren und sicherzustellen, dass alle auf demselben Stand sind.</li><li> Stärken Sie die Zusammenarbeit: Eine gute Zusammenarbeit innerhalb des Unternehmens kann dazu beitragen, dass sich alle Beteiligten auf die gleichen Ziele und Prioritäten einigen und gemeinsam an Lösungen arbeiten. Dies kann dazu beitragen, dass das Unternehmen besser auf Veränderungen und Herausforderungen reagieren kann.</li></ol>";
    } else if (reifegrad >= 20 && reifegrad < 40) {
        handlungsempfehlung = "<p>Um vom zweiten in den dritten Reifegrad (von proaktiv zu vorbeugend) zu gelangen, könnten folgende Handlungsempfehlungen helfen:</p><ol><li> Führen Sie regelmäßig Risikoanalysen durch: Regelmäßige Risikoanalysen können dazu beitragen, dass das Unternehmen mögliche Risiken und Herausforderungen im Voraus identifizieren und dafür vorsorgen kann.</li><li> Implementieren Sie Maßnahmen zur Risikominimierung: Sobald mögliche Risiken identifiziert wurden, sollten Maßnahmen ergriffen werden, um diese zu minimieren. Dies kann dazu beitragen, dass das Unternehmen besser auf unerwartete Ereignisse vorbereitet ist.</li><li> Entwickeln Sie Notfallpläne: Notfallpläne sollten spezifische Verfahren und Prozesse definieren, die im Falle eines Notfalls befolgt werden sollten. Sie können dazu beitragen, dass das Unternehmen auf Ereignisse besser vorbereitet ist und schneller reagieren kann.</li><li> Stärken Sie die Finanzlage des Unternehmens: Eine robuste Finanzlage gibt dem Unternehmen die nötige Flexibilität, um Risiken einzugehen und sich an Veränderungen anzupassen.</li><li> Fördern Sie die Innovationskultur: Eine Kultur der kontinuierlichen Verbesserung und Innovation kann dazu beitragen, dass ds Unternehmen neue Geschäftsmöglichkeiten erschließen und sich an Veränderungen anpassen kann.</li></ol>"
        ;
    } else if (reifegrad >= 40 && reifegrad < 60) {
      handlungsempfehlung = "<p>Um vom dritten (Vorbeugend) in den vierten (Widerstandsfähig) Reifegrad zu gelangen, empfiehlt es sich, folgende Handlungsempfehlungen zu berücksichtigen:</p><ol><li> Entwickeln von Resilienzstrategien: Um sich langfristig gegen Risiken und Krisen zu wappnen, sollte das Unternehmen Resilienzstrategien entwickeln, die auf die spezifischen Bedürfnisse und Anforderungen des Unternehmens abgestimmt sind. Dazu kann man beispielsweise ein Resilienz-Modell entwickeln, das festlegt, wie das Unternehmen auf Risiken und Krisen reagieren wird.</li><li> Fördern Sie die Entwicklung von Führungskompetenzen: Führungskräfte, die über die notwendigen Fähigkeiten und Kompetenzen verfügen, können dazu beitragen, dass das Unternehmen besser auf Veränderungen und Herausforderungen reagieren kann.</li><li> Einbeziehung aller Mitarbeiter: Um das Unternehmen resilient zu machen, ist es wichtig, dass alle Mitarbeiter beteiligt sind und ihre Ideen und Vorschläge einbringen können. Dazu kann man beispielsweise regelmäßige Mitarbeiterbefragungen durchführen oder Ideen-Workshops einführen.</li><li> Integration von Resilienz in das Unternehmensmanagement: Um sicherzustellen, dass das Unternehmen langfristig resilient bleibt, sollte Resilienz in das Unternehmensmanagement integriert werden. Dazu kann man beispielsweise Resilienz-Ziele festlegen und in die Unternehmensstrategie integrieren.</li><li> Schaffen Sie eine Kultur der kontinuierlichen Verbesserung: Eine Kultur der kontinuierlichen Verbesserung kann dazu beitragen, dass das Unternehmen sich an Veränderungen anpassen und sich schnell von Rückschlägen erholen kann. Dies kann durch regelmäßige Überprüfungen und Anpassungen von Prozessen und Verfahren erreicht werden.</li></ol>"
        
    } else if (reifegrad >= 60 && reifegrad < 80) {
      handlungsempfehlung = "<p>Um vom vierten (widerstandsfähig) in den fünften (innovativ) Reifegrad zu gelangen, empfiehlt es sich, folgende Handlungsempfehlungen zu berücksichtigen:</p><ol><li> Entwickeln von Innovationsfähigkeit: Um sich langfristig an Veränderungen anpassen zu können, ist es wichtig, dass das Unternehmen über eine hohe Innovationsfähigkeit verfügt. Dazu kann man beispielsweise regelmäßig Ideen-Workshops oder Innovationsprojekte durchführen, um neue Ideen zu entwickeln und umzusetzen.</li><li> Förderung von Agilität: Um schnell auf Veränderungen reagieren zu können, ist es wichtig, dass das Unternehmen über eine hohe Agilität verfügt. Dazu kann man beispielsweise agiles Projektmanagement einführen oder die Mitarbeiter in agilen Methoden schulen.</li><li> Stärkung der Partnerschaften: Um sich langfristig an Veränderungen anpassen zu können, ist es wichtig, dass das Unternehmen starke Partnerschaften mit anderen Unternehmen und Partnern aufbaut und pflegt. Dazu kann man beispielsweise regelmäßige Treffen mit den Partnern abhalten, um die Zusammenarbeit zu optimieren und gemeinsame Lösungen zu entwickeln.</li><li> Förderung von Lernfähigkeit und Weiterbildung: Um sich langfristig an Veränderungen anpassen zu können, ist es wichtig, dass das Unternehmen über eine hohe Lernfähigkeit verfügt und die Mitarbeiter regelmäßig weiterbildet. Dazu kann man beispielsweise regelmäßige Schulungen und Weiterbildungen anbieten oder Lernprogramme einführen.</li><li> Entwickeln von Flexibilität: Um sich langfristig an Veränderungen anpassen zu können, ist es wichtig, dass das Unternehmen über eine hohe Flexibilität verfügt. Dazu kann man beispielsweise Prozesse und Strukturen schaffen, die es ermöglichen, schnell auf Veränderungen zu reagieren und die notwendigen Anpassungen vorzunehmen. Es empfiehlt sich auch, regelmäßig die Unternehmensstrategie und die Geschäftsmodelle zu überprüfen und anzupassen, um sich an neue Entwicklungen anzupassen.</li></ol>"
        
    } else if (reifegrad >= 80 && reifegrad <= 100) {
      handlungsempfehlung = "<p>Wenn das Unternehmen bereits im fünften (innovativen) Reifegrad angekommen ist, empfiehlt es sich, folgende Handlungsempfehlungen zu berücksichtigen, um den resilienten Zustand zu erhalten und weiter zu verbessern:</p><ol><li> Fortlaufende Überwachung: Um sicherzustellen, dass das Unternehmen weiterhin resilient bleibt, ist es wichtig, dass es regelmäßig die Risiken und Krisen überwacht und die notwendigen Anpassungen vornimmt.</li><li> Förderung von Innovation und Lernfähigkeit: Um sich langfristig an Veränderungen anpassen zu können, ist es wichtig, dass das Unternehmen über eine hohe Innovationsfähigkeit und Lernfähigkeit verfügt. Dazu kann man beispielsweise regelmäßig Ideen-Workshops oder Innovationsprojekte durchführen und die Mitarbeiter regelmäßig weiterbilden.</li><li> Pflege von Partnerschaften: Um sich langfristig an Veränderungen anpassen zu können, ist es wichtig, dass das Unternehmen starke Partnerschaften mit anderen Unternehmen und Partnern aufbaut und pflegt. Dazu kann man beispielsweise regelmäßige Treffen mit den Partnern abhalten, um die Zusammenarbeit zu optimieren und gemeinsame Lösungen zu entwickeln.</li><li> Flexibles Krisenmanagement: Um schnell auf Veränderungen reagieren zu können, ist es wichtig, dass das Unternehmen ein flexibles Krisenmanagement hat, das es ermöglicht, schnell auf neue Entwicklungen zu reagieren und die notwendigen Maßnahmen zu ergreifen.</li><li> Förderung von Agilität: Um schnell auf Veränderungen reagieren zu können, ist es wichtig, dass das Unternehmen über eine hohe Agilität verfügt. Dazu kann man beispielsweise agiles Projektmanagement einführen oder die Mitarbeiter in agilen Methoden schulen.</li></ol>"

    } else {
        handlungsempfehlung = "Invalid Reifegrad";
    }
    return handlungsempfehlung;
}


  const replaceMinusOne = (arr) => {
    return arr.map(val => val === -1 ? 0 : val);
     
   }
   
   const replaceMinusOneInArray = values => {
     if (Array.isArray(values)) {
       const valuesChart = replaceMinusOne(values);
       //console.log(valuesChart)
       return valuesChart;
     } else {
       console.log("The passed value is not an array");
       return null;
     }
   };
   
   
   const getTitles = (titlesJson) => {
    const titles = titlesJson.map(element => element.title);
    return titles;
  }
  useEffect(() => {
    const keys = Object.keys(localStorage);
    const filteredKeys = keys.filter(key => key.startsWith("values"));
    //console.log(filteredKeys)
    const values_state = filteredKeys.reduce((acc, key) => {
        acc[key] = JSON.parse(localStorage.getItem(key));
        return acc;
    }, {});
    setValues(values_state);
  }, []);

  useEffect(() => {
    const { valuesProduct, valuesCustomer,valuesFinancials, valuesGoToMarket, valuesSuppliers,  valuesLogisticsSystems } = values_state;

    const allArrays = [valuesProduct, valuesCustomer, valuesFinancials, valuesGoToMarket, valuesSuppliers,  valuesLogisticsSystems ];

    if (allArrays.every(arr => Array.isArray(arr) && arr.length > 0)) {
      const flattenArrays = allArrays.flat();
      const sum = flattenArrays.reduce((acc, curr) => acc + curr, 0);
      const avg = (sum / flattenArrays.length).toFixed(2) *10;
      setAverage(avg);
    }
    if (allArrays.every(arr => Array.isArray(arr) && arr.length > 0)) {

      const averagesPerClass = allArrays.map(array => {
        const sum = array.reduce((acc, val) => acc + val, 0);
        return sum / array.length;
        })
        setAveragePerClass(averagesPerClass || 0)
      }     
    
    }, [values_state]);//console.log(items)


      useEffect(() => {
        console.log("test",average)
      setHandlungsEmpfehlung(getHandlungsempfehlung(average))
      createNote()  
    }, [average])


var valuesCustomer = values_state["valuesCustomer"]
var valuesLogisticsSystems = values_state["valuesLogisticsSystems"];
var valuesProduct = values_state["valuesProduct"]
var valuesFinancials = values_state["valuesFinancials"]
var valuesSuppliers = values_state["valuesSuppliers"]
var valuesGoToMarket = values_state["valuesGoToMarket"]

var valuesCustomerChart = replaceMinusOneInArray(valuesCustomer)
var valuesLogisticsSystemsChart = replaceMinusOneInArray(valuesLogisticsSystems)
var valuesProductChart = replaceMinusOneInArray(valuesProduct)
var valuesFinancialsChart = replaceMinusOneInArray(valuesFinancials)
var valuesSuppliersChart = replaceMinusOneInArray(valuesSuppliers)
var valuesGoToMarketChart = replaceMinusOneInArray(valuesGoToMarket)
///calculate average


if(typeof valuesCustomerChart === 'undefined'){
  console.log('valuesCustomerChart is undefined');
} else {
  const allValues = [valuesCustomerChart, valuesLogisticsSystemsChart, valuesProductChart, valuesFinancialsChart, valuesSuppliersChart, valuesGoToMarketChart];
  const average = allValues.reduce((acc, val) => acc + val, 0) *10/ allValues.length;
  // your code here  
}




/// get titles
const titlesCustomerOrientation = getTitles(CustomerOrientationArray)
const titlesLogisticsSystems = getTitles(LogisticSystemsArray)
const titlesSuppliers = getTitles(SuppliersArray)
const titlesProductPortfolio = getTitles(ProductportfolioArray)
const titlesFinancial = getTitles(FinancialSustainabilityArray)
const titlesGoToMarket = getTitles(GoToMarketChannelsArray)




  const router = useRouter()

  return (<>
  <section class="mb-16">
  <div class={'text-gray-700 text-6xl font-bold'}>Ergebnis</div>
</section>
<div class = "flex">
<div class="block bg-white text-gray-700 rounded-lg p-2 border-2 border-blue-500 mb-4">
      <div class="text-xs text-blue-700">Resilienzniveau</div>
      <div class="text-6xl text-center font-medium text-blue-700">{average.toFixed(2)}%</div>
    </div>
    
  </div>
  <div class="text-2xl font-medium text-gray-700 mb-2">Reifegrad des Unternehmens</div>
  <div class = "mb-4">
  <HorizontalBar values = {average} />
  </div>

  <div class="text-2xl font-medium text-gray-700 mb-2">Auswertung und Branchenbenchmark der Wertreiberanalyse</div>
  <div class="flex flex-wrap flex-direction-column">
  <div class="border-2 border-gray-400 rounded-xl m-2 ">
  <div class="text-left text-gray text-xl ml-4 mt-4"><strong>Produktportfolio</strong></div>  
  <Chart titles={titlesProductPortfolio} values={valuesProductChart}/>  
</div>
<div class="border-2 border-gray-400 rounded-xl m-2 ">
  <div class="text-left text-gray text-xl ml-4 mt-4"><strong>Kundenorientierung</strong></div>
  <Chart titles={titlesCustomerOrientation} values={valuesCustomerChart}/>   
</div>
<div class="border-2 border-gray-400 rounded-xl m-2 ">
  <div class="text-left text-gray text-xl ml-4 mt-4"><strong>Finanzielle Nachhaltigkeit</strong></div>
  <Chart titles={titlesFinancial} values={valuesFinancialsChart}/>
</div>
<div class="border-2 border-gray-400 rounded-xl m-2 ">
  <div class="text-left text-gray text-xl ml-4 mt-4"><strong>Go-to-Market-Kanäle</strong></div>
  <Chart titles={titlesGoToMarket} values={valuesGoToMarketChart}/>  
</div>
<div class="border-2 border-gray-400 rounded-xl m-2 ">
  <div class="text-left text-gray text-xl ml-4 mt-4"><strong>Lieferanten</strong></div>
  <Chart titles={titlesSuppliers} values={valuesSuppliersChart}/>  
</div>
<div class="border-2 border-gray-400 rounded-xl m-2 ">
  <div class="text-left text-gray text-xl ml-4 mt-4"><strong>Logistiksysteme</strong></div>
  <Chart titles={titlesLogisticsSystems} values={valuesLogisticsSystemsChart}/> 
</div>
</div>

<div class="text-2xl font-medium text-gray-700 mb-2 mt-2">Gesamtergebnis</div>
<div class="flex flex-wrap flex-direction-column">
<div class="border-2 border-gray-400 rounded-xl m-2 ">
  <div class="text-left text-gray text-xl ml-4 mb-3 mt-4"><strong>Ergebnis und Benchmark der Wertreiberanalyse</strong></div>
  <ChartOverall titles={titles_overall} values={averagePerClass}/> 
</div>
</div>

<div class="border-2 border-gray-400 rounded-xl m-2 ">
<div class="text-2xl font-medium text-gray-700 mb-2 mt-2 ml-2">Handlungsempfehlung</div>
        <div class="h-full mb-2  rounded-l-lg text-left text-xl flex items-center justify-center ml-2">
        <div dangerouslySetInnerHTML={{__html: handlungsempfehlung}} /></div>
        </div> 


        <div class="rounded-xl mt-20 "/>    
    </>
  
  )
}

export default Results;
