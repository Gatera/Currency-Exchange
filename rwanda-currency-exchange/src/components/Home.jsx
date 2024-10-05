import React, { useEffect, useState } from 'react'
import CurrencySelection from './CurrencySelection'
import AmountInput from './AmountInput'
import ConversionResult from './ConversionResult'
import Header from './Header'

function Home() {
  const [currencies, setCurrencies] = useState([])
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('RWF')
  const [amount, setAmount] = useState(1)
  const [exchangeRates, setExchangeRates] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch available currencies and exchange rate on component mount
  useEffect(() => {
    const fetchCurrencies = async () => {
      setLoading(true) //Set loading to true while fetching
      setError(null) //Clear any previous errors

      try {
        const apiKey = import.meta.env.VITE_GITHUB_API_KEY
        const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${apiKey}`)

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json()

        if (!data.rates) throw new Error('Failed to fetch exchange rates')

        setCurrencies(Object.keys(data.rates))
        setExchangeRates(data.rates)
        setLoading(false) // Set loading to false after successful fetch
      } catch (error) {
        setError(`Failed to fetch exchange rates: ${error.message}`)
        setLoading(false) // Stop loading on error
      }
    }

    fetchCurrencies()
  }, [])

  // Function to handle curreny conversion
  const convertCurrency = (amount = 1) => {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) return 0

    const result = (() => {
      // In the event of converting from USD directly to another currency
      if (fromCurrency === 'USD') {
        return amount * exchangeRates[toCurrency]
      }

      // In the event of converting to USD from another currency
      if (toCurrency === 'USD') {
        return amount / exchangeRates[fromCurrency]
      }

      // Currencies other than USD
      const amountInUSD = amount / exchangeRates[fromCurrency]
      return amountInUSD * exchangeRates[toCurrency]
    })()

    return result < 1 ? result.toFixed(6) : result.toFixed(2)
  }
  

  return (
    <div className='min-h-screen flex flex-col'>
        <Header />

        <main className='flex-grow container mx-auto py-10 px-4 md:px-0'>

          <h1 className='uppercase text-3xl font-bold font-montserrat mb-10 mt-4'>Rwanda Currency Exchange</h1>

          {/* Show loading spinner when data is being fetched */}
          {loading && 
          <div className=' flex flex-col items-center justify-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2'></div>
              <p>Loading exchange rates...</p>
            </div>}

          {/* Show error message if there is an error */}
          {error && <div className='text-center text-red-500'>{error}</div>}
          
          {/* Show content if there is no error or loading */}

          {!loading && !error && (
            <div>
              <section className='bg-white shadow-cstm p-6 md:p-8 rounded-lg mb-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-6 md:mx-32'>

                  {/* From Currency Select */}
                  <CurrencySelection
                    currencies={currencies}
                    selectedCurrency={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                  />

                  {/* To Currency Select */}
                  <CurrencySelection
                    currencies={currencies}
                    selectedCurrency={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                  />

                  {/* From Currency Input*/}
                  <AmountInput
                    amount={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />

                  {/* To Currency Input */}
                  <AmountInput
                    amount={convertCurrency(amount)}
                    readOnly={true}
                  />

                  <ConversionResult
                    fromCurrency={fromCurrency}
                    toCurrency={toCurrency}
                    result={convertCurrency(1)}/>

                </div>

                {/* Error Handling */}
                {error && <p className='text-red-500'>{error}</p>}

              </section>

              <section className='bg-white shadow-cstm p-6 md:p-8 rounded-lg'>
                <h2 className='text-lg font-bold mb-4'>RWF to KES Chart</h2>
                <p className='text-red-500 font-bold text-lg mb-4'>-22.36% (1Y)</p>
                <div className='flex justify-center space-x-4 mb-6 overflow-x-auto'>
                  <button className='text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-md'>12H</button>
                  <button className='text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-md'>1D</button>
                  <button className='text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-md'>1W</button>
                  <button className='text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-md'>1M</button>
                  <button className='text-sm text-blue-600 border border-gray-300 px-4 py-2 rounded-md'>1Y</button>
                  <button className='text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-md'>2Y</button>
                  <button className='text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-md'>5Y</button>
                  <button className='text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-md'>10Y</button>
                </div>
                <div className='bg-gray-100 h-48 rounded-md flex justify-center items-center'>
                  <p>Chart will be here</p>
                </div>
              </section>
            </div>
        )}
        </main>

        <footer className='bg-blue-600 text-white py-6'>
          <div className='container mx-auto text-center'>
            <p className='mb-2'>About Us | Help | Contact | Currency Converter | Currency Charts</p>
            <p>&copy; 2024 RCE</p>
          </div>
        </footer>
    </div>
  )
}

export default Home