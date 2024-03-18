export type CommaSeparated<T extends string, U extends T = T> = T extends U
  ? [U] extends [T]
    ? T
    : `${`${T}, ` | ""}${CommaSeparated<Exclude<U, T>>}`
  : never;
