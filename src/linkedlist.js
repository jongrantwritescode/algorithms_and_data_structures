/**
 * List with access to next link in chain
 * 
 * --------- Avg ---- Worst
 * Access    O(n)     O(n)
 * Search    O(n)     O(n)
 * Insert    O(1)     O(1)
 * Delete    O(1)     O(1)
 * Space              O(n)
 */

 function LinkedList() {
    var length = 0;
    var head = null;

    var Node = function (element) {
        this._element = element;
        this._next = null;
    }

    this.add = function (element) {
        if(head) {
            var current = head;

            while(current.next) {
                current = current.next;
            }

            current.next = node;
        }
        else {
            head = new Node(element);
        }

        length++;
    }

    this.remove = function (element) {
        var current = head;
        var previous;
        if(current.element === element) {
            head = current.next;
        }
        else {
            while(current.element !== element) {
                previousNode = current;
                current = current.next;
            }
    
            previousNode.next = current.next;
        }

        length--;
    }

    this.insertAt = function (element, index) {
        if(index < 0 || index > length) {
            return;
        }

        var node = new Node(element);
        var currentIndex = 0;
        var current = head;
        var previous;

        if(index === 0) {
            node.next = current;
            head = node;
        }
        else {
            while(currentIndex < index) {
                currentIndex++;
                previous = current;
                current = current.next;
            }

            node.next = current;
            previous.next = node;
        }

        length++;
    };

    this.removeAt = function (element, index) {
        if(index < 0 || index >= length) {
            return;
        }

        var currentIndex = 0;
        var current = head;
        var previous;

        if(index === 0) {
            head = current.next;
        }
        else {
            while(currentIndex < index) {
                currentIndex++;
                previous = current;
                current = current.next;
            }

            previous.next = current.next;
        }

        length--;
    };

    this.indexOf = function (element) {
        var current = head;
        var index = -1;

        while(current){
            index++;
            if(current.element === element){
                return index;
            }
            current = current.next;
        }

        return -1;
    };

    this.elementAt = function (index) {
        var current = head;
        var count = 0;
        while (count < index){
            count ++;
            current = current.next
        }

        return current.element;
    };
 }