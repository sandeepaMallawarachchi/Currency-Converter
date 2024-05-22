import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Home() {

    //states
    const currentDate = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(currentDate);
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");
    const [amountSource, setAmountSource] = useState(0);
    const [amountTarget, setAmountTarget] = useState(0);
    const [currencyNames, setCurrencyNames] = useState([]);
    const [loading, setLoading] = useState(true);

    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.get('http://localhost:5000/convert', {

                params: {
                    date,
                    sourceCurrency,
                    targetCurrency,
                    amountSource,
                },
            });

            setAmountTarget(response.data);
            setLoading(false);

            console.log(amountSource, amountTarget);
        } catch (error) {
            console.log(error);
        }
    };

    //get all currencies
    useEffect(() => {
        const getCurrencyNames = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getAllCurrencies');
                setCurrencyNames(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCurrencyNames();
    }, []);

    return (

        <div>

            <div className='text-center'>
                <h1 className='text-5xl font-bold text-green-500'>Convert Your Currencies Today</h1>
                <p className='opacity-60 py-6'>"Streamlined Currency Conversion: Your Passport to Seamless Transactions"</p>
            </div>

            <div className='mt-5 flex items-center justify-center flex-col'>
                <section className='w-full lg:w-1/2'>

                    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label for="date" className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Date</label>
                            <input type="date" id={date} name={date} value={date} onChange={(e) => setDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required />
                        </div>

                        <div className="mb-4">
                            <label for="sourceCurrency" className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Source Currency</label>
                            <select name={sourceCurrency} id={sourceCurrency} value={sourceCurrency} onChange={(e) => setSourceCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required>

                                <option value=''>Select the source currency</option>

                                {Object.keys(currencyNames).map((currency) => (
                                    <option className='p-1' key={currency} value={currency}>
                                        {currencyNames[currency]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label for="targetCurrency" className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Target Currency</label>
                            <select name={targetCurrency} id={targetCurrency} value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required>

                                <option>Select the target currency</option>

                                {Object.keys(currencyNames).map((currency) => (
                                    <option className='p-1' key={currency} value={currency}>
                                        {currencyNames[currency]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label for="amountSource" className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Amount in source currency</label>
                            <input type="text" id={amountSource} name={amountSource} onChange={(e) => setAmountSource(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder='Amount in source currency' required />
                        </div>

                        <div className="text-center">
                            <button className='bg-green-600 hover:bg-green-700 hover:scale-110 text-white font-md mt-5 py-3 px-5 rounded-md mx-auto outline-none'>Get the target currency</button>
                        </div>

                    </form>
                </section>
            </div>
            {!loading ? (
                <section className='text-center text-2xl mt-7'>

                    {amountSource} {currencyNames[sourceCurrency]} is equel to {" "}
                    <span className='text-green-500 font-bold'>{amountTarget}</span> in {" "} {currencyNames[targetCurrency]}
                </section>
            ) : (
                <section className='text-center mt-7'>Loading...</section>
            )}

            <div className="bottom-0 w-full bg-gray-800 text-white py-4 text-center left-0 mt-10 lg:absolute">
                &copy; 2024 Sandeepa Mallawarachchi. All rights reserved.
            </div>
        </div>
    )
}
