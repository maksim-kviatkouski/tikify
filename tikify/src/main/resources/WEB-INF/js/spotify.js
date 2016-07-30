var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('BQDg7USwIQCHy3e91VAPdxYOls0cp99xDHhy6efqaB_jc9dr1yRPXBSA5g2O_UFe1FnmAT51Z4nQARBW3fpgRbNNzocN_g');
spotifyApi.getMySavedTracks({limit: 100}, function(err, data){
    if (err) console.error(err)
    else {
        alert(data);
    }
});