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
            if (text == "") {
                text += amenity;
            } else {
                text += ", " + amenity;
            }
        }
        $(".amenities h4").text(amenities_text);
    });
});