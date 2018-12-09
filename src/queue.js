var Queue = function () {
    this._collection = [];

    this.enqueue = function (item) {
        this._collection.push(item);
    };

    this.dequeue = function (item) {
        this._collection.shift();
    };

    this.front = function () {
        return this._collection[0];
    };

    this.size = function () {
        return this._collection.length();
    };

    this.isEmpty = function () {
        return this.size() === 0;
    };
}

//* queue with max priority, if null only one priority
//* more than max - sort in top priority
//* priorities are 1 based
//* this way with big sets, search is O(n) where n is priority length and not the number of elements
var PriorityQueue = function (max_priority) {
    this.MAX_PRIORITY = max_priority || 0;
    this._collection = Array(this.MAX_PRIORITY + 1).fill(undefined).map(function(element){return [];});

    this.enqueue = function (item) {
        var priority = item.priority ? item.priority - 1 || this.MAX_PRIORITY;
        priority = Math.min(Math.max(0, priority), this.MAX_PRIORITY);
        this._collection[priority].push(item);
    };

    this.dequeue = function (item) {
        var highPriorityQueue = this._collection.find(function(arr) {return arr.length;});
        return highPriorityQueue ? highPriorityQueue.shift() : undefined;
    };

    this.front = function () {
        return this._collection[0];
    };

    this.size = function () {
        return this._collection.length();
    };

    this.isEmpty = function () {
        return this.size() === 0;
    };
}