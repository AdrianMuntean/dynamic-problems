# Dynamic programming?

## Def
 1. The pattern of overlapping subproblems.
 2.  Any instanace where the problem can be decomposed into smaller instances of the same problem. 
 3.  An optimization over plain recursion. 

## The idea
The idea is to simply store the results of subproblems, so that we don't have to re-compute them
when needed later. This simple optimisation reduces time complexities from exponential to
polynomial

## Memoization recipe
 1. Make it work
  - visualize the problem as a tree
  - implement the tree using recursion (brute force)
  - test it
 2. Make it efficient 
  - add a memo object
  - add a base case to return memo values
  - store return values into the memo

## [can|how|best]Sum breakdown
  - canSum -> "Can you do it? yes/no = Decision problem
  - howSum -> "How will you do it?" = Combinatoric problem
  - bestSum -> "What is the 'best' way to do it?" = Optimization problem
