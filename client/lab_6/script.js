function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin);
  // The maximum is inclusive and the minimum is inclusive
}

function dataHandler(dataArray) {
  console.log('fired dataHandler');
  console.table(dataArray);
  const range = [...Array(15).keys()];
  range.forEach((item) => {
    console.log('range item', item);
  });
}
async function mainEvent() { // the async keyword means we can make API requests
  console.log('script loaded'); // this is substituting for a 'breakpoint'
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('.submit_button');
  submit.style.display = 'none'; // it's better not to display this until the data has loaded

  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  if (arrayFromJson.data.length > 0) {
    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      console.log('form submission'); // this is substituting for a "breakpoint"
      submit.style.display = 'block';
      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need
      dataHandler(arrayFromJson.data);
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
