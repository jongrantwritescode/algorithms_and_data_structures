// max contiguous
function maxSumInContiguousArray(arr) {
    if(arr.length <= 1) return arr[0];
    
    var max = -Infinity;
    var maxAccum = 0;

    arr.forEach(function(val) {
        maxAccum += val;

        if(max < maxAccum) {
            max = maxAccum;
        }
        
        if(maxAccum < 0) {
            maxAccum = 0;
        }
    });

    
}

var arr = [-2, -3, 4, -1, -2, 1, 5, -3];
console.log(max);


// Find Min 3 Elements O(n*k)
function findMinK(elements, k) {
    for(var i = 0 ; i < k; i++) {
        for(var j = i +1 ; j < elements.length ; j ++) {
        if(elements[j] < elements[i]) {
          var value = elements[j];
          elements[j] = elements[i];
          elements[i] = value;
        }
      }
    }
    
    return elements.slice(0,3);
  }
  
  console.log(findMinK([0,1,2,-1,4,5], 3));


// Find Max 3 Elements O(n*k)
function findMaxK(elements, k) {
    for(var i = 0 ; i < k; i++) {
        for(var j = i +1 ; j < elements.length ; j ++) {
        if(elements[j] > elements[i]) {
          var value = elements[j];
          elements[j] = elements[i];
          elements[i] = value;
        }
      }
    }
    
    return elements.slice(0,3);
  }
  
  console.log(findMaxK([0,1,2,-1,4,5], 3));

  //find min k distances
  function findMinKDistance(elements, k) {
    for(var i = 0 ; i < k; i++) {
        for(var j = i +1 ; j < elements.length ; j ++) {
        if(distance(elements[j]) < distance(elements[i])) {
          var location = elements[j];
          elements[j] = elements[i];
          elements[i] = location;
        }
      }
    }
    
    return elements.slice(0,3);
  }
  
  function distance(location) {
      return (location[0] * location[0]) + (location[1] * location[1]);
  }
  console.log(findMinKDistance([[1,1],[2,3],[2,4],[0,0]], 3));