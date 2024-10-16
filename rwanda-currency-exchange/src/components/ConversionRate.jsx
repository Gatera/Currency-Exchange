import React from 'react'

function ConversionRate({ fromCurrency, toCurrency, result }) {
  return (
    <p className='text-left text-gray-500 col-span-1 md:col-span-2'>
        {fromCurrency} 1 = {toCurrency} {result}
    </p>
  )
}

export default ConversionRate