document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('clickButton');
    
    button.addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'clickButton' });
      });
    });
  });