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

function Task(title) {
    this.title = title;
    this.createdTime = Date.now();
    this.lastUpdated = Date.now();
    this.timeLog = [];
    this.timeAlotted = 0;
    logNodes = [];
}

Task.prototype.logTime = function() {
    let time = Date.now();

    if (this.timeLog.length % 2 != 0) {
        let time2 = this.timeLog[this.timeLog.length - 1];
        this.logAlottedTime(time - time2);
    }

    this.timeLog.push(time);
}

Task.prototype.logAlottedTime = function(time) {
    this.timeAlotted += time;
}

Task.prototype.addLog = function() {
    this.logNodes.unshift(new LogNode);

    this.lastUpdated = Date.now();
};

Task.prototype.appendText = function(txt) {
    this.logNodes[0].appendText(txt);
    this.lastUpdated = Date.now();
};

Task.prototype.updateText = function(node, txt) {
    node.updateText(txt);

    this.lastUpdated = Date.now();
};

function LogNode() {
    this.createdTime = Date.now();
    this.txt = "";
}

LogNode.prototype.appendText = function (txt) {
    this.txt += "\n" + txt;
};

//Need to figure out how this works with editing text
LogNode.prototype.updateText = function(txt) {
    this.txt = txt;
};