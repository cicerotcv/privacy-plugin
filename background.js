console.log('Plugin is working');

chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (currentTabInfo) => {
    console.log(currentTabInfo);
  });
});
