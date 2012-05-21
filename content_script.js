console.log('content scripts');
var NowPlaying = function() {
  var current = $(".active.queueSong");

  function $current(selector) {
    return current.find(selector);
  }

  return {
    isEmptyQueue: $(".queue-item").length == 0,
    song: $current(".queueSong_name").text(),
    artist: $current(".queueSong_artist").text(),
    album: $current(".albumart img").attr("src"),
    controls: $("#player_controls_playback").html()
  }
}

chrome.extension.onConnect.addListener(function(port) {
  console.log('content connected');
  port.onMessage.addListener(function(msg){
    switch(msg.action) {
      case "clickControl":
        console.log('clickControl received');
        $("#" + msg.controlId).click();
        port.postMessage( {action: "renderPopup", data: new NowPlaying() } );
        break;
      case "getContent":
        console.log('get content received');
        port.postMessage( {action: "renderPopup", data: new NowPlaying() } );
        break;
    }
  });
});
