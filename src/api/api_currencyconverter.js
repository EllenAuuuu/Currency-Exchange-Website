import { useEffect, useState } from "react";

const API_KEY = '2eb3dac40bmsh83af16cfd40d54ep133577jsn8a91d1054f1a';
const API_HOST = 'currency-converter5.p.rapidapi.com';

export async function fetchCurrencies(){
    try {
        
        const url= 'https://currency-converter5.p.rapidapi.com/currency/list';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': API_HOST
            }
        };
        
        const response = await fetch(url, options);
        return response.json();

    } catch (e) {
        alert(e);
    }
}

export async function fetchExchangeRate(data){
    const url = 'https://currency-converter5.p.rapidapi.com/currency/convert?format=json';
    const params = `&from=${data.fromCurrency}&to=${data.toCurrency}&amount=${data.amount}`

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST
        }
    };

    const response = await fetch(url + params, options);
    return response.json();
}

export function FetchCurrencies(data){
    const [loading, setLoading] = useState(true);
    const [currenciesData, setCurrenciesData] = useState([]);
    const [error,setError] = useState(null);

    useEffect(()=> {
     (async () => {
        try{
            const data =await fetchCurrencies();
            setCurrenciesData(data);

            setLoading(false);
        } catch (err) {
            setError(err); 
            setLoading(false);
        }
        })();

        }, []);

    return{loading, currenciesData, error};
}

export function FetchExchangeRate(data){
    const [loading, setLoading] = useState(true);
    const [exchangeRateData, setExchangeRateData] = useState([]);
    const [error,setError] = useState(null);

    useEffect(()=> {
     (async () => {
        try{
         setExchangeRateData(await fetchExchangeRate(data));
        setLoading(false);
    } catch (err) {
        setError(err); 
        setLoading(false);

    }
     })();

    }, [data]);

    return{loading, exchangeRateData, error};
}