import React from 'react'

function CurrencySelection({ currencies, selectedCurrency, onChange}) {
  return (
    <div>
        <select
        className='w-full border border-gray-300 rounded-md p-4'
        value={selectedCurrency}
        onChange={onChange}
        >
        {currencies.map(currency => (
            <option value={currency} key={currency}>
            {currency}
            </option>
        ))}
        </select>
    </div>
  )
}

export default CurrencySelection