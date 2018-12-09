function GridSearch(grid, numcol, numrow) {
  this.grid = grid;
  this.numrow = numrow;
  this.numcol = numcol;
}

/**
 * Each iteration will search a single leel distance from the origin
 * Get neghbors
 * If we should visit (non-zero value), check if it is the goal
 * If it is, return the count + 1 for the current level;
 * If not, mark as visited and add to a list to pass to the next iteration
 *
 * If there are no nodes to search, and the goal was not found, return undfined
 */
GridSearch.prototype.search = function(path = [[0, 0]], count = 0) {
	//If grid empty, or no nodes to check (which means no goal), return undefined
	if(path.length === 0) {
  	return undefined;
  }
  
  //If the first grid space is the goal
  if (count === 0 && path.length === 1 && this.isGoal(path[0])) {
    return 0;
  }

  var children = [];

  while (path.length) {
    var node = path.shift();

    var neighbors = [this.left(node), this.right(node), this.above(node), this.below(node)];
    while (neighbors.length) {
      var neighbor = neighbors.shift();
      if (this.visitLocation(neighbor)) {
        if (this.isGoal(neighbor)) {
          return count + 1;
        }
        this.zeroNode(neighbor);
        children.push(neighbor);
      }
    }
  }

  return this.search(children, count + 1);
}

GridSearch.prototype.left = function(node) {
  return [node[0] - 1, node[1]];
}

GridSearch.prototype.right = function(node) {
  return [node[0] + 1, node[1]];
}

GridSearch.prototype.above = function(node) {
  return [node[0], node[1] - 1];
}

GridSearch.prototype.below = function(node) {
  return [node[0], node[1] + 1];
}

GridSearch.prototype.visitLocation = function(node) {
  var x = node[0];
  var y = node[1];
  if (x >= 0 && x < this.numcol && y >= 0 && y < this.numrow) {
    return this.grid[y][x] !== 0;
  }

  return false;
}

GridSearch.prototype.isGoal = function(node) {
  var x = node[0];
  var y = node[1];
  return this.grid[y][x] === 9;
}

GridSearch.prototype.zeroNode = function(node) {
  var x = node[0];
  var y = node[1];
  this.grid[y][x] = 0;
}


/**
 * FIND SHORTEST PATH LENGTH
 * Using Breath First Search
 */
var lengthFive = [
  [1, 1, 0, 0],
  [1, 0, 1, 0],
  [1, 0, 0, 0],
  [1, 1, 9, 0]
];

var noPathTest = [
  [1, 1, 0, 0],
  [1, 0, 1, 0],
  [1, 0, 0, 0],
  [0, 1, 9, 0]
];

var startIsGoalTest = [
  [9, 1, 0, 0],
  [1, 0, 1, 0],
  [1, 0, 0, 0],
  [0, 1, 9, 0]
];

console.log(new GridSearch(lengthFive, 4, 4).search());
console.log(new GridSearch(noPathTest, 4, 4).search());
console.log(new GridSearch(startIsGoalTest, 4, 4).search());