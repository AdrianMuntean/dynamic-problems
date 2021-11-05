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

/**
 * allConstruct('', [..]) => [[]]
 * allConstruct('birds', [...]) => []
 *
 * See countConstruct.js for a more detailed explanation
 * 1. Create the array with target.length + 1
 * 2. Fill with 1d emtpy arrays
 * 3. Init the index 0 with [[]]
 * 4. Use the same logic as for the other problems
 *
 * In the end the array will look like this for example allConstruct(abcdef, [ab, abc, cd, def, abcd, ef, c])
 * 0 [ [] ]
 * 1 []
 * 2 [ [ab] ]
 * 3 [ [abc], [ab, c] ]
 * 4 [ [abcd], [ab, cd] ]
 * 5 []
 * 6 [ [abc, def], [ab, c, def], [abcd, ef], [ab, cd, ef] ]
 * Complexity: O(n^m) time
 */
const allConstructTabulation = (target, wordBank) => {
  const table = Array(target.length + 1).fill().map(() => []);
  table[0] = [[]];
  
  for (let i = 0; i <= target.length; i++) {
    for (let word of wordBank) {
      if (target.slice(i, i + word.length) === word) {
        const combinations = table[i].map(subArray => [...subArray, word]);
        table[i + word.length].push(...combinations);
      }
    }
  }

  return table[target.length];
}

console.log(allConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl'])); // [['purp', 'le'], ['p', 'ur', 'p' , 'le]]
console.log(allConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd', 'ef', 'c'])); // [[ab, cd, ef],[ab, c, def], [abc, def], [abcd, ef]]; 
console.log(allConstruct('hello', ['cat', 'dog', 'mouse'])); // []
console.log(allConstruct('aaaaaaaaaaaaaaaaaaaaaaaaz', ['a', 'aa', 'aaa', 'aaaa', 'aaaaa'])); // []

console.log('\nTabulation');
console.log(allConstructTabulation('purple', ['purp', 'p', 'ur', 'le', 'purpl'])); // [['purp', 'le'], ['p', 'ur', 'p' , 'le]]
console.log(allConstructTabulation('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd', 'ef', 'c'])); // [[ab, cd, ef],[ab, c, def], [abc, def], [abcd, ef]]; 
console.log(allConstructTabulation('hello', ['cat', 'dog', 'mouse'])); // []
