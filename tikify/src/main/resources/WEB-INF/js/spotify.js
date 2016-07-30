(function(){
	
	var token = 'BQCDmBWoJWZH7vf1eV93f0h2BJYObAfSKz1sJ075_XuHoGJ42wlWR-_fQyUAq1KmFI2ZuCiDdRGvoyhxiKDH8NTiLpOzNriEkrhlcXhn-JxC-7nVHVcbt4nvPADK1YH31xRkgvq4eNZBXhKVeUrLgg84w7HFe1qXTCkIbuM0R6_rbK5hNGyjwA2KpcfitH1QvGllzNJGGiQogbIwD37WD18BR2Qma3y46MTummiTLASNHUg5zEDBbX6qMANEXrfVjFkplOwnwAk5R0fMPsy0ivZbtSTDGIqcM-dDCrv4yscfsAD5Jodxd7ho';
		
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
				setTimeout(function(){
                    fillUiEvents(artists);
                }, 0)
			},
			error: function(err) {
				alert(err);
			}
		});		
	}
	
	queryTopTracks();
})();
