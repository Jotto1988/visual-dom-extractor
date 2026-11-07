if (!window.domExtractorInitialized) {
    window.domExtractorInitialized = true;
    let isActive = false;
    let extractedData = [];
    let currentTarget = null;

    // 1. Build and Inject the UI Panel with SVG Header
    const panel = document.createElement('div');
    panel.id = 'dom-extractor-panel';
    panel.style.display = 'none';
    panel.innerHTML = `
        <div style="display: flex; align-items: center; border-bottom: 1px solid #444; padding-bottom: 12px; margin-bottom: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="24" height="24" style="margin-right: 10px;">
              <rect width="128" height="128" rx="24" fill="#111"/>
              <path d="M32 32h64v64H32z" stroke="#ff9900" stroke-width="6" fill="none" stroke-dasharray="12 8"/>
              <circle cx="32" cy="32" r="6" fill="#ff9900"/>
              <circle cx="96" cy="32" r="6" fill="#ff9900"/>
              <circle cx="32" cy="96" r="6" fill="#ff9900"/>
              <circle cx="96" cy="96" r="6" fill="#ff9900"/>
              <path d="M64 44v40M44 64h40" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
            </svg>
            <h3 style="margin: 0; border: none; padding: 0;">DOM Extractor</h3>
        </div>
        <ul id="extractor-data-list"></ul>
        <button id="extractor-export-btn" class="extractor-btn">Export JSON</button>
        <button id="extractor-webhook-btn" class="extractor-btn">Send to Webhook</button>
        <button id="extractor-close-btn" class="extractor-btn secondary">Close & Reset</button>
    `;
    document.body.appendChild(panel);

    const listEl = document.getElementById('extractor-data-list');

    // 2. State Management
    window.toggleExtractor = function() {
        isActive = !isActive;
        panel.style.display = isActive ? 'block' : 'none';
        if (!isActive) clearHighlight();
    };

    // 3. Hover Tracking
    function handleMouseOver(e) {
        if (!isActive || panel.contains(e.target)) return;
        
        clearHighlight();
        currentTarget = e.target;
        currentTarget.classList.add('dom-extractor-highlight');
    }

    function clearHighlight() {
        if (currentTarget) {
            currentTarget.classList.remove('dom-extractor-highlight');
            currentTarget = null;
        }
    }

    // 4. Click Interception & Extraction
    function handleClick(e) {
        if (!isActive || panel.contains(e.target)) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const dataObj = {
            tag: e.target.tagName.toLowerCase(),
            id: e.target.id || null,
            classes: Array.from(e.target.classList).filter(c => c !== 'dom-extractor-highlight'),
            text: e.target.innerText.trim().substring(0, 150) + (e.target.innerText.length > 150 ? '...' : ''),
            timestamp: new Date().toISOString()
        };
        
        extractedData.push(dataObj);
        
        const li = document.createElement('li');
        li.innerText = `<${dataObj.tag}> ${dataObj.text || '[No text]'}`;
        listEl.appendChild(li);
    }

    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('click', handleClick, true);

    // 5. Button Actions
    document.getElementById('extractor-close-btn').addEventListener('click', () => {
        window.toggleExtractor();
        extractedData = [];
        listEl.innerHTML = '';
    });

    document.getElementById('extractor-export-btn').addEventListener('click', () => {
        if (extractedData.length === 0) return alert("No data extracted yet.");
        const blob = new Blob([JSON.stringify(extractedData, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'extracted_dom_data.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    document.getElementById('extractor-webhook-btn').addEventListener('click', async () => {
        if (extractedData.length === 0) return alert("No data extracted yet.");
        
        const webhookUrl = prompt("Enter target Webhook/API URL:");
        if (!webhookUrl) return;
        
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-BUG-BOUNTY': 'forgevertical'
                },
                body: JSON.stringify({ extracted_elements: extractedData })
            });
            
            if (response.ok) {
                alert('Payload sent successfully.');
            } else {
                alert(`Server returned: ${response.status}`);
            }
        } catch (error) {
            alert('Error sending webhook: ' + error.message);
        }
    });
}

window.toggleExtractor();
