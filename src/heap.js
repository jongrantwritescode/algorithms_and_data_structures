/**
 * HEAP
 * Heap can be represented as a complete binary tree
 * Heap property makes children 
 *  a) less thn parent (min heap)
 *  or
 *  b) more than parent (max heap)
 * 
 * Child nodes are unordered 
 * e.g. in min heap Root(10) can have children 
 * Left(30) Right(20) or Left(20) Right(30)
 * 
 * Travereing Heap
 * Heap implemented in array.  Index 0 is null
 * Left child = i * 2
 * Right Child = (i * 2 ) + 1
 * Parent = Math.floor(i/2)
 * 
 * --------- Avg --------- Worst
 * Access    O(log(n))     O(n)
 * Search    O(log(n))     O(n)
 * Insert    O(log(n))     O(n)
 * Delete    O(log(n))     O(n)
 * Space                   O(n)
 */

function Heap() {
    this.heap = [null];
  }
  
  Heap.prototype._swap = function(a, b) {
    var aVal = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = aVal;
  };
  
  /**
   * Get the value at the given index
   */
  Heap.prototype.valueAt = function(index) {
    return this.heap[index];
  };
  
  /** 
   * Find the parent value for a given index
   */
  Heap.prototype._parentValueOf = function(index) {
    if (index === 1) {
      return undefined;
    }
  
    return this.heap[this._parentIndexOf(index)];
  };
  
  /** 
   * Return the parent index for a given index
   */
  Heap.prototype._parentIndexOf = function(index) {
    if (index === 1) {
      return undefined;
    }
  
    return Math.floor(index / 2);
  };
  
  Heap.prototype._leftChildValueOf = function(index) {
    return this.heap[this._leftChildIndexOf(index)];
  };
  
  Heap.prototype._rightChildValueOf = function(index) {
    return this.heap[this._rightChildIndexOf(index)];
  };
  
  Heap.prototype._leftChildIndexOf = function(index) {
    return index * 2;
  };
  
  Heap.prototype._rightChildIndexOf = function(index) {
    return (index * 2) + 1;
  };
  
  function MinHeap() {
    Heap.call(this);
  };
  
  MinHeap.prototype = Heap.prototype;
  
  MinHeap.prototype.insert = function(value) {
    this.heap.push(value)
  
    var i = this.heap.length - 1;
    while (i >= 1 && this.valueAt(i) < this._parentValueOf(i)) {
      this._swap(i, this._parentIndexOf(i));
      i = this._parentIndexOf(i);
    }
  };
  
  MinHeap.prototype.remove = function() {
    if (this.heap.length === 1) {
      return;
    }
  
    if (this.heap.length === 2) {
      this.heap.pop();
      return;
    }
  
    var i = 1;
    this.heap[i] = this.heap.pop(); //move last to top
  
    while (this.valueAt(i) >= this._leftChildValueOf(i) || this.valueAt(i) >= this._rightChildValueOf(i)) {
      //hmm, what happens if right child value is undefined?
      var swapIndex = (this._rightChildValueOf(i) === undefined) || (this._leftChildValueOf(i) < this._rightChildValueOf(i)) ? this._leftChildIndexOf(i) : this._rightChildIndexOf(i);
      this._swap(i, swapIndex);
      i = swapIndex;
    };
  };

  function MaxHeap() {
    Heap.call(this);
  };
  
  MaxHeap.prototype = Heap.prototype;
  
  MaxHeap.prototype.insert = function(value) {
    this.heap.push(value)
  
    var i = this.heap.length - 1;
    while (i >= 1 && this.valueAt(i) > this._parentValueOf(i)) {
      this._swap(i, this._parentIndexOf(i));
      i = this._parentIndexOf(i);
    }
  };
  
  MaxHeap.prototype.remove = function() {
    if (this.heap.length === 1) {
      return;
    }
  
    if (this.heap.length === 2) {
      this.heap.pop();
      return;
    }
  
    var i = 1;
    this.heap[i] = this.heap.pop(); //move last to top
  
    while (this.valueAt(i) <= this._leftChildValueOf(i) || this.valueAt(i) <= this._rightChildValueOf(i)) {
      //hmm, what happens if right child value is undefined?
      var swapIndex = (this._rightChildValueOf(i) === undefined) || (this._leftChildValueOf(i) < this._rightChildValueOf(i)) ? this._leftChildIndexOf(i) : this._rightChildIndexOf(i);
      this._swap(i, swapIndex);
      i = swapIndex;
    };
  };