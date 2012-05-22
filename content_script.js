var NowPlaying = function() {
  var current = $(".queue-item-active .queueSong");

  function $current(selector) {
    return current.find(selector);
  }

  function biggerImage(url) {
    if (!url) return null;

    return url.replace('70_', '90_');
  }

  return {
    isEmptyQueue: $(".queue-item").length == 0,
    song: $current(".queueSong_name").text(),
    artist: $current(".queueSong_artist").text(),
    album: biggerImage( $current(".albumart img").attr("src") ),
    controls: $("#player_controls_playback").html()
  }
}

var port = chrome.extension.connect();
port.onMessage.addListener(function(msg){
  switch(msg.action) {
    case "clickControl":
      $("#" + msg.controlId).click();
      port.postMessage( {action: "renderPopup", data: new NowPlaying() } );
      break;
    case "getContent":
      port.postMessage( {action: "renderPopup", data: new NowPlaying() } );
      break;
  }
});
