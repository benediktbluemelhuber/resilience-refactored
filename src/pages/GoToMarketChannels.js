import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import GoToMarketChannelsArray from '../assets/go_to_market.json'
import ProgressBar from '../components/ProgressBar'

const GoToMarketChannels = () => {
  const router = useRouter()
  const [valuesGoToMarket, setValues] = useState(Array(GoToMarketChannelsArray.length).fill(0))
  
  useEffect(() => {
    const storedValues = localStorage.getItem('valuesGoToMarket')
    if (storedValues) {
      setValues(JSON.parse(storedValues))
    }
  }, [])
  const handleButtonClick = (index, value) => {
    const newValues = [...valuesGoToMarket]
    newValues[index] = value
    setValues(newValues)
    localStorage.setItem('valuesGoToMarket', JSON.stringify(newValues))
  }
  

  const handleSubmit = () => {
    router.push({
      pathname: '/Suppliers'
    })
  }

  return (<>
    <section className="mb-16">
				<div className={'text-gray-700 text-6xl font-bold mb-3'}>Go-to-Market Kanäle</div>
		</section>
    <div className={'text-gray-700 text-xs mb-2'}>Beantworten Sie die folgenden Fragen mit einem Wert zwischen 1 und 10:</div>
    <div className={'text-gray-700 text-xs mb-3'}>1 = trifft überhaupt nicht zu | 10 = trifft voll zu</div>
    <div className="flex flex-col p-4 container center-left py-4">
      {valuesGoToMarket.map((value, index) => (
        <React.Fragment key={index}>
          <label className="block text-gray-700 text-m font-bold mb-3 text-left" htmlFor={`slider-${index}`}>
            <strong>{index + 1}. {GoToMarketChannelsArray[index].title}</strong>: {GoToMarketChannelsArray[index].question} 
          </label>
          <div className="container flex center-left  mx-1 py-4">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
              <button key={val}
              className={`flex justify-between text-center px-4 py-2 ml-3  mb-3 text-xs bg-white  rounded-lg hover:bg-blue-700 ${value === val ? 'bg-blue-900 text-white' : ''} ml-2`}
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
      <div className='mt-4 mb-4'> 
      <ProgressBar value = {(4/9*100).toFixed(0)}/>
      </div>
    </div>
    </>
  )
}

export default GoToMarketChannels