/**
 * TRIE
 * 
 * Prefix tree.  Each node on the tree represent one letter.
 * As a word is addeds, new nodes are added foe each letter.
 * If a word ends on a node, even if other words pass through it,
 * the node get a end of word marker.
 * 
 * --------- Avg ---- Worst
 * Access    O(m)     O(m)
 * Search    O(m)     O(m)
 * Insert    O(m)     O(m)
 * Delete    O(m)     O(m)
 * Space              O(m)
 * 
 * - m is legnth of key
 * - best is O(1) where key is one letter
 */


function Trie () {
    this.node = function () {
        return Object.assign({}, {map:new Map(), end:false});
    };

    this._root = node();

    this.add = function (word) {
        var current = this._root;
        var path = word.split(""); 
        path.forEach(function(char, i) {
            if(!current.map.has(char)) {
                current.map.set(char, node());
            }
            
            current = current.map.get(char);

            if(i === path.length-1) {
                current.end = true;
            }
        }, this);
    };

    /**
     * Check for valid word.
     * Starting at root, traverse the map of each char in the search word.
     * If the next char exists, move into that node.
     * If at the end of the search word, return if a valid word end,
     * else keep looking
     */
    this.isWord = function () {
        var current = this._root;
        var path = word.split(""); 
        return path.every(function(char, i) {
            if(current.map.has(char)) {
                current = current.map.get(char);

                if(i === path.length-1) {
                    return current.end;
                }

                return true;
            }
            
            return false;
        }, this);
    }

    this.print = function () {
        var words = [];

        var build = function(node, string) {
            // If at end of non-empty word, add it
			if (node.map.size === 0 && string.length > 0) {
                words.push(string);
            } else {
                /** 
                 *  If you have found a word while mid traversal 
                 *  e.g. do in path that ends with door,
                 *  go ahead and add it.
                 * 
                 *  This will make the shorter word first in list 
                 *  e.g. ["do", "door", "doors"]
                 */
                if (node.isEnd()) {
					words.push(string);
                };
                
                // Traverse each key to keep building words.
                var keys = node.map.keys();
                var key = keys.next()

                do {
                    build(node.map.get(key), string.concat(key));
                    key = keys.next();
                } while (!key.done);	
			}
        };
        
        build(this.root, new String());
        
		return words;
    }
}