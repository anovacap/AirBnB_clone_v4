const apiCall = $.ajax('http://0.0.0.0:5001/api/v1/status/');
let listOfAmenities = {};

$(document).ready(function () {
  $('input:checkbox').on('change', function () {
    if (this.checked) {
      listOfAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete listOfAmenities[$(this).attr('data-id')];
    }
    console.log(Object.values(listOfAmenities));
    $('.amenities').find('h4').html(Object.values(listOfAmenities).join(', '));
  });

  $('.amenities').find('h4').css({ 'text-overflow': 'ellipsis', 'white-space': 'nowrap', 'overflow': 'hidden' });

  if (apiCall.statusText === 'OK') {
    console.log(apiCall.statusText);
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }
});
$.post({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  contentType: 'application/json',
  data: JSON.stringify({}),
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
});
