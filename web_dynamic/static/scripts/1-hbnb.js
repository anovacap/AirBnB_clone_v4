$( document ).ready(function() {
  let ListOfIds = [];
  let ListOfNames = [];
  $('input').click(function() {
    if ($(this).is(':checked')) {
      let amenity_id = $(this).attr('data-id');
      let amenity_name = $(this).attr('data-name');
      ListOfIds.push(amenity_id);
      ListOfNames.push(amenity_name);
    } else {
      let amenity_id = $(this).attr('data-id');
      let amenity_name = $(this).attr('data-name');
      ListOfIds.pop(amenity_id);
      ListOfNames.pop(amenity_name);
    }
    $(".amenities").find("h4").css({"text-overflow": "ellipsis", "white-space": "nowrap", "overflow": "hidden"});
    $(".amenities").find("h4").html(ListOfNames.join(", "));
  })
});
