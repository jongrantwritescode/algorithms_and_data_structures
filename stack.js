var Stack = function () {
    this._collection = {};
    this._length = 0;

    this.empty = function () {
        return this._length === 0;
    };

    this.push = function (item){
        this._collection[this._length] = item;
        this._length++;
    };

    this.pop = function () {
        if(this.empty()) {
            return undefined;
        }

        var item = this.peek();
        
        delete this._collection[this._length-1];
        this._length--;
        
        return item;
    };

    this.peek = function () {
        if(this.empty()) {
            return undefined;
        }

        return this._collection[this._length - 1];
    };
};