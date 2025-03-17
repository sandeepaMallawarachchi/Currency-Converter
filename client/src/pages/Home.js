import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const currentDate = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(currentDate);
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");
    const [amountSource, setAmountSource] = useState("");
    const [amountTarget, setAmountTarget] = useState(0);
    const [currencyNames, setCurrencyNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [btnClicked, setBtnClicked] = useState(false);

    useEffect(() => {
        const getCurrencyNames = async () => {
            try {
                const response = await axios.get('https://currency-converter-server-pi.vercel.app/getAllCurrencies');
                setCurrencyNames(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getCurrencyNames();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setBtnClicked(false);

        try {
            const response = await axios.get('https://currency-converter-server-pi.vercel.app/convert', {
                params: { date, sourceCurrency, targetCurrency, amountSource },
            });

            setAmountTarget(response.data);
            setLoading(false);
            setBtnClicked(true);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className="p-5">
            <div className='text-center'>
                <h1 className='text-5xl font-bold text-green-500'>Convert Your Currencies Today</h1>
                <p className='opacity-60 py-6'>"Streamlined Currency Conversion: Your Passport to Seamless Transactions"</p>
            </div>

            <div className='mt-5 flex items-center justify-center flex-col'>
                <section className='w-full lg:w-1/2'>
                    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                            <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}
                                className="bg-gray-50 border text-gray-900 text-sm rounded-lg p-2.5 w-full"
                                max={currentDate} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="sourceCurrency" className="block mb-2 text-sm font-medium text-gray-900">Source Currency</label>
                            <select id="sourceCurrency" value={sourceCurrency} onChange={(e) => setSourceCurrency(e.target.value)}
                                className="bg-gray-50 border text-gray-900 text-sm rounded-lg p-2.5 w-full" required>
                                <option value=''>Select the source currency</option>
                                {Object.keys(currencyNames).map((currency) => (
                                    <option key={currency} value={currency}>{currencyNames[currency]}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="targetCurrency" className="block mb-2 text-sm font-medium text-gray-900">Target Currency</label>
                            <select id="targetCurrency" value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}
                                className="bg-gray-50 border text-gray-900 text-sm rounded-lg p-2.5 w-full" required>
                                <option value=''>Select the target currency</option>
                                {Object.keys(currencyNames).map((currency) => (
                                    <option key={currency} value={currency}>{currencyNames[currency]}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="amountSource" className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
                            <input type="number" id="amountSource" name="amountSource" value={amountSource}
                                onChange={(e) => setAmountSource(e.target.value)}
                                className="bg-gray-50 border text-gray-900 text-sm rounded-lg p-2.5 w-full" placeholder='Amount' required />
                        </div>

                        <div className="text-center">
                            <button className='bg-green-600 hover:bg-green-700 text-white font-md mt-5 py-3 px-5 rounded-md'>Convert</button>
                        </div>
                    </form>
                </section>
            </div>

            {btnClicked && (
                <section className='text-center text-2xl mt-7'>
                    <p>{amountSource} {currencyNames[sourceCurrency]} is equal to 
                        <span className='text-green-500 font-bold'> {amountTarget} </span> in {currencyNames[targetCurrency]}
                    </p>
                    
                    {/* AdSense Ad Inside Result Section */}
                    <div className="mt-5">
                        <ins className="adsbygoogle"
                            style={{ display: "block" }}
                            data-ad-client="ca-pub-1081630918377195"
                            data-ad-slot="1234567890"
                            data-ad-format="auto"
                            data-full-width-responsive="true"></ins>
                        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                    </div>
                </section>
            )}

            <div className="mt-10 text-center">
                <h2 className="text-2xl font-semibold text-gray-700">Why Use Our Currency Converter?</h2>
                <p className="mt-3 text-gray-500">Our real-time currency converter helps you stay updated with exchange rates, making financial transactions seamless.</p>
            </div>

            <div className="bottom-0 w-full bg-gray-800 text-white py-4 text-center mt-10">
                &copy; 2024 Sandeepa Mallawarachchi. All rights reserved.
            </div>
        </div>
    );
}
