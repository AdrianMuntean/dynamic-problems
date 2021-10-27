/**
 * Write a function `howSum(targetSum, numbers)` that takes in a target sum and an array of numbers as arguments.
 *
 * The function should return an array containing any combination of elements that add up to exactly the targetSum. 
 * If there is no combination that adds up to the targetSum, then return null.
 *
 * If there are multiple combinations possible, you may return any single one.
 *
 * You may assume that all input numbers are positive.
 *
 * e.g. howSum(7, [5, 4, 3, 7]) => [3, 4]
 * e.g. howSum(7, [5, 4, 3, 7]) => [7]
 * e.g. howSum(8, [5, 3, 2]) => [2, 2, 2, 2]
 * e.g. howSum(8, [5, 3, 2]) => [5, 3]
 * e.g. howSum(0, [5, 3, 2]) => []
 *
 * e.g Tree visualization: howSum(7, [5, 3, 4, 7]):
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
 * Classic implementation. Height of the tree is m. O(n**m * m) time (*m part comes from the spreading of the solution on line 43)
 * m = target sum
 * n = array length
 */
const howSum = (targetSum, numbers) => {
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  for (let num of numbers) {
    const remainder = targetSum - num;
    const result = howSum(remainder, numbers);
    if (result !== null) {
      return [...result, num];
    }
  }

  return null;
}

/**
 * time: O(n*m^2)
 * m = target sum
 * n = array length
 */
const howSumMemo = (targetSum, numbers, memo={}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  for (let num of numbers) {
    const remainder = targetSum - num;
    const result = howSumMemo(remainder, numbers, memo);
    if (result !== null) {
      memo[targetSum] = [...result, num];
      return memo[targetSum];
    }
  }

  memo[targetSum] = null;
  return null;
}

console.log(howSum(7, [2, 3])); // [3, 2, 3]
console.log(howSum(7, [5, 3, 4, 7])); // [4, 3]
console.log(howSum(7, [2, 4])); //null 
console.log(howSum(8, [2, 3, 5])); // [2, 2, 2, 2]
//console.log(howSum(300, [7, 14])); //null 

console.log('Using memo');
console.log(howSumMemo(7, [2, 3])); // [3, 2, 3]
console.log(howSumMemo(7, [5, 3, 4, 7])); // [4, 3]
console.log(howSumMemo(7, [2, 4])); //null 
console.log(howSumMemo(8, [2, 3, 5])); // [2, 2, 2, 2]
console.log(howSumMemo(300, [7, 14])); //null 
