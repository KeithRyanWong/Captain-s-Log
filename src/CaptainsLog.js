import Task from './Task.js';

export default function CaptainsLog () {
    this.tasks = [];
}
//May have to save and load on each window click. ie switching browser windows
// CaptainsLog.prototype.load = function() {
//     let loadedTasks = [];
//     chrome.storage.sync.get((storage) => {
//         loadedTasks = storage[tasks] || [];
//     });
//     this.tasks = loadedTasks;
// };

CaptainsLog.prototype.save = function() {
    chrome.storage.sync.set({
        'CaptainsLog': this
    });
};

CaptainsLog.prototype.getTask = function(title) {
    alert("getTask not implemented");
};

CaptainsLog.prototype.getTaskTitles = function() {
    return this.tasks.map((task) => {
        return task.title;
    });
};

CaptainsLog.prototype.setActiveTask = function(title) {
    let idx = this.tasks.findIndex((task) => {
        task.title = title;
    });

    if (idx > -1) {
        let task = this.tasks[idx];
        this.tasks = [task].concat(this.tasks.splice(idx, 1));
    } else {
        alert(title + " does not exist.");
    }

    this.save();
};

CaptainsLog.prototype.addTask = function(title) {
    let task = new Task(title);

    this.tasks.unshift(task);

    this.save();
};

CaptainsLog.prototype.clearLogs = function() {
    this.tasks = [];
    this.save();
};

CaptainsLog.prototype.appendText = function(txt) {
    this.tasks[0].appendText(txt);
    this.save();
};

CaptainsLog.prototype.logTime = function() {
    this.tasks[0].logTime();
    this.save();
};

