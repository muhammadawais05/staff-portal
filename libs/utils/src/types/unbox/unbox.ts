/* eslint-disable @typescript-eslint/no-explicit-any */
type Unbox<TList extends any[]> = TList extends (infer TValue)[]
  ? TValue
  : never

export default Unbox
