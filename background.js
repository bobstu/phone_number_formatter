// Background script for Phone Number Formatter extension

// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "formatPhoneNumber",
    title: "Format as Phone Number",
    contexts: ["selection"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "formatPhoneNumber") {
    // Send message to content script to format the selected text
    chrome.tabs.sendMessage(tab.id, {
      action: "formatPhoneNumber",
      text: info.selectionText
    });
  }
});

// Handle messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "formatPhoneNumber") {
    // Forward the request to the active tab's content script
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, request);
      }
    });
  }
});