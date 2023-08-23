chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    // Perform tasks when the extension is installed
    chrome.storage.local.set({ rewardCollector: "STOP" });
  } else if (details.reason === "update") {
    // Perform tasks when the extension is updated
    chrome.storage.local.set({ rewardCollector: "STOP" });
  }
});


// Listen for messages from content scripts or popup scripts
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  // Handle messages and send responses
  if (message.currentRewardPoint) {
    chrome.storage.local.set({
      currentRewardPoint: message.currentRewardPoint,
    });
  }
  // if(message.rewardPointCollectedtoday) {
  //   chrome.storage.local.set({
  //     todayCollectedPoints: message.rewardPointCollectedtoday
  //   });
  // }
  if(message.startTodayExecution && message.startTodayExecution == "True"){
    const activeTabs = await chrome.tabs.query({ active: true})
    chrome.tabs.sendMessage(activeTabs[0].id, {startTodayExecution:message.startTodayExecution}, (response) => {
      console.log("Received response from content script:", response);
    });
  }
  if(message.restartRewardCollection && message.restartRewardCollection == "True"){
    
    const activeTabs = await chrome.tabs.query({ active: true})
      // Send the message to the content script of the active tab
      chrome.tabs.sendMessage(activeTabs[0].id, {restartRewardCollection:message.restartRewardCollection}, (response) => {
        console.log("Received response from content script:", response);
      });
  }
});

