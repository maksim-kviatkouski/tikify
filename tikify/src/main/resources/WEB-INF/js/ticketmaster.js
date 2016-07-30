var position;
navigator.geolocation.getCurrentPosition(showPosition)
function showPosition(pos) {
    position = pos
    // startSearch();
}

var artists = ['Cold Play', 'Metallica', 'Radiohead', 'Muse', 'Billy Talent', 'James Blake', 'M83']

var promises = []
var events = []
for (var i = 0; i < artists.length; i++) {
    promises.push(findEvent(artists[i]));
}

$.when.apply($, promises).then(function () {
    console.log('I\'m done!!!');
    console.log(events);
})


function findEvent(artist) {
    return $.ajax({
        type:"GET",
        url:"https://app.ticketmaster.com/discovery/v2/events.json?size=20&apikey=kcAtQH2DxkxkDTs9csJDrWdgPPtwOj2y&keyword=" + artist,
        async:true,
        dataType: "json",
        success: function(json) {
            console.log(json);
            events = events.concat(json._embedded.events);
        },
        error: function(xhr, status, err) {
            // This time, we do not end up here!
        }
    });
}