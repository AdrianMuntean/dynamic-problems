// Classic fibonacci implementation
// 2**n Complexity
const fib = (n) => {
    if (n <= 2) return 1;
    return fib(n - 1) + fib(n - 2);
};


const fibMemo = (n, memo={}) => {
  if (n in memo) return memo[n];
  if (n <= 2) {
    memo[n] = 1;
    return 1;
  }

  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// fib using memoization (tabulation) with linear complexity
// tabulation = building a linear table. Build up all the values
// O(n) complexity. Works nice without recursion :)
const fibTabulation = (n) => {
    memo = [];
    memo[1] = 1;
    memo[2] = 1;
    for (let i = 3; i <= n; i++) {
	    memo[i] = memo[i - 1] + memo[i - 2];
    }

    return memo[n];
}

//console.log(fib(50));
console.log(fibTabulation(50));
console.log(fibMemo(50));
