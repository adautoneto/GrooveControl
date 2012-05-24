var NowPlaying = (function() {
  var controls = $("#player_controls_playback");
  var oldState = null;
  var current = $(".queue-item-active .queueSong");

  function $current(selector) {
    return current.find(selector);
  }

  function biggerImage(url) {
    if (!url) return null;

    return url.replace('70_', '90_');
  }

  return {
    getContent: function() {
      var playback = {
        isEmptyQueue: $(".queue-item").length == 0,
        song: $current(".queueSong_name").text(),
        artist: $current(".queueSong_artist").text(),
        album: biggerImage( $current(".albumart img").attr("src") ),
      };

      var controlsAreTheSame = oldState != null && controls.get(0).isEqualNode(oldState.get(0));
      if (!controlsAreTheSame) {
        playback.controls = $("#player_controls_playback").html();
        oldState = controls.clone();
      }

      return playback;
    }
  };
});

var nowPlaying = new NowPlaying();

var port = chrome.extension.connect();
port.onMessage.addListener(function(msg){
  switch(msg.action) {
    case "clickControl":
      $("#" + msg.controlId).click();
      port.postMessage( { action: "renderPopup", data: nowPlaying.getContent() } );
      break;
    case "getContent":
      port.postMessage( { action: "renderPopup", data: nowPlaying.getContent() } );
      break;
  }
});
