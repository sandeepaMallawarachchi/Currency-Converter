const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//all currencies
app.get('/getAllCurrencies', async (req, res) => {
    const nameURL = `https://openexchangerates.org/api/currencies.json?app_id=dbd041918927456a84a1ec774b6a4236`;

    try {

        const namesRes = await axios.get(nameURL);
        const nameData = namesRes.data;

        return res.json(nameData);
    } catch (error) {
        console.log(error);
    }
});

//target amount
app.get('/convert', async (req, res) => {
    const {date, sourceCurrency, targetCurrency, amountSource} = req.query;

    try {
        
        const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=dbd041918927456a84a1ec774b6a4236`;
        
        const dataRes = await axios.get(dataURL);
        const rates = dataRes.data.rates;

        //rates
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        //target value
        const targetAmount = (targetRate / sourceRate) * amountSource;

        return res.json(targetAmount.toFixed(2));
    } catch (error) {
        console.log(error);
    }
});

//listening to a port
app.listen(5000, () => {
    console.log('server started');
});