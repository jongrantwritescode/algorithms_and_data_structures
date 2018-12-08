/**
 * Insertion Sort
 * O(N Squared) Time
 * O(1) Memory
 * Useful for small arrays, low memory, mostly sorted
 */
function InsertionSort (arr) {
	for(let i = 1; i < arr.length; i++) {
  	    for(let j = 0; j < i; j++) {
            if(arr[i] < arr[j]) {
            let temp = arr.splice(i, 1);
            arr.splice(j, 0, temp[0]);
        }
    }
  }
  
  console.log(arr);
}

InsertionSort( [2,5,1,3,4,8,6,7,2]);  //1,2,2,3,4,5,6,7,8

/**
 * Merge Sort
 * O(n log n)
 * Stable
 */

function MergeSort(arr){
    console.log("A: " + arr);
if(!arr || arr.length <= 1) {
    return arr;
}

let pivot = Math.floor(arr.length / 2);

let left = MergeSort(arr.slice(0, pivot));
let right = MergeSort(arr.slice(pivot));

let merge = [];
let l = 0;
let r = 0;
while(l < left.length && r < right.length){
  if(left[l] < right[r]){
    merge.push(left[l++]);
  }
  else{
    merge.push(right[r++]);
 }
}  

merge = merge.concat(left.slice(l)).concat(right.slice(r))
console.log("M: " + merge);
//remaining part needs to be addred to the result
return merge;
}


console.log(MergeSort([2,5,1,3,4,8,6,7,2]));  //1,2,2,3,4,5,6,7,8


/**
 * QUICK SORT
 */

// classic implementation (with Hoare or Lomuto partition scheme, you can comment either one method or the other to see the difference)
function QuickSort(array, left, right) {
    left = left || 0;
    right = right || array.length - 1;
  
    var partitionIndex = partition(array, left, right); // you can play with both partition
  
    if(left < partitionIndex - 1) {
        QuickSort(array, left, partitionIndex - 1);
    }
    if(right > partitionIndex) {
        QuickSort(array, partitionIndex, right);
    }
    return array;
}

// Hoare partition scheme, it is more efficient than the Lomuto partition scheme because it does three times fewer swaps on average
function partition(array, left, right) {
    var pivot = Math.floor((left + right) / 2 );
  
    while(left <= right) {
      while(array[left] < array[pivot]) {
        left++;
      }
      while(array[right] > array[pivot]) {
        right--;
      }
      if(left <= right) {
        swap(array, left, right);
        left++;
        right--;
      }
    }
    return left;
  }

// swap function helper
function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

// array to sort
QuickSort([9, 2, 5, 6, 4, 3, 7, 10, 1, 8]);