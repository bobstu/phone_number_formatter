// Content script for Phone Number Formatter extension

// International phone number patterns and formatting rules
const phoneFormats = {
  // North America (US, Canada) - Country code 1
  '1': {
    pattern: /^1(\d{10})$/,
    format: (match) => `+1 ${match[1].slice(0, 3)}-${match[1].slice(3, 6)}-${match[1].slice(6, 10)}`,
    minLength: 11,
    maxLength: 11
  },
  
  // UK - Country code 44
  '44': {
    pattern: /^44(\d{10,11})$/,
    format: (match) => {
      const num = match[1];
      if (num.length === 10) {
        return `+44 ${num.slice(0, 4)} ${num.slice(4, 7)} ${num.slice(7, 10)}`;
      } else {
        return `+44 ${num.slice(0, 4)} ${num.slice(4, 7)} ${num.slice(7, 11)}`;
      }
    },
    minLength: 13,
    maxLength: 14
  },
  
  // Germany - Country code 49
  '49': {
    pattern: /^49(\d{10,12})$/,
    format: (match) => {
      const num = match[1];
      return `+49 ${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6)}`;
    },
    minLength: 12,
    maxLength: 14
  },
  
  // France - Country code 33
  '33': {
    pattern: /^33(\d{9})$/,
    format: (match) => {
      const num = match[1];
      return `+33 ${num.slice(0, 1)} ${num.slice(1, 3)} ${num.slice(3, 5)} ${num.slice(5, 7)} ${num.slice(7, 9)}`;
    },
    minLength: 11,
    maxLength: 11
  },
  
  // Japan - Country code 81
  '81': {
    pattern: /^81(\d{10,11})$/,
    format: (match) => {
      const num = match[1];
      if (num.length === 10) {
        return `+81 ${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6, 10)}`;
      } else {
        return `+81 ${num.slice(0, 3)} ${num.slice(3, 7)} ${num.slice(7, 11)}`;
      }
    },
    minLength: 12,
    maxLength: 13
  },
  
  // Australia - Country code 61
  '61': {
    pattern: /^61(\d{9})$/,
    format: (match) => {
      const num = match[1];
      return `+61 ${num.slice(0, 1)} ${num.slice(1, 5)} ${num.slice(5, 9)}`;
    },
    minLength: 11,
    maxLength: 11
  },
  
  // China - Country code 86
  '86': {
    pattern: /^86(\d{11})$/,
    format: (match) => {
      const num = match[1];
      return `+86 ${num.slice(0, 3)} ${num.slice(3, 7)} ${num.slice(7, 11)}`;
    },
    minLength: 13,
    maxLength: 13
  },
  
  // India - Country code 91
  '91': {
    pattern: /^91(\d{10})$/,
    format: (match) => {
      const num = match[1];
      return `+91 ${num.slice(0, 5)} ${num.slice(5, 10)}`;
    },
    minLength: 12,
    maxLength: 12
  },
  
  // Brazil - Country code 55
  '55': {
    pattern: /^55(\d{10,11})$/,
    format: (match) => {
      const num = match[1];
      if (num.length === 10) {
        return `+55 ${num.slice(0, 2)} ${num.slice(2, 6)} ${num.slice(6, 10)}`;
      } else {
        return `+55 ${num.slice(0, 2)} ${num.slice(2, 7)} ${num.slice(7, 11)}`;
      }
    },
    minLength: 12,
    maxLength: 13
  },
  
  // Mexico - Country code 52
  '52': {
    pattern: /^52(\d{10})$/,
    format: (match) => {
      const num = match[1];
      return `+52 ${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6, 10)}`;
    },
    minLength: 12,
    maxLength: 12
  }
};

// Function to detect and format international phone numbers
function formatAsPhoneNumber(text) {
  // Remove all non-digit characters
  const digits = text.replace(/\D/g, '');
  
  if (digits.length === 0) {
    return text; // Return original text if no digits found
  }
  
  // Try to match international formats first
  for (const [countryCode, format] of Object.entries(phoneFormats)) {
    if (digits.length >= format.minLength && digits.length <= format.maxLength) {
      const match = digits.match(format.pattern);
      if (match) {
        return format.format(match);
      }
    }
  }
  
  // Handle US/Canada numbers without country code
  if (digits.length === 10) {
    // Format as xxx-xxx-xxxx (US/Canada domestic format)
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  } else if (digits.length === 11 && digits[0] === '1') {
    // Format as +1 xxx-xxx-xxxx (US/Canada with country code)
    return `+1 ${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7, 11)}`;
  } else if (digits.length === 7) {
    // Format as xxx-xxxx (local number)
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}`;
  }
  
  // Generic international format for unrecognized patterns
  if (digits.length > 11) {
    // Assume it's international: +CC XXX XXX XXXX
    const countryCode = digits.slice(0, -10);
    const number = digits.slice(-10);
    return `+${countryCode} ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 10)}`;
  } else if (digits.length > 7) {
    // Generic formatting for medium-length numbers
    const groups = [];
    let remaining = digits;
    
    // Split into groups of 3-4 digits
    while (remaining.length > 0) {
      if (remaining.length <= 4) {
        groups.push(remaining);
        break;
      } else {
        groups.push(remaining.slice(0, 3));
        remaining = remaining.slice(3);
      }
    }
    
    return groups.join('-');
  } else {
    // For short numbers, just add basic formatting
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
  }
}

// Function to replace selected text
function replaceSelectedText(newText) {
  const selection = window.getSelection();
  
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    // Check if we're in an input or textarea
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      
      if (start !== end) {
        const value = activeElement.value;
        activeElement.value = value.substring(0, start) + newText + value.substring(end);
        
        // Restore cursor position
        activeElement.selectionStart = start;
        activeElement.selectionEnd = start + newText.length;
        activeElement.focus();
      }
    } else if (range.startContainer === range.endContainer && range.startContainer.nodeType === Node.TEXT_NODE) {
      // Handle regular text selection
      const textNode = range.startContainer;
      const beforeText = textNode.textContent.substring(0, range.startOffset);
      const afterText = textNode.textContent.substring(range.endOffset);
      
      textNode.textContent = beforeText + newText + afterText;
      
      // Restore selection on the new text
      const newRange = document.createRange();
      newRange.setStart(textNode, range.startOffset);
      newRange.setEnd(textNode, range.startOffset + newText.length);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      // Handle complex selections (multiple nodes)
      range.deleteContents();
      range.insertNode(document.createTextNode(newText));
      
      // Select the newly inserted text
      const newRange = document.createRange();
      newRange.selectNode(range.startContainer.nextSibling || range.startContainer);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
    
    // Show notification
    showNotification(`Formatted: ${newText}`);
  }
}

// Function to show temporary notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transition: opacity 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "formatPhoneNumber") {
    const selection = window.getSelection();
    
    if (selection.rangeCount > 0 && selection.toString().trim()) {
      const selectedText = selection.toString();
      const formattedText = formatAsPhoneNumber(selectedText);
      replaceSelectedText(formattedText);
    } else {
      showNotification("Please select some text first!");
    }
  }
});

// Add keyboard shortcut listener (Ctrl+Shift+P or Cmd+Shift+P)
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
    e.preventDefault();
    
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && selection.toString().trim()) {
      const selectedText = selection.toString();
      const formattedText = formatAsPhoneNumber(selectedText);
      replaceSelectedText(formattedText);
    } else {
      showNotification("Please select some text first!");
    }
  }
});