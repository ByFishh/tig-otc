export type Immutable<T> = T extends (infer R)[]
  ? ReadonlyArray<Immutable<R>>
  : T extends Function
    ? T
    : T extends object
      ? { readonly [K in keyof T]: Immutable<T[K]> }
      : T;
