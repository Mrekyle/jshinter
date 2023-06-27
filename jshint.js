// MISC Variables  

const API_KEY = '8rG_8YmfZz4NQhnMvHCVinvMDZE'; // API Key
const API_URL = 'https://ci-jshint.herokuapp.com/api'; // API hosted location
const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'))

document.getElementById('status').addEventListener('click', e => getStatus(e))
document.getElementById('submit').addEventListener('click', e => postForm(e))

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`; // Stings the web address and they key together to get a valid response as required by the api
 
    const response = await fetch(queryString); // Waiting for the response from the api, fetching the query string const

    const data = await response.json(); // Converts the response sent back into the json format

    if (response.ok) {
        console.log(data.expiry) // Logs the returned data to the console of the api expiry 
        displayStatus(data)
    } else {
        throw new Error(data.error) // Throws an error if a bad response is sent back and shows the error
        // console.log('OH NO', data.error)
    }
}

function displayStatus(data) {
    const modalTitle = document.getElementById('resultsModalTitle'); // Getting elements by there ID
    const resultsContent = document.getElementById('results-content');

    modalTitle.innerText = 'API Key Status:' // Populates the modal with the string of text
    resultsContent.innerText = 'Your key is valid until:\n' + data.expiry; // Populates the modal with the data

    resultsModal.show(); // Shows the results modal with the show function
}

async function postForm(e) {

    const form = new FormData(document.getElementById("checksform"));

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
    });

}
