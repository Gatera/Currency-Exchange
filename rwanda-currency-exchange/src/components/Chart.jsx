import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function Chart({ historicalRates, loading }) {
  return (
    <div className='bg-gray-100 h-48 rounded-md flex'>
        <div className='w-full'>
            {/* Display loading if data is still being fetched */}
            {loading ? (
                <p>Loading historical data...</p>
            ) : historicalRates.length > 0 ? (
                // Render once data is available
                <ResponsiveContainer className='w-full h-full'>
                    <LineChart data={historicalRates}>
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="date" />
                        <YAxis dataKey="rate"/>
                        <Tooltip />
                        <Legend />
                        <Line type='monotone' dataKey='rate' stroke='#8884d8' />
                    </LineChart>
                </ResponsiveContainer>
            ): (
                <p>No historical data available.</p>
            )}
        </div>
    </div>
  )
}

export default Chart