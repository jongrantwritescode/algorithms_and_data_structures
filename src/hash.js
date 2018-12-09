/**
 * Unorder accociative array with key/vaue pairs
 * 
 * --------- Avg ---- Worst
 * Access    N/A      N/A
 * Search    O(1)     O(n)
 * Insert    O(1)     O(n)
 * Delete    O(1)     O(n)
 * Space              O(n)
 */
function SimpleHashFunction () {
    this.hash = function(string, max = 1000) {
        return string.split("").reduce(function(accumulator, current, i){
            return string.charCodeAt(i) + accumulator;
        }, 0) % max;
    }
};

function Hash (hashFunc) {
    var KEY = 0;
    var VALUE = 1;

    this._hashFunc = hashFunc;

    this._storage = [];

    this._storageLimit = 3;

    this.add = function(key, value) {
        var hash = this._hashFunc.hash(key, this._storageLimit);
        if(this._storage[hash]) {
            var pairIndex = this._pairIndexAt(hash, key)

            if(pairIndex >= 0) {
                this._storage[hash][pairIndex][VALUE] = value;
            }
            else {
                this._storage[hash].push([key, value]);
            }
        }
        else {
            this._storage[hash] = [[key, value]];
        }
        
        console.log(this._storage);
    }

    this.remove = function(key) {
        var hash = this._hashFunc.hash(key, this._storageLimit);
        if(this._storage[hash]) {
            var pairIndex = this._pairIndexAt(hash, key)

            if(pairIndex >= 0) {
                delete this._storage[hash][pairIndex];
                
                if(this._storage[hash].every(function(pair) {
                    return  pair === undefined;
                })) {
                    delete this._storage[hash];
                }
            }
        }
    }

    this.lookup = function(key) {
        var hash = this._hashFunc.hash(key, this._storageLimit);
        if(this._storage[hash]) {
            var pairIndex = this._pairIndexAt(hash, key)

            if(pairIndex >= 0) {
                return this._storage[hash][pairIndex][VALUE];
            }
        }

        return undefined;
    }

    this._pairIndexAt = function(hash, key) {
        return this._storage[hash].findIndex(function(pair){
            return (pair !== undefined) &&  pair[KEY] === key;
        });
    }
} 

var hashTest = new Hash(new SimpleHashFunction())

hashTest.add("foo", 0); // Hash location = ["foo", 0]
hashTest.remove("foo"); // Hash location = [empty];

hashTest.add("foo", 0); //note this will result in the hash location being
