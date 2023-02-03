import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const industries = [
	{ label: 'Automobilindustrie', value: 'automotive' },
	{ label: 'Chemie', value: 'chemie' },
	{ label: 'Energie', value: 'energy' },
	{ label: 'Fertigungsindustrie', value: 'manufacturing' },
	{ label: 'Finanzsektor', value: 'finance' },
	{ label: 'Gesundheitssektor', value: 'health' },
	{ label: 'Handel', value: 'retail' },
	{ label: 'Lifescience', value: 'lifescience' },
	{ label: 'Technologiesektor', value: 'technology' },
	{ label: 'Telekommunikation & Medien', value: 'telecommunication' },
	{ label: 'Transport & Logistik', value: 'transportation' },
	{ label: 'Andere', value: 'other' }
];

const companySizes = [
	{ label: '1 bis 9 MitarbeiterInnen', value: 'xsmall' },
	{ label: '10 bis 249 Mitarbeiterinnen', value: 'small' },
	{ label: '250 bis 999 MitarbeiterInnen', value: 'medium' },
	{ label: '1.000 bis 9.999 MitarbeiterInnen', value: 'large' },
	{ label: '10000 und mehr MitarbeiterInnen', value: 'xlarge' }
];

const CompanyInfos = () => {
	const [industry, setIndustry] = useState('');
	const [companySize, setCompanySize] = useState('');
	const router = useRouter();



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
          companySize
        })
      });
    } catch (error) {
      console.log(error);
      console.log("error here")
    }
  };

	
	

	const handleSubmit = () => {
		if (!industry || !companySize) {
			alert('Please select an industry and company size');
			return;
		}
		localStorage.setItem('industry', industry);
		localStorage.setItem('companySize', companySize);
		console.log("here")
		createNote();
		router.push('/ProductPortfolio');
	};

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

	return (
		<div className="bg-lightblue font-sans h-screen">
			<div className="flex justify-center mt-5 mb-5">
				<Image src={'/TCW.png'} alt={'TCW'} width={300} height={300} />
			</div>

			<p className="text-center mx-auto mb-5">Willkommen beim TCW Resilienz Check.</p>
			<h2 className="text-lg font-medium">
				Bitte füllen Sie zunächst allgemeine Informationen zu Ihrem Unternehmen aus, um
				abschließend einen Vergleich mit Ihrer Peer-Group zu erhalten.
			</h2>
			<div className="mt-4">
				<label className="block text-gray-700">
					Industrie:
					<select
						className="block w-full border border-gray-400 rounded-lg p-2"
						value={industry}
						onChange={(e) => setIndustry(e.target.value)}
					>
						<option value="">Select an industry</option>
						{industries.map(({ label, value }) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</select>
				</label>
				<label className="block text-gray-700 mt-4">
					Unternehmensgröße:
					<select
						className="block w-full border border-gray-400 rounded-lg p-2"
						value={companySize}
						onChange={(e) => setCompanySize(e.target.value)}
					>
						<option value="">Select a company size</option>
						{companySizes.map(({ label, value }) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</select>
				</label>
			</div>
			<div className="mt-4">
				<button
					className="bg-blue-500 text-white rounded-lg p-2"
					type="button"
					onClick={handleSubmit}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default CompanyInfos;
