import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SuppliersArray from '../assets/suppliers.json'
import ProgressBar from '../components/ProgressBar'

const Suppliers = () => {
  const router = useRouter()
  const [valuesSupppliers, setValues] = useState(Array(SuppliersArray.length).fill(-1))
  
  useEffect(() => {
    const storedValues = localStorage.getItem('valuesSuppliers')
    if (storedValues) {
      setValues(JSON.parse(storedValues))
    }
  }, [])

  const handleButtonClick = (index, value) => {
    const newValues = [...valuesSupppliers]
    newValues[index] = value
    setValues(newValues)
    localStorage.setItem('valuesSuppliers', JSON.stringify(newValues))
  }

  const handleSubmit = () => {
    router.push({
      pathname: '/LogisticSystems'
    })
  }

  return (<>
    <section class="mb-16">
				<div class={'text-gray-700 text-6xl font-bold mb-3'}>Lieferanten</div>
		</section>
    <div class={'text-gray-700 text-xs mb-2'}>Beantworten Sie die folgenden Fragen mit einem Wert zwischen 1 und 10:</div>
    <div class={'text-gray-700 text-xs mb-3'}>1 = trifft überhaupt nicht zu | 10 = trifft voll zu</div>
    <div class="flex flex-col p-4 container center-left py-4">
      {valuesSupppliers.map((value, index) => (
        <React.Fragment key={index}>
          <label class="block text-gray-700 text-xs font-bold mb-3 text-left" htmlFor={`slider-${index}`}>
            <strong>{index + 1}. {SuppliersArray[index].title}</strong>: {SuppliersArray[index].question} 
          </label>
          <div class="container flex center-left  mx-1 py-4">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
              <button key={val}
                class={`flex justify-between text-center p-2 ml-3  mb-3 text-xs bg-white rounded-lg hover:bg-blue-700 ${value === val ? 'bg-blue-900 text-white' : ''} ml-2`}
                type="button"
                onClick={() => handleButtonClick(index, val)}
              >
                {val}
              </button>
              
            ))}
          </div>
        </React.Fragment>
      ))}
     <div class="flex">
      <button
        class="block text-left ml-0 mt-4 p-2  bg-blue-500  text-white rounded-lg hover:bg-blue-700"
        type="button"
        onClick={handleSubmit}
      >
        Next
      </button>
  	  </div>
      <div className='mt-4 mb-4'> 
      <ProgressBar value = {(5/6*100).toFixed(0)}/>
      </div>
    </div>
    
    </>
  )
}

export default Suppliers