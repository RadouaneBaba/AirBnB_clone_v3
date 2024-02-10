$(function() {
    const amenities = {};
    $("input[type=checkbox]").on("change", function () {

        if (this.checked)
            amenities[$(this).data('id')] = $(this).data('name');
        else 
            delete amenities[$(this).data('id')];
        $(".amenities h4").text(Object.values(amenities).join(", "));
    });

    // Get the api status
    $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
        (data.status === "OK") ? $("#api_status").addClass("available") : $("#api_status").removeClass("available");
    });

    // Search for places
    const _data = {};
    $.ajax({
        type: "POST",
        url: "http://0.0.0.0:5001/api/v1/places_search",
        data: JSON.stringify(_data),
        dataType: "json",
        contentType: "application/json",

        success: places => {
            $.each(places, (_, place) => {
                const guest_info = (place.max_guest == 1) ? "Guest" : "Guests";
                const room_info = (place.number_rooms == 1) ? "Bedroom": "Bedrooms";
                const bathroom_info = (place.number_bathrooms == 1) ? "Bathroom" : "Bathrooms";
                $("section.places").append(`
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} ${guest_info}</div>
                            <div class="number_rooms">${place.number_rooms} ${room_info}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} ${bathroom_info}</div>
                        </div>
                        
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>
                `)
            });
        }
    });
});