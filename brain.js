// brain.js

const toolsByEvent = {
    "Podcasts": [
        { name: "Tripod", pin: "1111", present: false },
        { name: "Wide Camera", pin: "2222", present: false },
        { name: "Light 1", pin: "3331", present: false },
        { name: "Light 2", pin: "3332", present: false },
        { name: "Silver Stand 1", pin: "4441", present: false },
        { name: "Silver Stand 2", pin: "4442", present: false },
        { name: "Rodecaster", pin: "5555", present: false }
    ],
    
    "Event Photoshoots": [
        { name: "DSLR Camera", pin: "6666", present: false },
        { name: "Studio Lights", pin: "7777", present: false },
        { name: "Softbox", pin: "8888", present: false },
        { name: "Reflector", pin: "9999", present: false },
        { name: "Light Stand", pin: "1010", present: false },
        { name: "Backdrop Stand", pin: "2020", present: false },
        { name: "Backdrop", pin: "3030", present: false }
    ],

    "Home Indoor Photoshoots": [
        { name: "Camera", pin: "4040", present: false },
        { name: "Ring Light", pin: "5050", present: false },
        { name: "Portable Tripod", pin: "6060", present: false },
        { name: "Lighting Umbrella", pin: "7070", present: false },
        { name: "Backdrop", pin: "8080", present: false },
        { name: "Phone Stand", pin: "9090", present: false },
        { name: "Extension Cable", pin: "1001", present: false }
    ],

    "Outdoor Events": [
        { name: "Action Camera", pin: "1100", present: false },
        { name: "GoPro Tripod", pin: "1200", present: false },
        { name: "Portable Lights", pin: "1300", present: false },
        { name: "Camera", pin: "1400", present: false },
        { name: "Wireless Microphone", pin: "1500", present: false },
        { name: "Portable Charger", pin: "1600", present: false },
        { name: "Backup Battery", pin: "1700", present: false }
    ],

    "Masterclasses": [
        { name: "Laptop", pin: "1800", present: false },
        { name: "Projector", pin: "1900", present: false },
        { name: "Whiteboard", pin: "2000", present: false },
        { name: "Speaker System", pin: "2100", present: false },
        { name: "Camera", pin: "2200", present: false },
        { name: "Wireless Mic", pin: "2300", present: false },
        { name: "Presenter Clicker", pin: "2400", present: false }
    ],

    "Family Gatherings": [
        { name: "Family Camera", pin: "2500", present: false },
        { name: "Video Camera", pin: "2600", present: false },
        { name: "Portable Lighting", pin: "2700", present: false },
        { name: "Tripod", pin: "2800", present: false },
        { name: "Tabletop Lights", pin: "2900", present: false },
        { name: "Backdrop", pin: "3000", present: false },
        { name: "Extension Cord", pin: "3100", present: false }
    ]
};

let currentTools = [];

function loadEventDetails() {
    const event = document.getElementById("event-list").value;
    const tbody = document.getElementById("tools-table-body");
    tbody.innerHTML = "";

    if (toolsByEvent[event]) {
        currentTools = JSON.parse(JSON.stringify(toolsByEvent[event])); // clone
        currentTools.forEach((tool, index) => {
            const row = document.createElement("tr");
            row.setAttribute("data-index", index);
            row.innerHTML = `
                <td>${tool.name}</td>
                <td class="status" style="color: red;">🔴 Not Present</td>
            `;
            tbody.appendChild(row);
        });
    }
    document.getElementById("pin-result").textContent = "Enter a PIN to mark a tool as present.";
}

function checkPin() {
    const inputPin = document.getElementById("pin-input").value.trim();
    const result = document.getElementById("pin-result");
    let found = false;

    currentTools.forEach((tool, index) => {
        if (tool.pin === inputPin && !tool.present) {
            tool.present = true;
            const row = document.querySelector(`tr[data-index="${index}"] .status`);
            row.innerHTML = "🟢 Present ✔️";  // Change to green status when present
            row.style.color = "green";  // Ensure the status cell turns green
            found = true;
        }
    });

    if (found) {
        result.textContent = "Tool marked as present.";
    } else {
        result.textContent = "PIN not recognized or already used.";
    }

    document.getElementById("pin-input").value = ""; // Clear the input after checking

    checkAllToolsPresent();
}

function checkAllToolsPresent() {
    const allPresent = currentTools.every(tool => tool.present);
    if (allPresent) {
        if (!document.getElementById("ready-btn")) {
            const btn = document.createElement("button");
            btn.textContent = "✅ Ready";
            btn.id = "ready-btn";
            btn.disabled = false;
            btn.style.marginTop = "20px";
            btn.onclick = () => alert("All tools are ready!");
            document.querySelector("#pin-entry .container").appendChild(btn);
        }
    }
}
