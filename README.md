# Phone Number Formatter Chrome Extension

A Chrome extension that formats selected text as phone numbers in the xxx-xxx-xxxx format, inspired by the "Change Case" extension.

## Features

- **Context Menu Integration**: Right-click on selected text and choose "Format as Phone Number"
- **Keyboard Shortcut**: Use `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) to format selected text
- **International Phone Number Support**: Recognizes and formats phone numbers from multiple countries
- **Supported Countries**: 
  - 🇺🇸 United States (+1) → `+1 123-456-7890`
  - 🇨🇦 Canada (+1) → `+1 123-456-7890`
  - 🇬🇧 United Kingdom (+44) → `+44 1234 567 890`
  - 🇩🇪 Germany (+49) → `+49 123 456 7890`
  - 🇫🇷 France (+33) → `+33 1 23 45 67 89`
  - 🇯🇵 Japan (+81) → `+81 123 456 7890`
  - 🇦🇺 Australia (+61) → `+61 1 2345 6789`
  - 🇨🇳 China (+86) → `+86 123 4567 8901`
  - 🇮🇳 India (+91) → `+91 12345 67890`
  - 🇧🇷 Brazil (+55) → `+55 12 3456 7890`
  - 🇲🇽 Mexico (+52) → `+52 123 456 7890`
- **Smart Detection**: Automatically detects country codes and applies appropriate formatting
- **Generic Formatting**: Handles unrecognized international numbers with basic formatting
- **Works Everywhere**: Compatible with input fields, textareas, and editable content
- **Visual Feedback**: Shows notification when formatting is applied

## Installation

### Method 1: Load as Unpacked Extension (Developer Mode)

1. **Download the extension files**:
   - Save all the provided files in a folder on your computer
   - Create an `icons` folder and add icon files (or use placeholder icons)

2. **Open Chrome Extensions**:
   - Go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)

3. **Load the extension**:
   - Click "Load unpacked"
   - Select the folder containing your extension files
   - The extension should now appear in your extensions list

### Method 2: Create Icons (Optional)

Create simple icon files or use online icon generators:
- `icons/icon16.png` (16x16 pixels)
- `icons/icon48.png` (48x48 pixels)  
- `icons/icon128.png` (128x128 pixels)

## Usage

### Method 1: Context Menu
1. Select text containing numbers (e.g., "1234567890")
2. Right-click on the selected text
3. Choose "Format as Phone Number" from the context menu
4. The text will be replaced with formatted phone number (e.g., "123-456-7890")

### Method 2: Keyboard Shortcut
1. Select text containing numbers
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. The selected text will be formatted automatically

### Method 3: Extension Popup
1. Click the extension icon in the toolbar
2. Select text on the page first
3. Click "Format Selection" button in the popup

## Examples

### Domestic US/Canada Numbers
| Input | Output |
|-------|--------|
| `1234567890` | `123-456-7890` |
| `11234567890` | `+1 123-456-7890` |
| `1234567` | `123-4567` |
| `(123) 456-7890` | `123-456-7890` |

### International Numbers
| Input | Output | Country |
|-------|--------|---------|
| `441234567890` | `+44 1234 567 890` | UK |
| `4912345678901` | `+49 123 456 7890` | Germany |
| `33123456789` | `+33 1 23 45 67 89` | France |
| `8112345678901` | `+81 123 456 7890` | Japan |
| `61123456789` | `+61 1 2345 6789` | Australia |
| `8612345678901` | `+86 123 4567 8901` | China |
| `911234567890` | `+91 12345 67890` | India |
| `5512345678901` | `+55 12 3456 7890` | Brazil |
| `521234567890` | `+52 123 456 7890` | Mexico |

### Already Formatted Numbers
| Input | Output |
|-------|--------|
| `+44 20 1234 5678` | `+44 2012 345 678` |
| `+1 (555) 123-4567` | `+1 555-123-4567` |
| `+49 30 12345678` | `+49 301 234 5678` |

## File Structure

```
phone-number-formatter/
├── manifest.json          # Extension configuration
├── background.js          # Service worker (background script)
├── content.js            # Content script (runs on web pages)
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension format)
- **Permissions**: `activeTab`, `contextMenus`
- **Content Script**: Runs on all URLs to handle text selection and formatting
- **Background Script**: Manages context menu and message passing
- **Privacy**: No data is collected or transmitted - all processing happens locally

## Troubleshooting

### Extension Not Working
- Make sure Developer Mode is enabled in Chrome
- Check that all files are in the correct folder structure
- Reload the extension from `chrome://extensions/`

### Formatting Not Applied
- Ensure text is properly selected before using the extension
- The extension only works on text containing digits
- Try refreshing the page and trying again

### Context Menu Not Appearing
- Make sure you have text selected when right-clicking
- Check that the extension has the `contextMenus` permission

## Development

To modify or extend the extension:

1. Edit the relevant files (`content.js` for formatting logic, `popup.html` for UI)
2. Go to `chrome://extensions/`
3. Click the refresh button on your extension
4. Test your changes

## License

This project is open source and available under the MIT License.

## Credits

Inspired by the "Change Case" Chrome extension by Bartosz Lorek.