// Background script for Phone Number Formatter extension

// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  try {
    chrome.contextMenus.create({
      id: "formatPhoneNumber",
      title: "Format as Phone Number",
      contexts: ["selection"]
    });
    console.log('Phone Number Formatter: Context menu created successfully');
  } catch (error) {
    console.error('Phone Number Formatter: Error creating context menu:', error.message || error);
  }
});

// Function to inject content script when needed
async function injectContentScript(tabId) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    });
  } catch (error) {
    console.error('Phone Number Formatter: Error injecting content script:', error.message);
  }
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "formatPhoneNumber") {
    console.log('Phone Number Formatter: Context menu clicked');
    
    // Inject content script first
    await injectContentScript(tab.id);
    
    // Small delay to ensure script is loaded
    setTimeout(() => {
      chrome.tabs.sendMessage(tab.id, {
        action: "formatPhoneNumber",
        text: info.selectionText
      }).catch((error) => {
        if (error.message && error.message.includes('Receiving end does not exist')) {
          console.log('Phone Number Formatter: Content script not ready, this is normal on some pages');
        } else {
          console.warn('Phone Number Formatter: Could not send message to content script:', error.message || 'Unknown error');
        }
      });
    }, 100);
  }
});

// Handle messages from popup
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "formatPhoneNumber") {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    
    if (tabs[0]) {
      // Inject content script first
      await injectContentScript(tabs[0].id);
      
      // Small delay to ensure script is loaded
      setTimeout(() => {
        chrome.tabs.sendMessage(tabs[0].id, request).catch((error) => {
          if (error.message && error.message.includes('Receiving end does not exist')) {
            sendResponse({success: false, error: "Content script not ready"});
          } else {
            sendResponse({success: false, error: error.message || 'Unknown error'});
          }
        });
      }, 100);
    } else {
      sendResponse({success: false, error: "No active tab found"});
    }
  }
  
  return true; // Keep message channel open for async response
});