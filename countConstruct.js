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

console.log(countConstruct('', ['test'])); // 1
console.log(countConstruct('test', ['t', 'est', 'te', 'st', 'test'])); // 3
console.log(countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // 1 
console.log(countConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'])); // 4
console.log(countConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])); // 0
console.log(countConstruct('purple', ['purp', 'p', 'ur', 'le', 'purple'])); // 3
