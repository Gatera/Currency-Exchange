import React, { useEffect, useState } from 'react'
import CurrencySelectionDropdown from './CurrencySelectionDropdown'
import AmountField from './AmountField'
import ConversionRate from './ConversionRate'
import Header from './Header'
import HistoricalChart from './HistoricalChart'
import Footer from './Footer'

function Home() {
  // State variables to hold various data
  const [currencies, setCurrencies] = useState([])
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('RWF')
  const [amount, setAmount] = useState(1)
  const [exchangeRates, setExchangeRates] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch available currencies and exchange rate on component mount
  useEffect(() => {
    async function fetchCurrencies() {
      setLoading(true) //Set loading to true while fetching
      setError(null) //Clear any previous errors

      try {
        // Fetch current exchange rates
        const apiKey = import.meta.env.VITE_OPENEXCH_API_KEY
        const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${apiKey}`)

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json()

        if (!data.rates) throw new Error('Failed to fetch exchange rates')
          
        // Store the currencies and exchange rates
        setCurrencies(Object.keys(data.rates))
        setExchangeRates(data.rates)
        setLoading(false) // Set loading to false after successful fetch
      } catch (error) {
        setError(`Failed to fetch exchange rates: ${error.message}`)
        setLoading(false) // Stop loading on error
      }
    }

    // Call the function
    fetchCurrencies()
  }, [])

  // Function to handle curreny conversion
  function convertCurrency() {
    // Ensure exchange rates for selected currencies are available
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) return 0

    function calculateConversion(fromCurrency, toCurrency, amount, exchangeRates) {
      // If converting from USD
      if (fromCurrency === 'USD') {
        return amount * exchangeRates[toCurrency]
      }

      // If converting to USD
      if (toCurrency === 'USD') {
        return amount / exchangeRates[fromCurrency]
      }

      // Currencies other than USD
      const amountInUSD = amount / exchangeRates[fromCurrency]
      return amountInUSD * exchangeRates[toCurrency]
    }

    const result = calculateConversion(fromCurrency, toCurrency, amount, exchangeRates)

    // If result is less than 1, show up to 6 decimal places, else show 2 decimal places
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
            
          <div role="status">
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
          </div>

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
                  <CurrencySelectionDropdown
                    currencies={currencies}
                    selectedCurrency={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                  />

                  {/* To Currency Select */}
                  <CurrencySelectionDropdown
                    currencies={currencies}
                    selectedCurrency={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                  />

                  {/* From Currency Input*/}
                  <AmountField
                    amount={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />

                  {/* To Currency Output */}
                  <AmountField
                    amount={convertCurrency(amount)}
                    readOnly={true}
                  />

                  <ConversionRate
                    fromCurrency={fromCurrency}
                    toCurrency={toCurrency}
                    result={convertCurrency(1)}/>
                    
                </div>

              </section>

             <section className='bg-white shadow-cstm p-6 md:p-8 rounded-lg'>
                  <HistoricalChart baseCurrency={fromCurrency} targetCurrency={toCurrency} />
              </section>
            </div>
        )}
        </main>

        <Footer />
    </div>
  )
}

export default Home