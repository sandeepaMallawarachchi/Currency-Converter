import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    // States
    const currentDate = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(currentDate);
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");
    const [amountSource, setAmountSource] = useState("");
    const [amountTarget, setAmountTarget] = useState(0);
    const [currencyNames, setCurrencyNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [btnClicked, setBtnClicked] = useState(false);

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setBtnClicked(false);

        try {
            const response = await axios.get('https://currency-converter-server-pi.vercel.app/convert', {
                params: {
                    date,
                    sourceCurrency,
                    targetCurrency,
                    amountSource,
                },
            });

            setAmountTarget(response.data);
            setLoading(false);
            setBtnClicked(true);

            console.log(amountSource, amountTarget);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Get all currencies
    useEffect(() => {
        const getCurrencyNames = async () => {
            try {
                const response = await axios.get('https://currency-converter-server-pi.vercel.app/getAllCurrencies');
                setCurrencyNames(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCurrencyNames();
    }, []);

    const handleNumericInput = (value, setter) => {
        const regex = /^[0-9\b]+$/;
        if (regex.test(value) || value === "") {
            setter(value);
        }
    };

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
                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                max={currentDate}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="sourceCurrency" className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Source Currency</label>
                            <select
                                name="sourceCurrency"
                                id="sourceCurrency"
                                value={sourceCurrency}
                                onChange={(e) => setSourceCurrency(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                required
                            >
                                <option value=''>Select the source currency</option>
                                {Object.keys(currencyNames).map((currency) => (
                                    <option className='p-1' key={currency} value={currency}>
                                        {currencyNames[currency]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="targetCurrency" className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Target Currency</label>
                            <select
                                name="targetCurrency"
                                id="targetCurrency"
                                value={targetCurrency}
                                onChange={(e) => setTargetCurrency(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                required
                            >
                                <option>Select the target currency</option>
                                {Object.keys(currencyNames).map((currency) => (
                                    <option className='p-1' key={currency} value={currency}>
                                        {currencyNames[currency]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="amountSource" className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Amount in source currency</label>
                            <input
                                type="number"
                                id="amountSource"
                                name="amountSource"
                                value={amountSource}
                                onChange={(e) => handleNumericInput(e.target.value, setAmountSource)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                placeholder='Amount in source currency'
                                required
                            />
                        </div>

                        <div className="text-center">
                            <button className='bg-green-600 hover:bg-green-700 hover:scale-110 text-white font-md mt-5 py-3 px-5 rounded-md mx-auto outline-none'>Get the target currency</button>
                        </div>
                    </form>
                </section>
            </div>

            {btnClicked && loading ? (
                <section className='text-center mt-7'>Loading...</section>
            ) : btnClicked && !loading && (
                <section className='text-center text-2xl mt-7'>
                    {amountSource} {currencyNames[sourceCurrency]} is equal to {" "}
                    <span className='text-green-500 font-bold'>{amountTarget}</span> in {" "} {currencyNames[targetCurrency]}
                </section>
            )}

            <div className="bottom-0 w-full bg-gray-800 text-white py-4 text-center left-0 mt-10 lg:absolute">
                &copy; 2024 Sandeepa Mallawarachchi. All rights reserved.
            </div>
        </div>
    );
}