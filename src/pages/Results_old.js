import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router'


const CompanyInfos = () => {
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
      if (!industry || !companySize) {
          alert('Please select an industry and company size');
          return;
      }
      localStorage.setItem('industry', industry)
      localStorage.setItem('companySize', companySize)
      router.push('/ProductPortfolio');
  }

  useEffect(() => {
    const storedValueIndustry = localStorage.getItem('industry')
    const storedValuesCompany = localStorage.getItem('companySize')
    if (storedValueIndustry) {
      setIndustry(storedValueIndustry)
    }
    if (storedValuesCompany) {
      setCompanySize(storedValuesCompany)
    }
  }, [])
  
  return (
    <div className="bg-lightblue font-sans h-screen">
    <div className="flex justify-center mt-5 mb-5">
      <Image src={'/TCW.png'} alt={'TCW'} width={300} height={300} />
    </div>
    
    <p className="text-center mx-auto w-1/2 mb-5">Willkommen beim TCW Resilienz Check.</p>
          <h2 className="text-lg font-medium">Bitte füllen Sie zunächst allgemeine Informationen zu Ihrem Unternehmen aus, um abschließend einen Vergleich mit Ihrer Peer-Group zu erhalten.</h2>
          <div className="mt-4 w-1/2">
              <label className="block text-gray-700">
                  Industrie:
                  <select
                      className="block w-full border border-gray-400 rounded-lg p-2"
                      value={industry}
                      onChange={e => setIndustry(e.target.value)}
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
onChange={e => setCompanySize(e.target.value)}
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
}

export default CompanyInfos;