import React, { useEffect, useState } from 'react'
import DateRange from './DateRange'
import Chart from './Chart'

function calculateStartDate(range) {
    const today = new Date()
    let startDate = new Date()

    switch (range) {
        case '1D':
            startDate.setDate(today.getDate() - 1)
            break
        case '1W':
            startDate.setDate(today.getDate() - 7)
            break
        case '1M':
            startDate.setMonth(today.getMonth() - 1)
            break
        case '1Y':
            startDate.setFullYear(today.getFullYear() - 1)
            break
        default:
            startDate.setFullYear(today.getFullYear() - 1)
            break;
    }

    return startDate.toISOString().split('T')[0]
}

function HistoricalChart({ baseCurrency, targetCurrency }) {
    const [historicalRates, setHistoricalRates] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [percentageChange, setPercentageChange] = useState(null)
    const [dateRange, setDateRange] = useState('1Y')
    const [startDate, setStartDate] = useState(calculateStartDate('1Y'))

    useEffect(() => {
        const endDate = new Date().toISOString().split('T')[0]

        const fetchHistoricalData = async (startDate, endDate, baseCurrency, targetCurrency) => {
            const apiKey = import.meta.env.VITE_GITHUB_API_KEY
            let currentDate = new Date(startDate)
            const end = new Date(endDate)
            const historicalData = []
            
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

        const fetchData = async () => {
            setLoading(true)
            setError(null)
            
            try {
                const data = await fetchHistoricalData(startDate, endDate, baseCurrency, targetCurrency)
                setHistoricalRates(data)

                if(data.length > 1) {
                    const startRate = data[0].rate
                    const endRate = data[data.length - 1].rate
                    const percentageDifference = ((endRate - startRate) / startRate) * 100
                    setPercentageChange(percentageDifference.toFixed(2))
                }
            } catch (err) {
                console.error(err);
                setError('Failed to fetch data')
            } finally {
            setLoading(false)
            }
        }
        
        fetchData()
    }, [baseCurrency, targetCurrency, startDate])

    //Button click to change the date range
    const handleDateRangeChange = (range) => {
        setDateRange(range)
        setStartDate(calculateStartDate(range))
    }

  return (
    <div>
        <h2 className='text-lg font-bold font-montserrat mb-4'>{baseCurrency} to {targetCurrency} Chart</h2>
            <p className='text-red-500 font-bold text-lg mb-4'>{percentageChange}% (1Y)</p>
            <DateRange onRangeChange={handleDateRangeChange} currentRange={dateRange} />
            <Chart historicalRates={historicalRates} loading={loading}/>
    </div>
  )
}

export default HistoricalChart