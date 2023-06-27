// MISC Variables  

const API_KEY = '8rG_8YmfZz4NQhnMvHCVinvMDZE'; // API Key
const API_URL = 'https://ci-jshint.herokuapp.com/api'; // API hosted location
const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'))

document.getElementById('status').addEventListener('click', e => getStatus(e))

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`; // Stings the web address and they key together to get a valid response as required by the api
 
    const response = await fetch(queryString); // Waiting for the response from the api, fetching the query string const

    const data = await response.json(); // Converts the response sent back into the json format

    if (response.ok) {
        console.log(data.expiry)
    } else {
        console.log('OH NO, Thats not quite right..')
    }
}

// const response = fetch("https://ci-jshint.herokuapp.com/api", {
//                         method: "POST",
//                         headers: {
//                                     "Authorization": API_KEY,
//                                  }
//                         })

