import LogNode from '../src/LogNode.js';

test('New nodes start with an empty string', () => {
    let node = new LogNode();
    expect(node.txt).toBe("");
});
test('New nodes start with current time', () => {
    let node = new LogNode();
    let time = Date.now();
    expect(node.createdTime/100).toBeCloseTo(time/100);
});