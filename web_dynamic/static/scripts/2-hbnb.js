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
    console.log(apiCall);
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }
});
