/**
 * Write a function countConstruct(target, wordBank) that accepts a target string and an array of strings.
 *
 * The function should return the number of ways that the `target` can be constructed by concatenating elements 
 * of the `wordBank` array.
 *
 * You may reuse elements of wordBank as many times as needed.
 *
 * e.g. countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']) => 1. 'abc' + 'def'
 * e.g. countConstruct('skateboard', ['bo', 'rd', 'ate', 'ska', 'sk', 'boar']) => 0
 * e.g. countConstruct('', ['bo', 'rd']) => 1
 *
 * e.g. tree for input: 'abcdef': ['ab', 'abc', 'cd', 'def', 'abcd'])
 *                            abcdef
 *                          /   |    \
 *                      ab /    |abc  \ abcd
 *                        /     |      \
 *                    cdef      def     ef*
 *                    |         |       
 *                    |cd       |def
 *                    |         |
 *                    ef*      "" 
 *
 *             * = not possible to decompose further
 *
 */
 /**
  * O(n*m^2) time
  * m = target.length
  * n = wordBank.length
  */
 const countConstruct = (target, wordBank, memo={}) => {
   if (target in memo) return memo[target];
   if (target.length === 0) {
     return 1;
   }

   for (let word of wordBank) {
     let result; 
      if (target.startsWith(word)) {
        const substring = target.substring(target.indexOf(word) + word.length);
        result = countConstruct(substring, wordBank, memo);
      } 
    if (result) {
     memo[target] = (memo[target] || 0) + result; 
    }
   }

   return memo[target] || 0;
 };

/**
 * See canConstruct.js for more details about this version
 * countConstruct('', [...]) => 1
 *
 *
 * The array for countConstruct(purple, [purp, p, ur, le, purpl]) -> 2
 * 0 1 2 3 4 5 6 
 * 1 0 0 0 0 0
 * p u r p l e  
 *
 * We have 1 on first index since we can construct the empty string. 
 * When we are at some index we consider the substring from 0 up to that index exclusive. 
 * Then move to the next non 0 value and add to the index = with the length of the word bank which starts with that letter. 
 *
 * In the end the array will look like this
 * 0 1 2 3 4 5 6
 * 1 1 0 1 2 1 2
 *
 * table[6] = 2 => the answer
 * table[4] = 2 => there are 2 ways to create purp (the target till index 4 (exclusive))
 * 
 * Complexity:
 * m = target
 * n = wordBank.length
 *
 * O(m^2*n) time
 */
const countConstructTabulation = (target, wordBank) => {
  const table = Array(target.length + 1).fill(0);
  table[0] = 1; // seed value

  for (let i = 0; i <= target.length; i++) {
    for (let word of wordBank) {
      if (target.slice(i, i + word.length) === word) {
        table[i + word.length] += table[i];
      }
    }
  }

  return table[target.length];
}

console.log(countConstruct('', ['test'])); // 1
console.log(countConstruct('test', ['t', 'est', 'te', 'st', 'test'])); // 3
console.log(countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // 1 
console.log(countConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'])); // 4
console.log(countConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])); // 0
console.log(countConstruct('purple', ['purp', 'p', 'ur', 'le', 'purple'])); // 3
console.log('\ntabulation');
console.log(countConstructTabulation('', ['test'])); // 1
console.log(countConstructTabulation('test', ['t', 'est', 'te', 'st', 'test'])); // 3
console.log(countConstructTabulation('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // 1 
console.log(countConstructTabulation('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'])); // 4
console.log(countConstructTabulation('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])); // 0
console.log(countConstructTabulation('purple', ['purp', 'p', 'ur', 'le', 'purple'])); // 3
