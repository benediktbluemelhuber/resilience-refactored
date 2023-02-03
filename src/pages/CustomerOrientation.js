import React, { useState, useEffect } from 'react'
import { useRouter} from 'next/router'
import CustomerOrientationArray from '../assets/customer_orientation.json'
import LocalStorage from 'react-localstorage';



const CustomerOrientation = () => {
  const router = useRouter()
  const [valuesCustomer, setValues] = useState(Array(CustomerOrientationArray.length).fill(-1))
  
  useEffect(() => {
    const storedValues = localStorage.getItem('valuesCustomer')
    if (storedValues) {
      setValues(JSON.parse(storedValues))
    }
  }, [])
  
  const handleButtonClick = (index, value) => {
    const newValues = [...valuesCustomer]
    newValues[index] = value
    setValues(newValues)
    localStorage.setItem('valuesCustomer', JSON.stringify(newValues))
  }

  const handleSubmit = () => {
    router.push({
      pathname: '/FinancialSustainability'
    })
  }

  return (<>
    <section className="mb-16">
				<div className={'text-gray-700 text-6xl font-bold mb-3'}>Kundenorientierung</div>
		</section>
    <div className={'text-gray-700 text-xs mb-2'}>Beantworten Sie die folgenden Fragen mit einem Wert zwischen 1 und 10:</div>
    <div className={'text-gray-700 text-xs mb-3'}>1 = trifft überhaupt nicht zu | 10 = trifft voll zu</div>
    <div className="flex flex-col p-4 container center-left py-4">
      {valuesCustomer.map((value, index) => (
        <React.Fragment key={index}>
          <label className="block text-gray-700 text-xs font-bold mb-3 text-left" htmlFor={`slider-${index}`}>
            <strong>{index + 1}. {CustomerOrientationArray[index].title}</strong>: {CustomerOrientationArray[index].question} 
          </label>
          <div className="container flex center-left  mx-1 py-4">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
              <button key={val}
              className={`flex justify-between text-center p-2 ml-3  mb-3 text-xs bg-white rounded-lg hover:bg-blue-700 ${value === val ? 'bg-blue-900 text-white' : ''} ml-2`}
              type="button"
                onClick={() => handleButtonClick(index, val)}
              >
                {val}
              </button>
              
            ))}
          </div>
        </React.Fragment>
      ))}
      <div className="flex">
      <button
        className="text-left ml-auto mt-4 p-2  bg-blue-500  text-white rounded-lg hover:bg-blue-700"
        type="button"
        onClick={handleSubmit}
      >
        Next
      </button></div>
      
    </div>
    </>
  )
}

export default CustomerOrientation