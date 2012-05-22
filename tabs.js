chrome.windows.getAll({populate: true}, function(windows){
  var tab = null;

  for(var w in windows) {
    var tabs = windows[w].tabs;
    for (var t in tabs) {
      if (tabs[t].title.match(/grooveshark/i)) {
        tab = tabs[t];
      }
    }
  }

  if (tab == null)
    chrome.tabs.create({url: "http://grooveshark.com/"}, function(tab){
      insertScripts(tab.id);
    });
  else {
    insertScripts(tab.id);
  }
});

function insertScripts(tabId) {
  chrome.tabs.executeScript(tabId, {file: "lib/jquery-1.7.2.min.js"});
  chrome.tabs.executeScript(tabId, {file: "content_script.js"});
}
