/**
 * Write a function allConstruct(target, wordBank) that accepts a target string and an array of strings.
 *
 * The function should return all the ways that the target can be constructed by concatenating elements of the wordBank array
 *
 * You may reuse elements of wordBank as many times as needed.
 *
 * e.g. allConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl']) => [['purp', 'le'], ['p', 'ur', 'p' , 'le]]
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
  * O(n^m) time
  * m = target.length
  * n = wordBank.length
  */
 const allConstruct = (target, wordBank) => {
   if (target.length === 0) {
     return [[]];
   }
  
  const solution = [];

   for (let word of wordBank) {
     let result = []; 
      if (target.startsWith(word)) {
        const substring = target.substring(target.indexOf(word) + word.length);
        result = allConstruct(substring, wordBank);
        const targetWays = result.map(r => [word, ...r]);
        solution.push(...targetWays);
      }
   }

  return solution;
 };

console.log(allConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl'])); // [['purp', 'le'], ['p', 'ur', 'p' , 'le]]
console.log(allConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd', 'ef', 'c'])); // [[ab, cd, ef],[ab, c, def], [abc, def], [abcd, ef]]; 
console.log(allConstruct('hello', ['cat', 'dog', 'mouse'])); // []
console.log(allConstruct('aaaaaaaaaaaaaaaaaaaaaaaaz', ['a', 'aa', 'aaa', 'aaaa', 'aaaaa'])); // []
