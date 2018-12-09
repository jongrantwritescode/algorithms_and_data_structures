/**
 * BINARY SEARCH TREE
 * Values are ordered with values less than a node's are added to the left and values greater to the right.  
 * Lookup, add, remove is O(log(n))
 * --------- Avg --------- Worst
 * Access    O(log(n))     O(n)
 * Search    O(log(n))     O(n)
 * Insert    O(log(n))     O(n)
 * Delete    O(log(n))     O(n)
 * Space                   O(n)
 */

function BST() {
    /**
     * INIT
     */
    this._root = null;
    this._size = 0;
    this._makeNode = function(data) {
      return Object.assign({}, {
        data: data,
        left: null,
        right: null
      });
    };
  
    function sizeOf() {return this._size;};
  
    /**
     * ADD NODE
     */
    this.add = function(data) {
      if (this._root) {
        this._addTo(this._root, data);
      } else {
        this._root = this._makeNode(data);
      }

      this._size++;
    };
  
    this._addTo = function(node, data) {
      if (this._traverseLeft(node, data)) {
        if (node.left) {
          this._addTo(node.left, data);
        } else {
          node.left = this._makeNode(data);
        }
      } else if (this._traverseRight(node, data)) {
        if (node.right) {
          this._addTo(node.right, data);
        } else {
          node.right = this._makeNode(data);
        }
      }
    };
  
    this._traverseLeft = function(node, data) {
      return data < node.data;
    };
  
    this._traverseRight = function(node, data) {
      return data > node.data;
    };
  
  
    /**
     * REMOVE NODE
     */
    this.remove = function(data) {
      this._root = this._removeFrom(this._root, data);
      this._size--;
    };
  
    this._removeFrom = function(node, data) {
      if (this._match(node, data)) {
        if (node.left && node.right) {
          var minUnderRight = this._minFrom(node.right);
          node.data = minUnderRight.data;
          node.right = this._removeFrom(node.right, minUnderRight.data);
          return node;
        } else if (node.left) {
          return node.right;
        } else if (node.right) {
          return node.left
        } else {
          return null;
        }
      } else if (this._travereseLeft(node, data)) {
        node.left = this._removeFrom(node.left, data);
        return node;
      } else {
        node.right = this._removeFrom(node.right, data);
        return node;
      }
    };
  
  
    /**
     * SEARCH
     */
    this.search = function(data) {
      return this._searchFrom(this._root, data);
    };
  
    this.isPresent = function(data) {
      return data && this._searchFrom(this._root, data) !== undefined;
    }
  
    this._searchFrom = function(node, data) {
      if (node) {
        if (this._match(node, data)) {
          return node;
        } else if (this._traverseLeft(node, data)) {
          return this._searchFrom(node.left, data);
        } else if (this._traverseRight(node, data)) {
          return this._searchFrom(node.right, data)
        }
      }
  
      return undefined;
    };
  
    this._match = function(node, data) {
      return node.data === data;
    };
  
    /**
     * MIN / MAX 
     */
    this.min = function() {
      return this._minFrom(this._root);
    };
  
    this.max = function() {
      return this._maxFrom(this._root)
    };
  
    this._minFrom = function(node) {
      if (node) {
        var current = node;
  
        while (current.left) {
          current = current.left;
        }
  
        return current.data;
      }
  
      return undefined;
    };
  
    this._maxFrom = function(node) {
      if (node) {
        var current = node;
  
        while (current.right) {
          current = current.right;
        }
  
        return current.data;
      }
  
      return undefined;
    };
  
    /**
     * HEIGHT AND BALANCING
     */
    this.minHeight = function(node = this._root) {
      if (node === null) {
        return -1;
      }
  
      var left = this.minHeight(node.left);
      var right = this.minHeight(node.right);
  
      if (left < right) {
        return left + 1;
      } else {
        return right + 1;
      }
    };
  
    this.maxHeight = function(node = this._root) {
      if (node === null) {
        return -1;
      }
  
      var left = this.maxHeight(node.left);
      var right = this.maxHeight(node.right);
  
      if (left > right) {
        return left + 1;
      } else {
        return right + 1;
      }
    };
  
    this.balanced = function() {
      return this.his.maxHeight() - this.minHeight() <= 1;
    };
  
    /**
     * TRAVERSAL
     */
    /**
     * Uses of Inorder
     * In case of binary search trees (BST), Inorder traversal gives nodes in non-decreasing order. 
     * To get nodes of BST in non-increasing order, 
     * a variation of Inorder traversal where Inorder traversal s reversed can be used.
     */
    this.inOrder = function() {
      if (this._root === null) {
        return null;
      } else {
        var result = [];
  
        var traverseInOrder = function(node) {
          if (!node) return;
  
          traverseInOrder(node.left);
          result.push(node.data);
          traverseInOrder(node.right);
        }
  
        traverseInOrder(this._root);
  
        return result;
      }
    };
  
    /**
     * Preorder traversal is used to create a copy of the tree. 
     * Preorder traversal is also used to get prefix expression on of an expression tree.
     * Please see http://en.wikipedia.org/wiki/Polish_notation to know why prefix expressions are useful.
     */
    this.preOrder = function() {
      if (this._root === null) {
        return null;
      } else {
        var result = [];
  
        var traversePreOrder = function(node) {
          if (!node) return;
  
          result.push(node.data);
          traversePreOrder(node.left);
          traversePreOrder(node.right);
        };
  
        traversePreOrder(this._root);
  
        return result;
      }
    };
  
    /**
     * Postorder traversal is used to devare the tree. 
     * Please see the question for devarion of tree for details. 
     * Postorder traversal is also useful to get the postfix expression of an expression tree. 
     * Please see http://en.wikipedia.org/wiki/Reverse_Polish_notation to for the usage of postfix expression.
     */
    this.postOrder = function() {
      if (this._root === null) {
        return null;
      } else {
        var result = [];
  
        var traversePostOrder = function(node) {
          if (!node) return;
  
          traversePostOrder(node.left);
          traversePostOrder(node.right);
          result.push(node.data);
        };
  
        traversePostOrder(this._root);
  
        return result;
      }
    };
  
    /**
     * Breadth first traversalshort
     */
    this.levelOrder = function() {
      var result = [];
      var queue = [];
      if (this._root) {
        queue.push(this._root);
        while (queue.length > 0) {
          var current = queue.shift();
          result.push(current.data);
          if (current.left) {
            queue.push(current.left);
          }
  
          if (current.right) {
            queue.push(current.right);
          }
        }
  
        return result;
      } else {
        return null;
      }
    };
    
    function path(root, data) {
      var makePath = function(node, p, data) {
        p.push(node);
    
        if (node.val === data) {
          return true;
        }
  
        if (makePath(node.left, p, data) || makePath(node.right, p, data)) {
          return true;
        }
      
        p.shift();
        return false;
      }
   
      var p = [];
      makePath(node, p, data);
      return p;
    }
    
    function reversePathFromNode(root, data) {
      var p = path(root, data);

      p.every(function(node, i, p){
          if(i === Math.floor((p.length-1) / 2) { 
            return false;
          }
          
          var swapNode = p[p.length - 1 - i];
          var temp = node.val;
          node.val = swapNode.val;
          swapNode.val = temp;
          
          return true;
      })
    
      return p;
    };

    function valuesEqualTo (bst) {
      if(!bst || (this._size != bst.sizeOf()){
        return false;
      }

      var compare = bst.inOrder();
      return this.inOrder().every(function(value, i){
        return value === compare(i);
      });
    }
  }
  
  var bst = new BST();
  bst.add(200);
  bst.add(201);
  bst.add(90);
  bst.add(100);
  console.log(bst.preOrder());
  