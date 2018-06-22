export default function LogNode() {
    this.createdTime = Date.now();
    this.text = "";
}

LogNode.prototype.appendText = function (txt) {
    if (txt == "") return;
    if (this.text === "") {
        this.text += txt;
    } else {
        this.text += "\n" + txt;
    }
};

//Need to figure out how this works with editing text
LogNode.prototype.updateText = function(txt) {
    this.text = txt;
};