var update = function(details) {
  var id = details.id;
  var index = details.index;
  var title = details.title;

  tabNum = index + 1;
  new_title = tabNum + '. ' + title.replace(/(\d+\.) ?\s/i, "");

  try {
    chrome.tabs.executeScript(
      id,
      {
        code : "document.title = '" + new_title + "';"
      }
    );
  } catch(e) {}
};


function updateAll() {
  chrome.tabs.query({}, function(tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      update(tab);
    }
  });
}

chrome.tabs.onMoved.addListener(function(id) {
  updateAll();
});

chrome.tabs.onRemoved.addListener(function(id) {
  updateAll();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete')
    update(tab);
});

updateAll();
