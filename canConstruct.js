/**
 * Write a function canConstruct(target, wordBank) that accepts a target string and an array of strings.
 *
 * The function should return a boolean indicating whether or not the target can be constructed by concatenating 
 * elements of the wordBank array.
 *
 * You may reuse elements of wordBank as many times as needed.
 *
 * e.g. canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']) => true. 'abc' + 'def'
 * e.g. canConstruct('skateboard', ['bo', 'rd', 'ate', 'ska', 'sk', 'boar']) => false
 * e.g. canConstruct('', ['bo', 'rd']) => true
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
 const canConstruct = (target, wordBank, memo={}) => {
   if (target in memo) return memo[target];
   if (target.length === 0) {
     memo[target] = true;
     return true;
   }

   for (let word of wordBank) {
     let result; 
      if (target.startsWith(word)) {
        const substring = target.substring(target.indexOf(word) + word.length);
        result = canConstruct(substring, wordBank, memo);
      } 

     memo[target] = result; 
     if (result) {
      return true;
     }}

   return false;
 };

console.log(canConstruct('', ['test'])); // true
console.log(canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // true
console.log(canConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])); // false
console.log(canConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'])); // true
console.log(canConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
  'e',
  'ee',
  'eee',
  'eeee',
  'eeeee',
  'eeeeee'
])); // false
