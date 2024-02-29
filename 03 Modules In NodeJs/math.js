function add(a, b) {
    return a + b;
}

function square(a, b) {
    return a ** b;
}

// module.exports = add;
// module.exports = square; // this will overwrite add function (not useable)

// ideal way is 

module.exports = {
    addFun: add,
    square
}