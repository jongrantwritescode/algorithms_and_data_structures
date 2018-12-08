/* Graphs: Breadth-first search */
function bfs(graph, root) {
    this.nodesLen = {};
  
    graph.forEach(function(node, i) {
      this.nodesLen[i] = Infinity;
    }, this);
  
    this.nodesLen[root] = 0;
  
    this.queue = [root];
  
    while (this.queue.length !== 0) {
      this.current = this.queue.shift();
  
      this.curConnected = graph[this.current];
      this.neighborIdx = [];
      this.idx = this.curConnected.indexOf(1);
      while (this.idx !== -1) {
        this.neighborIdx.push(this.idx);
        this.idx = this.curConnected.indexOf(1, this.idx + 1);
      }
  
      this.neighborIdx.forEach(function(id) {
        if (this.nodesLen[id] === Infinity) {
          this.nodesLen[id] = this.nodesLen[this.current] + 1;
          this.queue.push(id);
        }
      }, this);
    }
    return this.nodesLen;
  }
  
  var exBFSGraph = [
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0]
  ];
  
  console.log(new bfs(exBFSGraph, 1));
  