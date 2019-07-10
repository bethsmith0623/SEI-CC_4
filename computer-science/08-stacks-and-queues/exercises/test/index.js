const expect = require('chai').expect;
const { priorityQueue, bracketMatching } = require('../stacksAndQueues');

describe('priority Queue', ()=>{
    it('should initialize as empty', ()=>{
        const pQ = new priorityQueue();
        expect(pQ.head).to.equal(null);
        expect(pQ.head).to.not.equal(undefined);
    });
    it('should enqueue a new Node properly', ()=>{
        const pQ = new priorityQueue();
        pQ.enqueue("Alpha", 1);
        expect(pQ.head.data).to.equal("Alpha");
        expect(pQ.head.priority).to.equal(1);
        expect(pQ.head.data).to.equal("Alpha");
        pQ.enqueue("Omega", 3);
        expect(pQ.head.next.data).to.equal("Omega");
        expect(pQ.head.next.priority).to.equal(3);
        pQ.enqueue("Beta", 2);
        expect(pQ.head.next.data).to.equal("Beta");
        expect(pQ.head.next.priority).to.equal(2);
        expect(pQ.head.next.next.data).to.equal("Omega");
        expect(pQ.head.next.next.priority).to.equal(3);
        pQ.enqueue("VIP", 0);
        expect(pQ.head.data).to.equal("VIP");
        expect(pQ.head.next.data).to.equal("Alpha");
    });
    it('should dequeue the highest priority node', ()=>{
        const pQ = new priorityQueue();
        pQ.enqueue("Omega", 3);
        pQ.enqueue("Alpha", 1);
        pQ.enqueue("Beta", 2);
        const firstOneDown = pQ.dequeue();
        expect(firstOneDown.data).to.equal("Alpha");
        expect(firstOneDown.priority).to.equal(1);
        expect(pQ.head.data).to.equal("Beta");
        const anotherOneGone = pQ.dequeue();
        expect(anotherOneGone.data).to.equal("Beta");
        expect(pQ.head.data).to.equal("Omega");
        const andAnotherOneGone = pQ.dequeue();
        expect(andAnotherOneGone.data).to.equal("Omega");
        expect(pQ.head).to.equal(null);
    });
})

describe('bracketMatching', ()=>{
    it('should return true with matching brackets', ()=>{
        const valid = bracketMatching("(hello hello)");
        expect(valid).to.be.true;
        const valid2 = bracketMatching("'a{b}{c(1[2]3)}'")
        expect(valid2).to.be.true;
        const valid3 = bracketMatching('a[bc(123)]')
        expect(valid3).to.be.true;
        const valid4 = bracketMatching('()')
        expect(valid4).to.be.true;
        const valid5 = bracketMatching('no brackets here')
        expect(valid5).to.be.true;
    });
    it('should return false with improperly matched brackets', ()=>{
        const invalid = bracketMatching('a[bc(12]3)')
        expect(invalid).to.be.false;
        const invalid2 = bracketMatching('a{b}{c(1}[2]3)')
        expect(invalid2).to.be.false;
        const invalid3 = bracketMatching("'[]]')}")
        expect(invalid3).to.be.false;
        const invalid4 = bracketMatching("'abc(123')}")
        expect(invalid4).to.be.false;
    });
})