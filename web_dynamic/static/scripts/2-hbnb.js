$(function() {
    const amenities = {};
    $("input[type=checkbox]").on("change", function () {
        if ($(this).is(":checked")) {
            amenities[$(this).data('id')] = $(this).data('name');
        }
        else {
            delete amenities[$(this).data('id')];
        }


        amenities_text = "";
        for (const amenity of Object.values(amenities)) {
            if (amenities_text == "") {
                amenities_text += amenity;
            } else {
                amenities_text += ", " + amenity;
            }
        }
        $(".amenities h4").text(amenities_text);
    });

    $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === "OK") {
            $("#api_status").addClass("available");
        }
        else {
            $("#api_status").removeClass("available");
        }
      });
});