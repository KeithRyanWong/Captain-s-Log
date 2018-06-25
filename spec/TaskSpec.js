import Task from '../src/Task.js';
import LogNode from '../src/LogNode.js';

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
            expect(task.alottedTime).toBe(0);
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

    describe("#logTime", () => {
        describe('when logging a start time', () => {
            it("increases the log by 1", () => {
                let task = new Task("A whole new world");
                let len = task.timeLog.length;
                task.logTime();

                expect(task.timeLog.length).toBe(len + 1);
            });
        });

        describe('when logging an end time', () => {
            it("increases the log by 1", () => {
                let task = new Task("A whole new world");
                let len = task.timeLog.length;
                task.logTime();
                task.logTime();

                expect(task.timeLog.length).toBe(len + 2);
            });

            it("updates total alotted time", () => {
                let task = new Task("For you and me");
                let spy = spyOn(task, 'logAlottedTime');

                let time1 = Date.now();
                task.logTime();
                
                while(Date.now() - time1 < 100){}

                let time2 = Date.now();
                task.logTime()
                expect(spy).toHaveBeenCalledWith(time2 - time1);
            });

            xit("updates the last time updated", () => {

            });
        });
    });
    
    describe("#logAlottedTime", () => {
        let task = new Task("Test logAlottedTime");
        it("updates the alottedTime with the amount passed in", () => {
            task.logAlottedTime(300);
            expect(task.alottedTime).toBe(300);

            task.logAlottedTime(450)
            expect(task.alottedTime).toBe(750);
        });
    });
    
    describe("#getAlottedTime", () => {
        let task = new Task("test getAlottedTime");
        it("displays time in correct format", () => {
            task.alottedTime = 21600000 + 2820000 + 12000;//6h 47m 12s
            expect(task.getAlottedTime()).toBe('6h 47m 12s');

            task.alottedTime = 259200000; //72h
            expect(task.getAlottedTime()).toBe('72h 0m 0s')
        });
    });
    
    describe("#addLog", () => {
        let task;

        beforeEach(() => {
            task = new Task('Time to add logs');
        })
        
        function LogNode() {
            
        }

        it('keeps track of the logs', () => {
            let len = task.logNodes.length;
            task.addLog()
            expect(task.logNodes.length).toBe(len + 1);
        })

        it('keeps logs in order', () => {
            task.addLog();
            let log1 = task.logNodes[task.logNodes.length - 1];
            task.addLog();
            let log2 = task.logNodes[task.logNodes.length - 2];
            task.addLog();
            expect(log1).not.toBe(log2);
            expect(task.logNodes[1]).toBe(log2);
            expect(task.logNodes[2]).toBe(log1);
        });

        xit("updates the last time updated", () => {
                
        });
    });

    xdescribe("#appendText", () => {
        it("calls LogNode's #appendText", () => {

        });

        it("updates the last time updated", () => {
            
        });
    });

    xdescribe("#updateText", () => {
        it("calls LogNode's #updateText", () => {

        });

        it("updates the last time updated", () => {
            
        });
    });
})