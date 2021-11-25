'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  //load the text returned by this route and put it into the #fortune-text div. You should use fetch()
  fetch('/fortune')
  .then(response => response.text())
  .then(responseData => {
    document.querySelector('#fortune-text').innerHTML = responseData;
  });
}

//innerText -> the fortune works but it is returned literally, showing "Your day ahead will be <b>full of while loops</b>."
//innerHTML -> shows fortune with the <b></b> & other tags properly used

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);




// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;
  // if (zipcode in WEATHER){
  //   const forecast = jsonify(WEATHER[zipcode]['forecast']);
  // }
  //js file doesnt have access to WEATHER, that is py file only

  // TODO: request weather with that URL and show the forecast in #weather-info
  fetch(`${url}?zipcode=${zipcode}`)
    .then(response => response.json())
    .then(responseData =>{
      document.querySelector('#weather-info').innerHTML = responseData.forecast;
    })
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// weather.json = {temp: TEMP, forecast: FORECAST}
// weather[zipcode][forecast] <- what we want to return as responseData

//@app.route("/delivery-info.json")
// def get_delivery_info():
// city = request.args.get("city")
// if city in CITY_DELIVERY_INFO:
//     return jsonify(CITY_DELIVERY_INFO[city])

// @app.route("/tuition.json")
// def get_tuition():
//     """Return information about tuition as JSON."""
//     return jsonify({"tuition": 1000})


// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const melon = document.querySelector('#melon-type-field').value;
  const qty = document.querySelector('#qty-field').value;
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)

  //to make it show up in red, set the text(responseData.msg) to class=order-error (.classList.add(order-error))
  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs), //<-??? why use stringify & is formInputs the correct parameter?
    headers: {
    'Content-Type': 'application/json', //<-??? how to fill in Content-Type?
    },
  })
  .then(response => response.json())
  .then(responseData => {
    if (responseData.code === 'OK') {
      document.querySelector('#order-status').innerHTML = `${responseData.msg}`;
    } 
    else {
      document.querySelector('#order-status').classList.add('order-error');
      document.querySelector('#order-status').innerHTML = `${responseData.msg}`;
    }
  }
}

//   if (responseData.code === 'OK') {
//     document.querySelector('#order-status').innerHTML = `${responseData.msg}`;
//   } else {
//     document.querySelector('#order-status').classList.add('order-error');
//     document.querySelector('#order-status').innerHTML = `${responseData.msg}`;
//   }

document.querySelector('#order-form').addEventListener('submit', orderMelons);
