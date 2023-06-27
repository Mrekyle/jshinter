// MISC Variables  

const API_KEY = '8rG_8YmfZz4NQhnMvHCVinvMDZE'; // API Key
const API_URL = 'https://ci-jshint.herokuapp.com/api'; // API hosted location
const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'))

document.getElementById('status').addEventListener('click', e => getStatus(e))
document.getElementById('submit').addEventListener('click', e => postForm(e))

/**
 * Checks the status of the api and the api key are valid before working on a response
 **/
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

/**
 * Displays the status of the api key when the 'check key' button has been clicked
 */
function displayStatus(data) {
    const modalTitle = document.getElementById('resultsModalTitle'); // Getting elements by there ID
    const resultsContent = document.getElementById('results-content');

    modalTitle.innerText = 'API Key Status:' // Populates the modal with the string of text
    resultsContent.innerText = 'Your key is valid until:\n' + data.expiry; // Populates the modal with the data

    resultsModal.show(); // Shows the results modal with the show function
}

/**
 * Processing the options keywords for the api to understand 
 * what is required and requested by the api
 */
function processOptions(form) {

    let optArray = []

    for (let entry  of form.entries()) {
        if (entry[0] === "options") {
            optArray.push(entry[1])
        }
    }

    form.delete('options') // Deletes all 'options' keywords in the array
    form.append('options', optArray.join()) // Appends the options back to the new array and converts it to a string using the .join() method
    return form;
}

/** 
 * Posting the form data to the api to check the code it is given 
 * and to generate any errors that the api has found
*/
async function postForm(e) {

    const form = processOptions(new FormData(document.getElementById("checksform")));

    // Test code to see what data is being returned by the form and the api

    // for (let entry of form.entries()) {
    //     console.log(entry)
    // }

    const response = await fetch(API_URL, { // awaiting as its a async function needing the response 
        method: "POST", // Posting data to the API
        headers: {
            "Authorization": API_KEY, // The API key is used here and sent with the data to access the api
        },
        body: form, // Sending the form data to the api to be checked. From the FormData function
    });

    const data = await response.json(); // Awaiting the response from the API and converting it into JSON formatting

    if (response.ok) { // Checking if the response from the server/api is okay (200)
        displayErrors(data); 
        console.log(data)
    } else { 
        throw new Error(data.error); // Standard throwing error argument.. passing the data being responded with  
    }
}

/**
 * Displays the errors the api has found in code to the modal
 **/
function displayErrors(data) {
    let heading = `JSHint results for: ${data.file}: Response Code: ${data.status_code}` // Sets the heading of the modal to the string and the file being tested

    if (data.total_errors === 0) {
        results = `<div class="no_errors'>No Reported Errors in the code</div>`
    } else {
        results = `<div>Total Errors <span class="error_count">${data.total_errors}</span></div>`
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `
            results += `On Column <span class="column">${error.col}</span></div>` 
            results += `<div class="error">${error.error}</div>`
        }
    }

    // Using template literals - Modern Way
    document.getElementById('resultsModalTitle').innerText = heading;
    document.getElementById('results-content').innerHTML = results; // Must be HTML to display the html
    // innerText will just show it as a text document format and show all the code

    // Using the old way of declaring const's and using them to set the code - Both ways work
    // const errorTitle = document.getElementById('resultsModalTitle')
    // const errorBody = document.getElementById('results-content')

    // errorTitle.innerText = heading;
    // errorBody.innerHTML = results; 
    resultsModal.show();
}
