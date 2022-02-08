class FPSMeter {
    constructor(fpsIndicatorElement, fpsUpdateRatio) {
        this.fpsIndicatorElement = fpsIndicatorElement;
        this.curr_frame = 0;
        this.fpsUpdateRatio = fpsUpdateRatio;
        this.state = 'stop';
    }

    start() {
        if (this.state !== 'start') {
            this.then = Date.now() / 1000;
            this.state = 'start';
        }
    }

    reset() {
        stop();
        this.curr_frame = 0;
    }

    stop() {
        this.state = 'stop';
    }

    update() {
        if (this.state === 'stop')
            return;
        ++this.curr_frame;
        if (this.curr_frame % this.fpsUpdateRatio !== 0)
            return;
        let now = Date.now() / 1000;
        let dt = now - this.then;
        this.then = now;
        let fps = this.fpsUpdateRatio / dt;
        this.fpsIndicatorElement.innerText = fps.toFixed(1);
    }
}

class LLNode {
    constructor(val) {
        this._val = val;
        this._next = null;
        this._prev = null;
    }

    get val() {
        return this._val;
    }

    get next() {
        return this._next;
    }

    get prev() {
        return this._prev;
    }

    set next(value) {
        this._next = value;
    }

    set prev(value) {
        this._prev = value;
    }
}

class Iterator {
    constructor(first, containingList) {
        this._containingList = containingList;
        this._prev = null;
        this._curr = first;
        this.expectedModCount = containingList.modCount;
    }

    next() {
        //console.log("$$$$$$$$$$$$$$$$$$\nNEXT START");
        this.checkForCoModification();
        if (this._curr === null)
            throw  "no such element";
        let retVal = this._curr;
        this._prev = this._curr;
        this._curr = this._curr.next;
        /*console.log(`in next, _prev became ${this._prev == null ? null : this._prev.val} and _curr became ${this._curr == null ? null : this._curr.val}`);
        if (this._prev != null)
            console.log(`_prev.prev be ${this._prev.prev == null ? null : this._prev.prev.val}`);
        console.log("NEXT OVER\n$$$$$$$$$$$$$$$$$$");
        */
        return retVal.val;
    }

    size() {
        return this._containingList.size;
    }

    hasNext() {
        return this._curr !== null;
    }

    add(val) {
        if (this._prev === null)
            throw "end of the iterator";
        this._curr = this._containingList.linkAfter(this._prev, val);
        ++this.expectedModCount;
    }

    remove() {
        //console.log("####################\nREMOVE START");
        if (this._prev === null)
            throw "no such element to remove";
        let retVal = this._prev.val;
        /*console.log(`in it these be ${(this._prev.prev == null ? null : this._prev.prev.val)}, ${this._prev.val},
         ${this._prev.next == null ? null : this._prev.next.val}`);
        console.log(`list be ${this._containingList.toString()}`);*/
        this._containingList.unlink(this._prev);
        if (this._curr !== null) {
            this._prev = this._curr.prev;
            /*
            console.log(`in it _prev became ${this._prev == null ? null : this._prev.val}`);
            console.log(`in it _curr became ${this._curr.val}`);*/
        } else
            this._prev = null;
        ++this.expectedModCount;
        //console.log("REMOVE OVER\n####################");
        return retVal;
    }

    checkForCoModification() {
        if (this._containingList.modCount !== this.expectedModCount) {
            throw "Concurrent Modification Exception.";
        }
    }
}

class LinkedList {
    constructor() {
        this.first = null;
        this.last = null;
        this._size = 0;
        this._modCount = 0;
    }

    checkIntegrity() {
        let i = 0;
        let curr = this.first;
        while (curr !== null) {
            curr = curr.next;
            ++i;
        }
        if (i !== this.size)
            throw `size = ${this.size} but supposed to be ${i}`;
    }

    get modCount() {
        return this._modCount;
    }

    remove(i) {
        if (i >= this.size || i < 0)
            throw `index ${i} out of range.`;
        let curr = this.first;
        let j = 0;
        while (j < i) {
            ++j;
            curr = curr.next;
        }
        this.unlink(curr);
        return curr.val;
    }

    checkExists(node) {
        let curr = this.first;
        while (curr !== null) {
            if (curr === node)
                return true;
            curr = curr.next;
        }
        return false;
    }

    unlink(curr) {
        if (curr == null) {
            throw "cant unlink null or undefined";
        }
        /*console.log(`**********************\n UNLINKING ${curr.val}`)
        console.log("checking integrity in unlink before action");

        this.checkIntegrity();
        if (!this.checkExists(curr)) {
            throw `node ${curr.val} doesnt exist.`;
        }
        if (this._size === 0)
            throw "how is " + curr.val + " existent";
        */
        let prev = curr.prev;
        let next = curr.next;
        /*console.log(`in list these be ${prev == null ? null : prev.val}, ${curr.val}, ${next == null ? null : next.val}`);
        console.log("was    " + this.toString());
        */
        if (curr === this.first) {
            if (next !== null)
                next.prev = null;
            this.first = next;
        } else if (curr === this.last) {
            if (prev !== null)
                prev.next = null;
            this.last = prev;
        } else {
            if (next !== null)
                next.prev = prev;
            prev.next = next;
        }
        if (this.last === null || this.first === null) {
            this.first = null;
            this.last = null;
        }
        //console.log("became " + this.toString());
        --this._size;
        ++this._modCount;
        /*console.log("checking integrity in unlink after action");
        this.checkIntegrity();
        console.log(`UNLINKING OVER\n**********************`)
        */
    }

    removeLast() {
        if (this.last === null)
            throw "list empty.";
        let curr = this.last;
        let prev = curr.prev;
        if (prev != null)
            prev.next = null;
        else
            this.first = null;
        this.last = prev;
        --this._size;
        ++this._modCount;
        return curr.val;
    }

    add(val) {
        let curr = new LLNode(val);
        if (this.first == null) {
            this.first = curr;
        } else {
            this.last.next = curr;
            curr.prev = this.last;
        }
        this.last = curr;
        ++this._size;
        ++this._modCount;
        /*console.log("checking integrity in add");
        this.checkIntegrity();*/
    }

    linkAfter(prev, val) {
        let next = prev.next;
        let curr = new LLNode(val);
        /*console.log(`%%%%%%%%%%%%%%%%%%%\nIN LINK AFTER`);
        console.log(`linking ${val}`);
        console.log(`list was    ${this.toString()}`);
        */
        prev.next = curr;
        curr.prev = prev;
        curr.next = next;
        if (next != null)
            next.prev = curr;
        if (this.last === prev) {
            //    console.log("due to prev being " + prev.val);
            this.last = curr;
            //   console.log("last became " + this.last.val);
        }
        /*console.log(`became ${this.toString()}`);
        console.log(`became ${this.toStringReverse()}`);
        */
        ++this._size;
        ++this._modCount;
        return curr;
    }

    removeFirst() {
        if (this.first === null)
            throw "list empty.";
        let curr = this.first;
        let next = curr.next;

        if (next != null)
            next.prev = null;
        this.first = next;
        --this._size;
        ++this._modCount;
        return curr.val;
    }

    iterator() {
        return new Iterator(this.first, this);
    }

    getFirst() {
        if (this.first === null)
            throw "no such element";
        return this.first.val;
    }

    getLast() {
        if (this.last === null)
            throw "no such element";
        return this.last.val;
    }

    get(i) {
        if (i >= this.size || i < 0)
            throw `index ${i} out of range.`;
        let curr = this.first;
        let j = 0;
        while (j < i) {
            ++j;
            curr = curr.next;
        }
        return curr.val;
    }

    get size() {
        return this._size;
    }

    clear() {
        if (this._size === 0)
            return;
        let curr = this.first;
        while (curr !== null) {
            let next = curr.next;
            curr.prev = null;
            curr.next = null;
            curr = next;
        }
        this.first = null;
        this.last = null;
        this._modCount++;
        this._size = 0;
    }

    toString() {
        let curr = this.first;
        if (curr === null)
            return "null";
        let s = [curr.prev];
        while (curr !== null) {
            s.push(curr.val);
            curr = curr.next;
        }
        s.push(curr);
        s.join({separator: " -> "});
        return s.toString();
    }

    toStringReverse() {
        let curr = this.last;
        if (curr === null)
            return "null";
        let s = [curr.next];
        while (curr !== null) {
            s.push(curr.val);
            curr = curr.prev;
        }
        s.push(curr);
        s.join({separator: " -> "});
        return s.toString();
    }
}

class PaperAnimation {
    /**
     * @param {string} type - animation type
     * @param {number} duration - animation duration
     * @param {paper.Item} node - node to apply animation on
     */
    constructor(type, duration, node) {
        this.type = type;
        this.node = node;
        this._curr = 0;
        this.duration = duration;
    }

    /** @function
     * @name progress - progress the animation on each frame
     * @returns {boolean} - returns true if animation is finished
     */
    progress() {
        return true;
    }

    /** @function
     * @name onFinish - do something after animation finishes
     */
    onFinish() {
    }

    extend(args) {
        let res = Object.create(this);
        for (let field in args) {
            res[field] = args[field];
        }
        return res;
    }
}