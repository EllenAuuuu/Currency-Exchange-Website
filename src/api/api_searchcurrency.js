const API_KEY ='2eb3dac40bmsh83af16cfd40d54ep133577jsn8a91d1054f1a';
const API_HOST = 'alpha-vantage.p.rapidapi.com';


export async function fetchDailyInfo(data){
    try{
        const url = 'https://alpha-vantage.p.rapidapi.com/query?';
        const params = `from_symbol=${data.from_symbol}&function=FX_DAILY&to_symbol=${data.to_symbol}&outputsize=compact&datatype=json`;
        const options = {
	     method: 'GET',
         headers: {
	         'X-RapidAPI-Key': API_KEY,
		     'X-RapidAPI-Host': API_HOST
	    }
        };

	    const response = await fetch(url + params, options);

            if (response.status !== 200) {
            throw new Error('Failed to fetch data from the API');
            }

            return response.json();
        } catch (e) {
            alert('An error occurred while fetching the data. Please try again later.');
            throw e;
        }
}




