import { MutableState } from '@toptal/picasso-forms'

interface MutatorParams<State, Value> {
  changeValue: (
    state: MutableState<State>,
    name: string,
    utils: (value: Value) => Value
  ) => void
}

export const revalidate = <State, Value>(
  [name]: [string],
  state: MutableState<State>,
  { changeValue }: MutatorParams<State, Value>
) => {
  // change the value to the same value, thus
  // triggering a re-validation of the same value
  changeValue(state, name, value => value)
}
