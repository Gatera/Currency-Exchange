import React, { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const fetchHistoricalData = async (startDate, endDate, baseCurrency, targetCurrency) => {
    const apiKey = import.meta.env.VITE_GITHUB_API_KEY
    let currentDate = new Date(startDate)
    const end = new Date(endDate)
    const historicalData = []

    while (currentDate <= end) {
        const formattedDate = currentDate.toISOString().split('T')[0]
        const url = `https://openexchangerates.org/api/historical/${formattedDate}.json?app_id=${apiKey}&base=${baseCurrency}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.rates[targetCurrency]) {
            historicalData.push({ date: formattedDate, rate: data.rates[targetCurrency] })
        }

        currentDate.setDate(currentDate.getDate() + 1)
    }

    return historicalData
}

function HistoricalChart({ baseCurrency, targetCurrency }) {
    const [historicalRates, setHistoricalRates] = useState([])

    useEffect(() => {
        const startDate = '2024-01-01'
        const endDate = '2024-10-04'

        fetchHistoricalData(startDate, endDate, baseCurrency, targetCurrency)
            .then((data) => setHistoricalRates(data))
            .catch((error) => console.error(error))
    }, [baseCurrency, targetCurrency])

  return (
    <div className='w-full h-96'>
        {historicalRates.length > 0 ? (
            <ResponsiveContainer className='w-full h-full'>
                <LineChart data={historicalRates}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey='rate' stroke='#8884d8' />
                </LineChart>
            </ResponsiveContainer>

            // <ul>
            //     {historicalRates.map((rate) => (
            //         <li key={rate.date}>
            //             {rate.date}: {rate.rate}
            //         </li>
            //     ))}
            // </ul>
        ): (
            <p>Loading historical data...</p>
        )}
    </div>
  )
}

export default HistoricalChart