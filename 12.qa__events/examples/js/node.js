var factorial = function (n, a) {
    return n < 2 ? a : factorial(n - 1, a * n);
};

console.log(factorial(10, 1));