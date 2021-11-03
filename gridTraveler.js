/*
    Say that you are a traveler on a 2D grid. You begin in the top-left corner and your goal is to
    travel to the bottom-right corner. You may only move down or right. 

    In how many ways can you travel to the goal on a grid with dimensions m * n.

    ex: 
      gridTraveler(1, 1) => 1
      gridTraveler(2, 3) => 3
      gridTraveler(3, 3) => 6

    How to try and solve this?
     - start with an example. Not a trivial one and not a really big one. eg. gridTraveler(3, 3)
     - try and decrease the problem size. You can reuse past computations.
     - try to visualize a breakdown of the problem using a tree.
         (3,3)
	/     \
      (2,3)  (3,2)
     /   \
   (1,3) (2,2)
  /   \
(0,3)# (1,2)
          \
	 (1,1) => this returns 1  
# returns 0
*/

// Classic implementation. 2**(n+m) complexity.
const gridTraveler = (m, n) => {
    if (m === 1 && n === 1) return 1;
    if (m === 0 || n === 0) return 0;

    return gridTraveler(m - 1, n) + gridTraveler(m, n - 1);

};

const gridTravelerMemo = (m, n, memo={}) => {
    const key = `${m}|${n}`;
    if (key in memo) return memo[key];
    if (m === 1 && n === 1) return 1;
    if (m === 0 || n === 0) return 0;
   
    memo[key] = gridTravelerMemo(m - 1, n, memo) + gridTravelerMemo(m, n - 1, memo);
    return memo[key];
}

// O(mn) time, since we are iterating over the table
const gridTravelerTabulation = (m, n) => {
    // create the 2d array
    // since this is a counting problem, start with 0s
    const table = Array(m + 1)
        .fill()
        .map(() => Array(n + 1).fill(0))
    table[1][1] = 1;
    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        const current = table[i][j];
        if (j + 1 <= n) table[i][j + 1] += current;
        if (i + 1 <= m) table[i + 1][j] += current;
      }
    }

  return table[m][n];
}

// console.log(gridTraveler(20, 20)); => too much time
console.log(gridTravelerMemo(21, 21)); // 137846528820 
console.log(gridTravelerTabulation(3, 3));
console.log(gridTravelerTabulation(21, 21)); // 137846528820 

