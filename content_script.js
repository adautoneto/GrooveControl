var NowPlaying = function() {
  if ($(".queue-item").length == 0)
	  return null;

  var current = $(".active.queueSong");

  function $current(selector) {
    return current.find(selector);
  }

  return {
    song: $current(".queueSong_name").text(),
    artist: $current(".queueSong_artist").text(),
    album: $current(".albumart img").attr("src"),
    controls: $("#player_controls_playback").html()
  }
}

var nowPlaying = new NowPlaying();
var port = chrome.extension.connect();
port.postMessage( {action: "initialize", data: nowPlaying } );

//port.postMessage( {action: "setSong", data: getInfo()} );
//port.postMessage( {action: "setControls", data: getControls() });

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
