var NowPlaying = function() {
  var current = $(".active.queueSong");

  function $current(selector) {
    return current.find(selector);
  }

  return {
    isEmptyQueue: $(".queue-item").length == 0,
    song: $current(".queueSong_name").text(),
    artist: $current(".queueSong_artist").text(),
    album: $current(".albumart img").attr("src").replace('70_', '90_'), // get the bigger size
    controls: $("#player_controls_playback").html()
  }
}

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg){
    switch(msg.action) {
      case "clickControl":
        $("#" + msg.controlId).click();
        port.postMessage( {action: "renderPopup", data: new NowPlaying() } );
        break;
      case "getContent":
	console.log('render popup from content_script');
        port.postMessage( {action: "renderPopup", data: new NowPlaying() } );
        break;
    }
  });
});
