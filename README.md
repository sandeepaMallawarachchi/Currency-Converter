# Currency Converter

![image](https://github.com/sandeepaMallawarachchi/Currency-Converter/assets/126542051/3306191f-83d8-4a24-bbaa-1ac752fcff7d)

## About Currency Converter

This currency converter application is a React-based web tool designed to facilitate easy and accurate currency conversions.

### Featutes

  * Date Selection:
    Allows users to select a date for which they want the conversion rate. The date input is restricted to not allow future dates, ensuring historical accuracy.
  
  * Currency Selection:
    Users can select both the source and target currencies from dynamically populated dropdown menus. The list of currencies is fetched from an API (/getAllCurrencies) when the component mounts.
  
  * Amount Input:
    Users can enter the amount they wish to convert in the source currency. Input validation ensures only non-negative numeric values are accepted.

  * Conversion Result:
    After submitting the form, the application fetches the conversion rate from the server (/convert endpoint) and displays the converted amount in the target currency.
    
  * Responsive Design:
    The application is designed to be responsive, making it accessible on both desktop and mobile devices.

### Usage

To use the currency converter:

Select a date for the conversion rate.
Choose the source and target currencies from the dropdown menus.
Enter the amount to be converted in the source currency.
Click the "Get the target currency" button.
View the converted amount once the loading message disappears.

## License & Api

I have used [openexchangerates](https://openexchangerates.org/) as a api and web application is hosted using [vercel](https://vercel.com/) platform.

## Try it out here
https://currency-converter-client-kappa.vercel.app/
