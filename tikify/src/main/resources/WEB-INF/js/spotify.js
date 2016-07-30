var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('BQD4dKIkqsKZ2JQN6RvzzJFA-giTz8oX9MimnKHz1LSQlxOchHDEMxL2tZVQCTP83QYFLzss0td4-K6XMbSp0A');
spotifyApi.getMySavedTracks({limit: 100}, function(err, data){
    if (err) console.error(err)
    else {
        alert(data);
    }
});