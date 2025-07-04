// Popup script for Phone Number Formatter extension

document.addEventListener('DOMContentLoaded', () => {
  const formatBtn = document.getElementById('formatBtn');
  
  // Handle format button click
  formatBtn.addEventListener('click', () => {
    // Send message to background script to format phone number
    chrome.runtime.sendMessage({
      action: "formatPhoneNumber"
    });
    
    // Close popup after clicking
    window.close();
  });
  
  // Check if there's selected text on the current page
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "checkSelection"}, (response) => {
        if (chrome.runtime.lastError) {
          // Content script might not be loaded yet
          console.log('Content script not ready');
        } else if (response && response.hasSelection) {
          formatBtn.textContent = 'Format Selected Text';
        } else {
          formatBtn.textContent = 'Select Text First';
          formatBtn.disabled = true;
        }
      });
    }
  });
});

// Listen for keyboard shortcuts in popup
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
    e.preventDefault();
    document.getElementById('formatBtn').click();
  }
});