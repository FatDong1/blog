interface Option {
    a: number,
    b: string | string[]
}
// Q: 在只能拿到Option的情况下，怎么拿到A

type res1 = Option['a'] extends (infer A) | (infer A)[] ? A : never

type GetElementType<T> = T extends (infer EleType)[] ? GetElementType<EleType> : T;
type GetPropertyElementType<T, Property extends keyof T> = T extends { [Item in Property]: infer Res } ?  GetElementType<Res>: never;

type res2 = GetPropertyElementType<Option, 'a'>;

// 首先 A | A[]这种可以通过递归来取，多少层数组都能取到元素类型 
// type GetElementType<T> = T extends (infer EleType)[] ? GetElementType<EleType> : T;
// 然后，要根据根据属性名来拿到属性值，然后通过GetElementType再拿到值的元素的类型， 
// type GetPropertyElementType<T, Property extends keyof T> = T extends { [Item in Property]: infer Res } ?  GetElementType<Res>: never;