import Task from '../src/Task.js';

describe("Task", () => {
    describe("#Task", () => {
        let task = new Task("UV 13721");
        let time = Date.now();

        it("initializes with the passed in title", () => {
            expect(task.title).toBe("UV 13721");
        });

        it("requires a title be passed in", () => {
            expect(() => new Task()).toThrowError();
        });
        
        it("initializes with the current time", () => {
            expect(task.createdTime/100).toBeCloseTo(time/100);
        });

        it("updates lastUpdated", () => {
            expect(task.lastUpdated/100).toBeCloseTo(time/100);
        });
        
        it("starts with an empty timeLog", () => {
            expect(task.timeLog.length).toBe(0);
        });
        
        it("starts with no time alotted", () => {
            expect(task.timeAlotted).toBe(0);
        });

        it("starts with no logs", () => {
            expect(task.logNodes.length).toBe(0);
        });

    });
    
    describe("#updateTitle", () => {
        let task = new Task('Original Title');
        let title = task.title;
        let lastUpdated = task.lastUpdated;

        it("requires a title be passed in", () => {    
            expect(() => task.updateTitle("")).toThrowError()
            expect(task.title).toBe(title);
        });

        it("overwrites the title", () => {
            let title2 = "secondTitle";
            task.updateTitle(title2);

            expect(task.title).toBe(title2);
        });

        it("updates lastUpdated", () => {
            task.updateTitle("Another one");
            expect(task.lastUpdated).toBeGreaterThan(lastUpdated);
        });

        it("does not count the same title being passed in as an update", () => {
            let duplicateTitle = "T-t-title";
            let task2 = new Task(duplicateTitle);
            let lastUpdated2 = task2.lastUpdated;

            while(Date.now() - lastUpdated2 < 100){}

            task2.updateTitle(duplicateTitle);
            expect(task2.lastUpdated).toBe(lastUpdated2);
        });
    });

    xdescribe("#logTime", () => {
        xit("")
    });
    
    xdescribe("#logAlottedTime", () => {

    });
    
    xdescribe("#getAlottedTime", () => {

    });
    
    xdescribe("#addLog", () => {

    });

    xdescribe("#appendText", () => {

    });

    xdescribe("#updateText", () => {

    });
})