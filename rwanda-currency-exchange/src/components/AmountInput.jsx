import React from 'react'

function AmountInput({ amount, onChange, readOnly = false }) {
  return (
    <div className='flex flex-col'>
        <input
            type="number"
            value={amount}
            onChange={onChange}
            readOnly={readOnly}
            className='text-center text-3xl border border-gray-400 p-6 bg-gray-100 rounded-md w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200' />
    </div>
  )
}

export default AmountInput