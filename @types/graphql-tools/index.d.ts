/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="@graphql-tools/mock" />

type ChangeEventTarget =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement

type Present<T> = Exclude<T, null | undefined>

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
type ArrayItem<T extends unknown[]> = T extends (infer U)[] ? U : never

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

type TypeOrMockList<T> =
  | (T extends any[]
    ? RecursivePartial<T> | ((args: any) => MockList)
    : RecursivePartial<T>)
  | null
  | ((args: any) => RecursivePartial<T>)
