const apiCall = $.ajax('http://0.0.0.0:5001/api/v1/status/');
let listOfAmenities = {};
let listOfStates = {};
let listOfCities = {};

$(document).ready(function () {

  // Create a dictionary with Amenities ids and names
  $('.amenities').find('input:checkbox').on('change', function () {
    if (this.checked) {
      listOfAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete listOfAmenities[$(this).attr('data-id')];
    }
    $('.amenities').find('h4').html(Object.values(listOfAmenities).join(', '));
  });

  // Display the list of Amenities names in h4
  $('.amenities').find('h4').css({ 'text-overflow': 'ellipsis', 'white-space': 'nowrap', 'overflow': 'hidden' });

  // Create a dictionary with location ids and names
  $('.locations').find('h2').find('input:checkbox').on('change', function () {
    if (this.checked) {
      listOfStates[$(this).attr('data-id')] = $(this).attr('data-name');
      console.log($(this).attr('data-id'), $(this).attr('data-name'));
    } else {
      delete listOfStates[$(this).attr('data-id')];
    }
    let states;
    if (Object.values(listOfStates).length === 0) {
      states = [];
    } else {
      states = Object.values(listOfStates);
    }
    let cities;
    if (Object.values(listOfCities).length === 0) {
      cities = [];
    } else {
      cities = Object.values(listOfCities);
    }
    let myArray = [];
    for (let i = 0, j = states.length; i < j; i++) {
      myArray.push(states[i]);
      myArray.push(cities[i]);
    }
    $('.locations').find('h4').html(myArray.join(', '));
  });
  $('.locations').find('h4').css({ 'text-overflow': 'ellipsis', 'white-space': 'nowrap', 'overflow': 'hidden' });

  $('.locations').find('li').find('input:checkbox').on('change', function () {
    console.log('cities');
    if (this.checked) {
      listOfCities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete listOfCities[$(this).attr('data-id')];
    }
    console.log(listOfCities);
  });

  // Check status of API
  if (apiCall.statusText === 'OK') {
    console.log(apiCall.statusText);
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }

  // Retrieve Places
  let searchPlaces = function (dictionary = {} ) {
    $.post({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify(dictionary),
      dataType: 'json',
      success: function (result) {
	for (let place of result) {
	  $('.places').append(`<article>
			      <div class= "title" >
			      <h2>${place.name}</h2>
			      <div class="price_by_night">
			      ${place.price_by_night}
			      </div>
			      </div >
			      <div class="information">
			      <div class="max_guest">
			      <i class="fa fa-users fa-3x" aria-hidden="true"></i>
			      <br />
			      ${place.max_guest} Guests
			      </div>
			      <div class="number_rooms">
			      <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
			      <br />
			      ${place.number_rooms} Bedrooms
			      </div>
			      <div class="number_bathrooms">
			      <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
			      <br />
			      ${place.number_bathrooms} Bathroom
			      </div>
			      </div>
			      <!-- **********************
			      USER
			      **********************  -->
			      <div class="user">
			      </div>
			      <div class="description">
			      ${place.description}
			      </div>
			      </article>`);
	}
      }
    })
  };
  searchPlaces();

  // Search Places and filter by Amenities
  $("button").click(function() {
    $('.places').empty();
    $('.locations').empty();
    searchPlaces({
      "amenities": Object.getOwnPropertyNames(listOfAmenities),
      "states": Object.getOwnPropertyNames(listOfStates),
      "cities": Object.getOwnPropertyNames(listOfCities)
    });
  });
});
