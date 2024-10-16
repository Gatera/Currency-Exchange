import React from 'react'

function DateRangeButtons({ onRangeChange, currentRange }) {
  return (
    <div className='flex justify-center space-x-4 mb-6 overflow-x-auto'>
        <button
            onClick={() => onRangeChange('1D')}
            className={
                `text-sm ${currentRange === '1D' ? 'text-blue-600' : 'text-gray-600'}
                border border-gray-300 px-4 py-2 rounded-md`}>
            1D
        </button>
        <button
            onClick={() => onRangeChange('1W')}
            className={
                `text-sm ${currentRange === '1W' ? 'text-blue-600' : 'text-gray-600'}
                border border-gray-300 px-4 py-2 rounded-md`}>
            1W
        </button>
        <button
            onClick={() => onRangeChange('1M')}
            className={
                `text-sm ${currentRange === '1M' ? 'text-blue-600' : 'text-gray-600'}
                border border-gray-300 px-4 py-2 rounded-md`}>
            1M
        </button>
        <button
            onClick={() => onRangeChange('3M')}
            className={
                `text-sm ${currentRange === '3M' ? 'text-blue-600' : 'text-gray-600'}
                border border-gray-300 px-4 py-2 rounded-md`}>
            3M
        </button>
        <button
            onClick={() => onRangeChange('1Y')}
            className={
                `text-sm ${currentRange === '1Y' ? 'text-blue-600' : 'text-gray-600'}
                border border-gray-300 px-4 py-2 rounded-md`}>
            1Y
        </button>
    </div>
  )
}

export default DateRangeButtons