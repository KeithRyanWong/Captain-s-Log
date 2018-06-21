import CaptainsLog from './CaptainsLog.js';

let captainsLog;

document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get((storage) => {
        captainsLog = storage[CaptainsLog] || new CaptainsLog();
    });

    if(!captainsLog) alert("Failed to load or create a new Captain's Log. QQ");
});

document.body.addEventListener('unload', () => {
    captainsLog.save();
});
