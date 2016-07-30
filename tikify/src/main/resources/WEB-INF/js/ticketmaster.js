var artists = ['Cold Play', 'Metallica', 'Radiohead', 'Muse', 'Billy Talent', 'James Blake', 'M83']

var promises = []
var events = []
var ui_events = []
for (var i = 0; i < artists.length; i++) {
    promises.push(findEvent(artists[i]));
}

$.when.apply($, promises).then(function () {
    console.log('I\'m done!!!');
    for (var i = 0; i < events.length; i++) {
        e = events[i]
        ui_events.push({
            tmlink: e.url,
            image: e.images[0],
            eventdate: e.dates.start.dateTime,
            eventname: e.name,
            genre: e.classifications ? e.classifications[0].genre.name : ''
        })
    }
    ui_events.sort(function (a, b) {
        _a = new Date(a.eventdate);
        _b = new Date(b.eventdate);
        return _a.getTime() - _b.getTime();
    })
    console.log(ui_events);
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