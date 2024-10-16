import React from 'react'

function CurrencySelectionDropdown({ currencies, selectedCurrency, onChange}) {
  return (
    <div>
        {/* Currency selection options */}
        <select
        className='w-full border border-gray-300 rounded-md p-4'
        value={selectedCurrency}
        onChange={onChange}
        >
          {/* Loop through the list to create each option in the dropdown */}
        {currencies.map(currency => (
            <option value={currency} key={currency}>
            {currency}
            </option>
        ))}
        </select>
    </div>
  )
}

export default CurrencySelectionDropdown