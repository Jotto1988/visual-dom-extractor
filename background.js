chrome.action.onClicked.addListener((tab) => {
  // Inject the CSS
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ["styles.css"]
  });

  // Inject the Logic
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});
