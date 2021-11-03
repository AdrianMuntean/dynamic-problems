/**
 * Write a function `canSum(targetSum, numbers)` that takes in a target sum and an array of numbers as arguments.
 *
 * The function should return a boolean indicating whether or not it is possible to generate the targetSum using numbers
 * from the array.
 *
 * You may use an element of the array as many times as needed.
 * You may assume that all input numbers are positive.
 *
 * e.g. canSum(7, [5, 4, 3, 7]) => true
 *      canSum(7, [2, 4]) => false
 *
 *                7
 *         /-5 |-3 |-4  \-7 
 *        /    |   |     \
 *       2     |4  |3     \0
 *           /  \   \
 *          /-3  \-4 \-3
 *         1      0   0
 *
 * The places where I have a 0 in the leaf are all valid solutions to the problem. If we find one then it's enough. If the problem 
 * was asking for the number of solutions, then we would have to count the paths
 */

/**
 * Classic implementation. Height of the tree is m. O(n**m) time
 * m = target sum
 * n = array length
 */
const canSum = (targetSum, numbers) => {
  if (targetSum === 0) return true;
  if (targetSum < 0) return false;

  for (let num of numbers) {
    if(canSum(targetSum - num, numbers)) {
      return true;
    }
  }

  return false;
};

/**
 * Memoized version. O(m * n) time 
 * m = target sum
 * n = array length
 */
const canSumMemo = (targetSum, numbers, memo = {}) => {
  if (targetSum === 0) return true;
  if (targetSum < 0) return false;
  if (targetSum in memo) {
    return memo[targetSum];
  }

  for (let num of numbers) {
    const canBeSummed = canSumMemo(targetSum - num, numbers, memo);
    memo[targetSum - num] = canBeSummed;
    if (canBeSummed) {
      return true;
    }
  }

  return false;
  
};

/**
 * ex: canSum(7, [5, 3, 4]) => true
 * If the problem returns a boolean, then start with 'false' values.
 * since canSum(0, [...]) => true, then array[0] = true
 * true on a specific index actually means that I can create that index.
 * Starting off from 0 then take the first element from array and place true on 
 * index 5. Cause I can also sum to 5. Then on index 3 also place a true, since 3 can
 * also be created. Same for 4. 
 *
 * After all the input array is iterated over, then move over to the next index with true value. 
 * Index 3 is reached (since we placed true on the first iteration). Then start again with the 
 * iteration of the array and place true on 5+3 index. But since that is out of bounds, just ignore it. Mark 6 and 7 (3, 4 from the index)
 * And so on. 
 *
 * In the end my array will look something like
 * 0 1 2 3 4 5 6 7
 * T F F T T T T T 
 *
 * And return array[7]
 *
 * Complexity:
 * m = targetSum
 * n = numbers.length
 *
 * O(nm) time
 * O(m) space
 */
const canSumTabulation = (targetSum, numbers) => {
  const table = Array(targetSum + 1).fill(false);
  
  table[0] = true;

  for (let i = 0; i <= table.length; i++) {
    if (table[i]) {
      for (let num of numbers) {
        if (i + num <= targetSum) {
          table[i + num] = true;
        }
      }
    }
  }

  return table[targetSum];
}

console.log(canSum(7, [2, 3])); // true
console.log(canSum(7, [5, 3, 4, 7])); // true
console.log(canSum(7, [2, 4])); // false
console.log(canSum(8, [2, 3, 5])); // true
// console.log(canSum(300, [7, 14])); // false
console.log('memo:');

console.log(canSumMemo(7, [2, 3])); // true
console.log(canSumMemo(7, [5, 3, 4, 7])); // true
console.log(canSumMemo(7, [2, 4])); // false
console.log(canSumMemo(8, [2, 3, 5])); // true

console.log('tabulation');
console.log(canSumTabulation(7, [2, 3])); // true
console.log(canSumTabulation(7, [5, 3, 4, 7])); // true
console.log(canSumTabulation(7, [2, 4])); // false
console.log(canSumTabulation(8, [2, 3, 5])); // true
console.log(canSumTabulation(300, [7, 14])); // false
