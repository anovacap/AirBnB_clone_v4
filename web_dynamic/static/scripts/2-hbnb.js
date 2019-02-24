// const url = 'http://0.0.0.0:5001/api/v1/status/';


$( document ).ready(function() {
  // let dictIdName = {};
  let ListOfIds = [];
  let ListOfNames = [];
  $('input').click(function() {
    if ($(this).is(':checked')) {
      let amenity_id = $(this).attr('data-id');
      let amenity_name = $(this).attr('data-name');
      ListOfIds.push(amenity_id);
      ListOfNames.push(amenity_name);
      // dictIdName.extend(amenity_id, amenity_name);
    } else {
      let amenity_id = $(this).attr('data-id');
      let amenity_name = $(this).attr('data-name');
      ListOfIds.pop(amenity_id);
      ListOfNames.pop(amenity_name);
      // delete dictIdName.amenity_id;
    }
    $(".amenities").find("h4").css({ "text-overflow": "ellipsis", "white-space": "nowrap", "overflow": "hidden" });
    $(".amenities").find("h4").html(ListOfNames.join(", "));
  })
  // $.get(url, function (data, status) {
  //   console.log(status);
  //   if (status === 'OK') {
  //     $('#api_status').addClass('available');
    // }
    // } else {
    //   $('DIV#api_status').removeClass('available');
    // }
  // });
});
