// Classic fibonacci implementation
// 2**n Complexity

const fib = (n) => {
    if (n <= 2) return 1;
    return fib(n - 1) + fib(n - 2);
};

// fib using memoization with linear complexity

const fibMemo = (n, memo = {}) => {
    memo[1] = 1;
    memo[2] = 1;
    for (let i = 3; i <= n; i++) {
	memo[i] = memo[i - 1] + memo[i - 2];
    }

    return memo[n];
}

//console.log(fib(50));
console.log(fibMemo(50));
