import React, { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const fetchHistoricalData = async (startDate, endDate, baseCurrency, targetCurrency) => {
    const apiKey = import.meta.env.VITE_GITHUB_API_KEY
    let currentDate = new Date(startDate)
    const end = new Date(endDate)
    const historicalData = []

    console.log('Fetching data for:', { baseCurrency, targetCurrency });
    
    const base = 'USD'

    while (currentDate <= end) {
        const formattedDate = currentDate.toISOString().split('T')[0]
        const url = `https://openexchangerates.org/api/historical/${formattedDate}.json?app_id=${apiKey}&base=${base}`

        try {
            const response = await fetch(url)
            if (!response.ok) {
                console.error(`Error fetching data for ${formattedDate}: ${response.statusText}`)
                break                
            }

            const data = await response.json()

            // If baseCurrency === USD
            if (baseCurrency === 'USD') {
                if (data.rates[targetCurrency]) {
                    historicalData.push({ date: formattedDate, rate: data.rates[targetCurrency] })
                }
            } else {
                // If baseCurrency != USD
                const baseRateToUSD = 1 / data.rates[baseCurrency]
                const targetRate = baseRateToUSD * data.rates[targetCurrency]
    
                historicalData.push({ date: formattedDate, rate: targetRate})
            }
        } catch (error) {
            console.error(`Failed to fetch historical data for ${formattedDate}: ${error}`);
            break
        }

        currentDate.setDate(currentDate.getDate() + 1)
    }

    return historicalData
}

function HistoricalChart({ baseCurrency, targetCurrency }) {
    const [historicalRates, setHistoricalRates] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const startDate = '2024-09-04'
        const endDate = '2024-10-04'

        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await fetchHistoricalData(startDate, endDate, baseCurrency, targetCurrency)
                setHistoricalRates(data)
            } catch (err) {
                console.error(err);
                setError('Failed to fetch data')
            } finally {
            setLoading(false)
            }
        }
        
        fetchData()
    }, [baseCurrency, targetCurrency])

  return (
    <div className='w-full'>
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
        ): (
            <p>Loading historical data...</p>
        )}
    </div>
  )
}

export default HistoricalChart