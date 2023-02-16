import React, { useState, useEffect, component } from 'react';
import { useRouter } from 'next/router';
import HorizontalBar from '../components/HorizontalBar';
import Chart from './Chart';
import ChartOverall from './ChartOverall';
import Table from '../components/Table';
import Handlungsempfehlung from '../components/Handlungsempfehlung';
import CustomerOrientationArray from '../assets/customer_orientation.json';
import FinancialSustainabilityArray from '../assets/financial_sustainability.json';
import SuppliersArray from '../assets/suppliers.json';
import ProductportfolioArray from '../assets/product_portfolio.json';
import GoToMarketChannelsArray from '../assets/go_to_market.json';
import LogisticSystemsArray from '../assets/logistic_systems.json';
import ContactButton from '../components/ContactButton';

const titles_overall = [
	'Produktportfolio',
	'Kundenorientierung',
	'Finanzielle Nachhaltigkeit',
	'Go-to-Market-Kanäle',
	'Lieferanten',
	'Logistiksysteme',
	'Strategische Planung',
	'ESG: Environmental, Social, Governance',
	'Mitarbeiter'

];

const Results = () => {
	const [average, setAverage] = useState(0);
	const [values_state, setValues] = useState({});
	const [averagePerClass, setAveragePerClass] = useState([0, 0, 0, 0, 0, 0]);
	const [handlungsempfehlung, setHandlungsEmpfehlung] = useState(0);
	const [industry, setIndustry] = useState('');
	const [companySize, setCompanySize] = useState('');
	console.log('companySize', companySize);
	useEffect(() => {
		const storedValueIndustry = localStorage.getItem('industry');
		const storedValuesCompany = localStorage.getItem('companySize');
		console.log(storedValueIndustry);
		if (storedValueIndustry) {
			setIndustry(storedValueIndustry);
		}
		if (storedValuesCompany) {
			setCompanySize(storedValuesCompany);
		}
	}, []);
	const createNote = async () => {
		try {
			const res = await fetch('http://localhost:3000/api/resilience', {
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
		var handlungsempfehlung = 0;
		if (reifegrad >= 0 && reifegrad < 15) {
			handlungsempfehlung = 0 } 
		else if (reifegrad >= 15 && reifegrad < 35) {
			handlungsempfehlung = 1
		} else if (reifegrad >= 35 && reifegrad < 70) {
			handlungsempfehlung = 2 
		} else if (reifegrad >= 70 && reifegrad < 85) {
			handlungsempfehlung = 3 
		} else if (reifegrad >= 85 && reifegrad <= 100) {
			handlungsempfehlung =4 } 
		else {
			handlungsempfehlung = 0;
		}
		return handlungsempfehlung;
	}
	const replaceMinusOne = (arr) => {
		return arr.map((val) => (val === -1 ? 0 : val));
	};

	const replaceMinusOneInArray = (values) => {
		if (Array.isArray(values)) {
			const valuesChart = replaceMinusOne(values);
			//console.log(valuesChart)
			return valuesChart;
		} else {
			console.log('The passed value is not an array');
			return null;
		}
	};

	const getTitles = (titlesJson) => {
		const titles = titlesJson.map((element) => element.title);
		return titles;
	};
	useEffect(() => {
		const keys = Object.keys(localStorage);
		const filteredKeys = keys.filter((key) => key.startsWith('values'));
		//console.log(filteredKeys)
		const values_state = filteredKeys.reduce((acc, key) => {
			acc[key] = JSON.parse(localStorage.getItem(key));
			return acc;
		}, {});
		setValues(values_state);
	}, []);

	useEffect(() => {
		const {
			valuesProduct,
			valuesCustomer,
			valuesFinancials,
			valuesGoToMarket,
			valuesSuppliers,
			valuesLogisticsSystems,
			valuesStrategicPlanning,
			valuesESG,
			valuesEmployees
		} = values_state;

		const allArrays = [
			valuesProduct,
			valuesCustomer,
			valuesFinancials,
			valuesGoToMarket,
			valuesSuppliers,
			valuesLogisticsSystems,
			valuesStrategicPlanning,
			valuesESG,
			valuesEmployees
		];

		if (allArrays.every((arr) => Array.isArray(arr) && arr.length > 0)) {
			const flattenArrays = allArrays.flat();
			const sum = flattenArrays.reduce((acc, curr) => acc + curr, 0);
			const avg = (sum / flattenArrays.length).toFixed(2) * 10;
			setAverage(avg);
		}
		if (allArrays.every((arr) => Array.isArray(arr) && arr.length > 0)) {
			const averagesPerClass = allArrays.map((array) => {
				const sum = array.reduce((acc, val) => acc + val, 0);
				return sum / array.length;
			});
			setAveragePerClass(averagesPerClass || 0);
		}
	}, [values_state]); //console.log(items)

	useEffect(() => {
		console.log('test', average);
		//setHandlungsEmpfehlung(getHandlungsempfehlung(average));
		console.log(setHandlungsEmpfehlung(getHandlungsempfehlung(average)));
		createNote();
	}, [average]);

	var valuesCustomer = values_state['valuesCustomer'];
	var valuesLogisticsSystems = values_state['valuesLogisticsSystems'];
	var valuesProduct = values_state['valuesProduct'];
	var valuesFinancials = values_state['valuesFinancials'];
	var valuesSuppliers = values_state['valuesSuppliers'];
	var valuesGoToMarket = values_state['valuesGoToMarket'];
	var valuesStrategicPlanning = values_state['valuesStrategicPlanning'];
	var valuesESG = values_state['valuesESG'];
	var valuesEmployees = values_state['valuesEmployees'];

	var valuesCustomerChart = replaceMinusOneInArray(valuesCustomer);
	var valuesLogisticsSystemsChart = replaceMinusOneInArray(valuesLogisticsSystems);
	var valuesProductChart = replaceMinusOneInArray(valuesProduct);
	var valuesFinancialsChart = replaceMinusOneInArray(valuesFinancials);
	var valuesSuppliersChart = replaceMinusOneInArray(valuesSuppliers);
	var valuesGoToMarketChart = replaceMinusOneInArray(valuesGoToMarket);
	var valuesESGChart = replaceMinusOneInArray(valuesESG);
	var valuesStrategicPlanningChart = replaceMinusOneInArray(valuesStrategicPlanning);
	var valuesEmployeesChart = replaceMinusOneInArray(valuesEmployees);
	///calculate average

	if (typeof valuesCustomerChart === 'undefined') {
		console.log('valuesCustomerChart is undefined');
	} else {
		const allValues = [
			valuesCustomerChart,
			valuesLogisticsSystemsChart,
			valuesProductChart,
			valuesFinancialsChart,
			valuesSuppliersChart,
			valuesGoToMarketChart,
			valuesStrategicPlanningChart,
			valuesESGChart,
			valuesEmployeesChart

		];
		const average = (allValues.reduce((acc, val) => acc + val, 0) * 10) / allValues.length;
		// your code here
	}

	/// get titles
	

	const benchmarkProductportfolio = [0.76, 0.76, 0.56, 0.66, 0.66, 0.86];
	const benchmarkCustomerOrientation = [0.46, 0.56, 0.66, 0.56, 0.56, 0.66];
	const benchmarkFinancialSustainability = [0.46, 0.76, 0.66, 0.36, 0.56, 0.66];
	const benchmarkGoToMarketChannels = [0.46, 0.66, 0.46, 0.56, 0.46, 0.66];
	const benchmarkSuppliers = [0.66, 0.56, 0.76, 0.36, 0.46, 0.46];
	const benchmarkLogisticSystems = [0.36, 0.46, 0.36, 0.56, 0.46, 0.46];
	const benchmarkStrategicPlanning = [0.46, 0.66, 0.76, 0.36, 0.66, 0.76];
	const benchmarkESG = [0.66, 0.56, 0.46, 0.66, 0.66, 0.56];
	const benchmarkEmployees = [0.66, 0.66, 0.76, 0.46, 0.46, 0.76];
	
	


	const arrays = [
		benchmarkProductportfolio,
		benchmarkCustomerOrientation,
		benchmarkFinancialSustainability,
		benchmarkGoToMarketChannels,
		benchmarkSuppliers,
		benchmarkLogisticSystems, 
		benchmarkStrategicPlanning,
		benchmarkESG,
		benchmarkEmployees
	];

	const calculateAverage = (arr) => arr.reduce((sum, value) => sum + value, 0) / arr.length;

	const averageBenchmark = arrays.map(calculateAverage);
	const averageBenchmarkConsolidated =
		averageBenchmark.reduce((a, b) => a + b, 0) / averageBenchmark.length;
	const router = useRouter();
	

	return (
		<>
			<section class="mb-8">
				<div class={'text-gray-700 text-6xl font-bold'}>Ergebnis</div>
			</section>
			<div class="text-2xl font-medium text-gray-700 mb-2">Resilienz Check | TCW</div>
			<div class="text-m font-medium text-gray-700 mb-2 mr-4 ">
  Vielen Dank für Ihre Bewertung. Nachfolgend finden Sie eine erste Auswertung Ihrer
  Ergebnisse sowie eine Reifegradraneinschätzung, anhand derer Sie Ihre Ergebnisse
  indikativ einordnen können. Auf der Grundlage Ihrer Antworten können wir für Ihre
  Organisation einen Gesamtreifegrad von <strong>{average.toFixed(2)}</strong> ermitteln.
  <strong>{average < averageBenchmarkConsolidated *100 ? " Sie liegen damit unter dem Benchmark." : " Sie liegen damit über dem Benchmark."}</strong>
</div>
			<div class="flex">
				<div class="block bg-white text-gray-700 rounded-lg p-2 border-2 border-blue-500 mb-4">
					<div class="text-xs text-blue-700">Resilienzniveau</div>
					<div class="text-6xl text-center font-medium text-blue-700">
						{average.toFixed(2)}%
					</div>
				</div>
			</div>
			<div class="text-2xl font-medium text-gray-700 mb-2">Reifegrad des Unternehmens</div>

			<div class="mb-4">
				<HorizontalBar values={average} />
			</div>
			<div class="text-2xl font-medium text-gray-700 mb-2">Detaillierte Auswertung</div>
			<div class="text-m font-medium text-gray-700 mb-2 mr-4">
				Bitte ergänzen Sie Ihre Kontaktdaten, um eine detaillierte Auswertung zu erhalten.
			</div>

			<div class="mb-4"></div>
			<div class="border-2 border-gray-400 rounded-xl m-2 ">
				<div class="flex flex-wrap flex-direction-column">
					<div class=" rounded-xl m-2 mr-10 ">
						<div class="text-left text-gray text-xl ml-4 mb-3 mt-4">
							<strong>Ergebnis und Benchmark der Wertreiberanalyse</strong>
						</div>
						<ChartOverall
							titles={titles_overall}
							values={averagePerClass}
							values_benchmark={averageBenchmark}
						/>
					</div>
					<div class=" rounded-xl m-2 ">
						<div class="text-left text-gray text-xl ml-4 mb-3 mt-4">
							<strong>Ihre detaillierten Ergebnisse im Überblick</strong>
						</div>
						<div class="m-2 ">
							<Table
								titles={titles_overall}
								scoresAssessment={averagePerClass}
								scoresBenchmark={averageBenchmark}
							/>
						</div>
						<div class="text-m font-medium text-gray-700 mb-2 ml-2 mt-2 ">
							Sofern Sie Fragen zu Ihrem Resilienzniveau haben oder vielleicht eine{' '}
							<br /> tiefere Einschätzung wünschen, können Sie gerne eine Mail an
							mail@tcw.de schreiben:
						</div>
						<div class=" rounded-xl m-2 ">
							<ContactButton />
						</div>
					</div>
				</div>
			</div>
			<div class="border-2 border-gray-400 rounded-xl m-2 ">
				<div class="text-2xl font-medium text-gray-700 mb-2 mt-2 ml-2">
					Handlungsempfehlung
				</div>
				<div class="h-full mb-2  rounded-l-lg text-left text-m flex items-center justify-center ml-2">
					<Handlungsempfehlung propValue={handlungsempfehlung}/>
				</div>
				
			</div>

			<div class="rounded-xl mt-20 " />
		</>
	);
};

export default Results;

/*
<div class="h-full mb-2  rounded-l-lg text-left text-m flex items-center justify-center ml-2">
					<div dangerouslySetInnerHTML={{ __html: handlungsempfehlung }} />
				</div>*/
