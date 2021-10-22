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
console.log(canSumMemo(300, [7, 14])); // false
