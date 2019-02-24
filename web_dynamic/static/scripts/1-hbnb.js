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
});
