(function(){
	
	var token = '';
		
	function queryTopTracks() {
		$.ajax({
			url:'https://api.spotify.com/v1/me/top/tracks',
			headers: {"Authorization":"Bearer "+token},
			success: function (data) {
				var tracks = data.items;
				var trackIds = [];
				for(var i=tracks.length-1;i>=0;i--) {
					trackIds.push(tracks[i].id);
				}
				setTimeout(function() {
					queryRecomendations(trackIds);
				}, 0);
			}		
		});
	}
	
	function queryRecomendations(trackIds) {
		$.ajax({
			url:'https://api.spotify.com/v1/recommendations?seed_tracks='+trackIds[0],
			   headers: {
			        "Authorization":"Bearer "+token
			    },
			success: function (data) {
				var artists={};
				for(var i= data.tracks.length-1;i>=0;i--) {
					var art = data.tracks[i].artists;
					for(var j=0;j<art.length;j++) {
						artists[art[j].name]=true;
					}
				}
				alert(JSON.stringify(artists));
			},
			error: function(err) {
				alert(err);
			}
		});		
	}
	
	queryTopTracks();
})();
