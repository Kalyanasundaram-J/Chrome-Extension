chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'clickButton') {
      chrome.tabs.executeScript({
        file: './/content.js'
      });
    }
});