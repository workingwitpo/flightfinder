
function captureForm(event) {

  event.preventDefault(); // prevent form from submitting normally
  const form = document.getElementById('captureForm');

  
    const from = document.getElementById('From').value.trim();
    const to = document.getElementById('To').value.trim();
    const departDate = document.getElementById('DepartDate').value.trim();
    const returnDate = document.getElementById('ReturnDate').value.trim();

    if (from === '' || to === '' || departDate === '' || returnDate === '') {
      alert('Please fill in all required fields.');
      return; // stop function if any field is empty
    }

    const formData = new FormData(form);
    /*for (const [name, value] of formData.entries()) {
      console.log(`${name}: ${value}`);
    }
  });*/

  // Call another function with the formData object as a parameter
  submitForm(formData);
  };



function submitForm(formData) {
  // Access the form data values here
  const from = formData.get('From');
  const to = formData.get('To');
  const departDate = formData.get('DepartDate');
  const returnDate = formData.get('ReturnDate');

  // Do something with the form data values
  getFlightData(from,to,departDate,returnDate);
}



async function getFlightData(from, to, departDate,returnDate) {
  const url = `https://skyscanner44.p.rapidapi.com/search?adults=1&origin=${from}&destination=${to}&departureDate=${departDate}&returnDate=${returnDate}&cabinClass=economy&currency=USD&locale=en-US&market=US`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5741b94660msh0344158c3671db6p1746f2jsn545e4940886c',
      'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const bestFlightLink = result.itineraries.buckets[0].items[0].deeplink;
    const displayResults = document.getElementById('results');
    displayResults.innerHTML = bestFlightLink;
  } catch (error) {
    console.error(error);
  }
}
