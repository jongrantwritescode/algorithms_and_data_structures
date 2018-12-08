function mySet(){
  this._collection = [];
  
  this.values = function() {
  	return this._collection.slice();
  }
  this.has = function(item) {
  	return this._collection.indexOf(item) >= 0;
  };
  
  this.add = function(item) {
  	if(this.has(item)) {
    	return;
    }
    
    this._collection.push(item);
  };
  
  this.remove = function(item) {
  	if(!this.has(item)) {
    	return;
    }
    
    this._collection.splice(this._collection.indexOf(item),1);
  };
  
  this.union = function(set) {
  	var unionSet = new mySet();
    this.values().forEach(unionSet.add, unionSet);
    set.values().forEach(unionSet.add, unionSet);
    return unionSet;
  }
  
  this.difference = function(set) {
  	var differenceSet = new mySet();
    this.values().filter(function(item){
    	return !set.has(item);
    }).forEach(differenceSet.add, differenceSet);
    
    return differenceSet
  }

  this.subset = function(set) {
      return this.values().every(set.has, set);
  }
}

var set = new mySet();
set.add("a");
set.add("b");
var setB = new mySet();
setB.add("b");
setB.add("c");
setB.add("a");
console.log(set.subset(setB));