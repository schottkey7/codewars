"""
Twice linear challenge solution.

Consider a sequence u where u is defined as follows:

The number u(0) = 1 is the first one in u.
For each x in u, then y = 2 * x + 1 and z = 3 * x + 1 must be in u too.
There are no other numbers in u.
Ex: u = [1, 3, 4, 7, 9, 10, 13, 15, 19, 21, 22, 27, ...]

1 gives 3 and 4, then 3 gives 7 and 10, 4 gives 9 and 13, then
7 gives 15 and 22 and so on...

Task:

Given parameter n the function dbl_linear (or dblLinear...) returns the
element u(n) of the ordered (with <) sequence u.

Example:

dbl_linear(10) should return 22
"""
import bisect
import sys
sys.path.append('..')

from helpers.test_wrapper import Test


def dbl_linear(n):
    lst, index, q = [], set(), [1]
    while len(lst) <= n:
        x = q.pop(0)
        if x not in index:
            bisect.insort(lst, x)
            index.add(x)
            bisect.insort(q, 2 * x + 1)
            bisect.insort(q, 3 * x + 1)
    return lst[-1]


def run_tests():
    with Test() as test:
        test.describe("dbl_linear")
        test.it("Basic tests")
        test.assert_equals(dbl_linear(10), 22)
        test.assert_equals(dbl_linear(20), 57)
        test.assert_equals(dbl_linear(30), 91)
        test.assert_equals(dbl_linear(50), 175)


if __name__ == '__main__':
    run_tests()
