import LogNode from '../src/LogNode.js';

describe("LogNode", () => {
    let node = new LogNode();
    let time = Date.now();

    describe("#LogNode", () => {
        it("initiates with an empty string and the current time", () => {
            expect(node.createdTime/100).toBeCloseTo(time/100);
            expect(node.text).toBe("");
        });
    });

    describe("#appendText", () => {
        it("does not add a newline on first entry", () => {
            node.appendText('Hello World!');
            expect(node.text).toBe('Hello World!');
        });
        it("adds subsequent text on a newline", () => {
            node.appendText("This is a new entry.");
            node.appendText("This is another new entry!");
            expect(node.text).toBe('Hello World!\nThis is a new entry.\nThis is another new entry!');
        });
        it("does not add an empty entry", () => {
            let node2 = new LogNode();
            node2.appendText("");
            expect(node2.text).toBe("");
            node.appendText("");
            expect(node.text).toBe('Hello World!\nThis is a new entry.\nThis is another new entry!');
        });
    });
    
    describe("#updateText", () => {
        it("overwrites existing text", () => {
            expect(node.text).toBe('Hello World!\nThis is a new entry.\nThis is another new entry!');
            node.updateText("Bye Rihanna");
            expect(node.text).toBe("Bye Rihanna");
            node.updateText("");
            expect(node.text).toBe("");
        });
    });
});