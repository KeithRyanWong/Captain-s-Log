import LogNode from "./LogNode.js";

export default function Task(title) {
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

Task.prototype.getAlottedTime = function() {
    let ms = this.timeAlotted;
    let hours = ms / 3600000;
    ms = ms % 3600000;
    let minutes = ms / 60000;
    ms = ms % 60000;
    let seconds = ms / 1000;

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