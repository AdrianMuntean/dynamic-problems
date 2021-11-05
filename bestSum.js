/**
 * Write a function `bestSum(targetSum, numbers)` that takes in a target sum and an array of numbers as arguments.
 *
 * The function should return an array containing the shortest combination of elements that add up to exactly the targetSum. 
 * If there is no combination that adds up to the targetSum, then return null.
 * If there is a tie for the shortest combination, you may return any one of the shortest.
 *
 * You may assume that all input numbers are positive.
 *
 * e.g. bestSum(7, [5, 4, 3, 7]) => [7]
 * e.g. bestSum(8, [5, 3, 2]) => [3, 5]
 * e.g. bestSum(0, [5, 3, 2]) => []
 *
 * e.g Tree visualization: bestSum(7, [5, 3, 4, 7]):
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
 * O(n*m^2) time (*m part comes from the spreading of the solution on line 43)
 * m = target sum
 * n = array length
 */
const bestSumMemo = (targetSum, numbers, memo={}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  for (let num of numbers) {
    const remainder = targetSum - num;
    const result = bestSumMemo(remainder, numbers, memo);
    if (result != null) {
      const newSolutionLength = result.length + 1;
      if ((newSolutionLength < (memo[targetSum] || []).length) || !memo[targetSum]) {
        memo[targetSum] = [...result, num];
      }
    }
  }

  return memo[targetSum] || null;
}

/*
 * See canSum.js and howSum.js for more details on how to approach this from a tabulation perspective. 
 * O(n*m^2) time complexity
 */
const bestSumTabulation = (targetSum, numbers) => {
  const table = Array(targetSum + 1).fill(null);
  table[0] = [];

  for (let i = 0; i <= targetSum; i++) {
    if (table[i] !== null) {
      for (let num of numbers) {
        // check the shorter array
        const combination = [...table[i], num];
        if (!table[i + num] || combination.length < table[i + num].length)
          table[i + num] = combination;
      }
    }
  }
  return table[targetSum];  
}

console.log(bestSumMemo(7, [2, 3])); // [3, 2, 3]
console.log(bestSumMemo(7, [5, 3, 4, 7])); // [7]
console.log(bestSumMemo(7, [2, 4])); //null 
console.log(bestSumMemo(8, [2, 3, 5])); // [3, 5]
console.log(bestSumMemo(8, [1, 4, 5])); // [4, 4]
console.log(bestSumMemo(100, [1, 2, 5, 25])) // [25, 25, 25, 25]
// console.log(bestSumMemo(300, [7, 14])); //null 

console.log('\ntabulation');
console.log(bestSumTabulation(7, [2, 3])); // [3, 2, 3]
console.log(bestSumTabulation(7, [5, 3, 4, 7])); // [7]
console.log(bestSumTabulation(7, [2, 4])); //null 
console.log(bestSumTabulation(8, [2, 3, 5])); // [3, 5]
console.log(bestSumTabulation(8, [1, 4, 5])); // [4, 4]
console.log(bestSumTabulation(100, [1, 2, 5, 25])) // [25, 25, 25, 25]
console.log(bestSumTabulation(300, [7, 14])); //null 
