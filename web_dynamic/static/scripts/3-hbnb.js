$(function() {
    const amenities = {};
    $("input[type=checkbox]").on("change", function () {


        if (this.checked) {
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
      function get_places (filter_object) {
        $.post('http://0.0.0.0:5001/api/v1/places_search', filter_object, function (response) {
        let places_articles = "";
        for (const place of response) {
            const added_place = `<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
            </div>
            <div class="description">
              ${ place.description}
            </div>
          </article>`
          places_articles += added_place;
        }
        $('section.places').html(places_articles);
    }, 'json');
      };
    get_places({})
    $('button').on('click', get_places({amenities: Object.keys(amenities)}));
});