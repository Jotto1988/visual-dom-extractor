# Visual DOM Extractor 🎯

A lightweight, zero-dependency browser extension that lets you visually select elements on any webpage and extract them into clean JSON data. 

Say goodbye to wrestling with complex CSS selectors or setting up bloated Python/Node.js web scrapers just to pull a few lines of text. This runs entirely in your browser using vanilla JavaScript.

## Features
* **Point & Click Extraction:** Hover over any element to highlight it, and click to extract its tag, ID, classes, and text.
* **Zero Dependencies:** No `npm install`, no heavy frameworks, no cloud backend required.
* **Instant JSON Exports:** Download your extracted data locally as a `.json` file with one click.
* **Webhook Integration:** Send your extracted payload directly to an API or webhook endpoint.
* **Bounty/Recon Friendly:** Automatically injects custom HTTP headers (`X-BUG-BOUNTY: forgevertical`) into webhook payloads.

## How to Install (For Beginners)
Because this is an open-source developer tool, you won't install it from the Web Store. You will load it as an "unpacked" extension. It takes 10 seconds:

1. **Download the Code:** Click the green **Code** button at the top of this repository and select **Download ZIP**. Extract the ZIP file to a folder on your computer.
2. **Open Extensions:** Open your Chromium-based browser (Brave, Chrome, or Edge) and navigate to the extensions page:
   * **Brave:** `brave://extensions/`
   * **Chrome:** `chrome://extensions/`
3. **Enable Developer Mode:** Toggle the **Developer mode** switch in the top right corner of the page.
4. **Load the Extension:** Click the **Load unpacked** button that appears in the top left.
5. **Select the Folder:** Choose the folder you extracted in Step 1. 

*Tip: Click the "puzzle piece" icon in your browser toolbar and "pin" the DOM Extractor so you can access it easily!*

## How to Use It
1. Navigate to the webpage you want to extract data from.
2. Click the **Visual DOM Extractor** icon in your browser toolbar. A floating control panel will appear.
3. Move your mouse around the page. Elements will highlight in orange.
4. Click any highlighted element to capture it. It will instantly appear in your control panel list.
5. When you are done, click **Export JSON** to save the file to your computer, or **Send to Webhook** to push the data to your server.
6. Click **Close & Reset** to hide the panel and clear the memory.

## Files Included
* `manifest.json` - The extension configuration.
* `background.js` - Service worker to inject the script when clicked.
* `content.js` - The core extraction logic and UI builder.
* `styles.css` - Custom styling for the highlights and panel.
* `icon.svg` / `icon128.png` - The toolbar and panel icons.

## License
MIT License. Feel free to use, modify, and distribute this tool however you like!
