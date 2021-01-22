type Diff<T, U> = T extends U ? never : T; // 找出T的差集
type Filter<T, U> = T extends U ? T : never; // 找出交集

type T30 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // => "b" | "d"
// <"a" | "b" | "c" | "d", "a" | "c" | "f">
// 相当于
// <'a', "a" | "c" | "f"> |  <'b', "a" | "c" | "f"> | <'c', "a" | "c" | "f"> | <'d', "a" | "c" | "f">
type T31 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // => "a" | "c"
// <"a" | "b" | "c" | "d", "a" | "c" | "f"> 同上

let demo1: Diff<number, string> = 2; // => number
let demo2:T30 = 'b'

// 如果T不存在, 就返回S; 否则返回S & T合并之后的类型
type state<S, T = never> = [T] extends [never] ? S : S & T

interface apple {
    name: string
}

let obj1:state<apple> = {
    name: '1'
}

interface fruit {
    color: string
}

let obj2:state<apple, fruit> = {
    name: 'test',
    color: 'green'
}