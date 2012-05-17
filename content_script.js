var port = chrome.extension.connect();

function getInfo() {		
	if ($(".queue-item").length == 0)
		return null;
	
	var info = {		
		userName: $(".user_username").text(),
		playing: {
			song: $("#playerDetails_nowPlaying .song").text(),
			artist: $("#playerDetails_nowPlaying .artist").text(),
			album: $("#playerDetails_nowPlaying .album").text()
		},		
		getQueue: function(){
			var items = [];
			$(".queue-item").each(function(i, item) {
				
			});
		}
	};
	
	return info;
}

function getControls(){
	return $("#player_controls_playback").html();
}

port.postMessage( {action: "setSong", data: getInfo()} );
port.postMessage( {action: "setControls", data: getControls() });

port.onMessage.addListener(function(msg){	
	switch(msg.action) {
		case "clickControl":
			console.log(msg);
			$("#" + msg.controlId).click();
			port.postMessage( {action: "setSong", data: getInfo()} );
			break;
		case "getControls":
			port.postMessage( {action: "setControls", data: getControls()} );
			break;
	}		
});