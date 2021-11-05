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

/**
 * ex: canConstructTabulation(abcdef, [ab, abc, cd, def, abcd]) => true
 *
 * How does the array looks like. We start of with true on index 0 because we can construct the empty array:
 * 0    1    2    3    4    5    6   => array indexlength 7: targetLength + 1
 * T    F    F    F    F    F    F   => array starting values
 * a    b    c    d    e    f        => chars associated with indexes. 
 *
 * We start at index 0: this means that we take into consideration the string up to that point, 
 * but not including a. Then move to index 1. Take into consideration string 'a'. And so on. At index 5 
 * take into consideration string 'abcde'. In the end if we have a true on a certain index, this means 
 * that we can form the word up to that index, but not including. That is why we need to have the array of length targetWord + 1. return the value from the last position of the array will really be the answer to the problem.
 *
 * canConstruct('', [..]) => true
 * Begin at index 0: How can we look ahead? Iterate over the words from the word banks. 
 * At index 0 we have a matching char of 'a'. Use the words from the word bank which start with the char at the current index.
 * ab, abc, abcd. Then update the array: use the words.length as the index to update. For example, when looking at 'ab' update the current index + ab.length = 2. table[2] = T. 
 * Same for 'abc' => table[3] = T
 * 'abcd' => table[4] = T.
 *
 * We are done with index 0. Move to next index. On index 1 we have a false. Ignore and continue.
 * On index 2 we have a true. On index 2 we are looking at substring 'ab'. Then look at the word bank
 * for words that start with the current char ('c'). We find 'cd'. Look 2 indexes ahead and place true. 
 * Continue. We reach index 3 (with char 'd'). In the word bank we have 'def'. Then place 3 indexes ahead the value true. Iterate till the end. 
 *
 * In the end the array will look like:
 * T F T T T F T
 *
 * Complexity:
 * m = target
 * n = wordBank.length
 * O(n*m^2)
 */
const canConstructTabulation = (target, wordBank) => {
  const table = Array(target.length + 1).fill(false);
  table[0] = true;

  for (let i = 0; i <= target.length; i++) {
    if (table[i]) {
      for (let word of wordBank) {
        // if the word matches the char at position i
        if (target.slice(i, i + word.length) === word) {
          table[i + word.length] = true;
        }
      }
    }
  }
  return table[target.length];
}

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

console.log('\ntabulation');
console.log(canConstructTabulation('', ['test'])); // true
console.log(canConstructTabulation('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // true
console.log(canConstructTabulation('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])); // false
console.log(canConstructTabulation('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'])); // true
console.log(canConstructTabulation('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
  'e',
  'ee',
  'eee',
  'eeee',
  'eeeee',
  'eeeeee'
])); // false
