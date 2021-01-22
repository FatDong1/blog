declare const $CombinedState: unique symbol

export type CombinedState<S> = { readonly [$CombinedState]?: undefined } & S

/**
 * Recursively makes combined state objects partial. Only combined state _root
 * objects_ (i.e. the generated higher level object with keys mapping to
 * individual reducers) are partial.
 */
export type PreloadedState<S> = Required<S> extends {
    [$CombinedState]: undefined
  }
    ? S extends CombinedState<infer S1>
      ? {
          [K in keyof S1]?: S1[K] extends object ? PreloadedState<S1[K]> : S1[K]
        }
      : never
    : {
        [K in keyof S]: S[K] extends string | number | boolean | symbol
          ? S[K]
          : PreloadedState<S[K]>
      }
  