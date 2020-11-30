let x = 10
function fn1 (x) {return x + 1}
function fn2(x) {return x * 2}
function fn3(x) {return x + 3}
function fn4(x) {return x + 4}

// 假设我这里想求得这样的值
let a = fn1(fn2(fn3(fn4(x)))) // (10 + 4 + 3) * 2 + 1 = 35

// 根据compose的功能，我们可以把上面的这条式子改成如下：
let composeFn = [fn1, fn2, fn3, fn4].reduce((a, b) => (...args) => a(b(...args)))
let b = composeFn(x) // 理论上也应该得到35

console.log(b)