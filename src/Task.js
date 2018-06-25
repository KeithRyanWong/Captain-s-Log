import LogNode from "./LogNode.js";

export default function Task(title) {
    if (!title || title == "") throw(new Error("No title provided"));

    this.title = title;
    this.createdTime = Date.now();
    this.lastUpdated = Date.now();
    this.timeLog = [];
    this.alottedTime = 0;
    this.logNodes = [];
}

Task.prototype.updateTitle = function(title) {
    if(title === this.title) return;
    if(!title) throw(new Error("No new title provided"));
    this.title = title;
    this.lastUpdated = Date.now();
};

Task.prototype.logTime = function() {
    let time = Date.now();

    if (this.timeLog.length % 2 != 0) {
        let time2 = this.timeLog[this.timeLog.length - 1];
        this.logAlottedTime(time - time2);
    }

    this.timeLog.push(time);
    this.lastUpdated = Date.now();
}

Task.prototype.logAlottedTime = function(time) {
    this.alottedTime += time;
}

Task.prototype.getAlottedTime = function() {
    let ms = this.alottedTime;
    let hours = Math.floor(ms / 3600000);
    ms = ms % 3600000;
    let minutes = Math.floor(ms / 60000);
    ms = ms % 60000;
    let seconds = Math.floor(ms / 1000);

    return "" + hours + "h " + minutes + "m " + seconds + "s";
};

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