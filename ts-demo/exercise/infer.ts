type inferDemo<S> = S extends {a: infer V, b: infer V} ? V : number

let a:inferDemo<string> = 1
let b:inferDemo<{a: string, b: string}> = 'str'