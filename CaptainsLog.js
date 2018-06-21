function CaptainsLog () {
    this.tasks = [];
}

CaptainsLog.prototype.load = function() {
    let loadedTasks = [];
    chrome.storage.sync.get((storage) => {
        loadedTasks = storage[tasks] || [];
    });
    this.tasks = loadedTasks;
};

CaptainsLog.prototype.save = function() {
    chrome.storage.sync.set({
        'tasks': this.tasks
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
    // Should update priority of existing task or create a new one
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

function Task(title) {
    this.title = title;
    this.createdTime = Date.now();
    this.lastUpdated = Date.now();
    this.timeLog = [];
    this.timeAlotted = 0;
    logNodes = [];
}

Task.prototype.addLog = function() {
    this.logNodes.unshift(new LogNode);

    this.lastUpdated = Date.now();
};

Task.prototype.appendText = function(txt) {
    this.logNodes[0].addText(txt);

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

LogNode.prototype.addText = function (txt) {
    this.txt += "\n" + txt;
};

LogNode.prototype.updateText = function(txt) {
    this.txt = txt;
};