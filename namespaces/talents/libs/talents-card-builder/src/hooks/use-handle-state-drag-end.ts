import { arrayMove, DragEndEvent } from '@staff-portal/sortable'
import { useForm } from '@toptal/picasso-forms'
import { Dictionary, Unbox } from '@staff-portal/utils'

import { PitcherState, PitcherHighlights } from '../types'

type FunctionMappingFunction<TValue> = (stateValue: TValue) => string

type UseHandleStateDragEndArguments<TValueItem extends string | Dictionary> =
  TValueItem[] extends string[]
    ? never
    : [functionMapping: (stateValue: TValueItem) => string]

const genericFunctionMapping: FunctionMappingFunction<string> = (id: string) =>
  id

export const useHandleStateDragEnd = <
  TStateKey extends keyof PitcherHighlights,
  TValueItem extends Unbox<PitcherHighlights[TStateKey]>
>(
  stateKey: TStateKey,
  ...[functionMapping]: UseHandleStateDragEndArguments<TValueItem>
) => {
  const form = useForm<PitcherState>()
  const functionMappingWithDefault = functionMapping ?? genericFunctionMapping

  return ({ over, active }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      return
    }

    const state = form.getState().values.highlights
    const value = state[stateKey] as TValueItem[]
    const oldIndex = value.findIndex(
      item => functionMappingWithDefault(item) === active.id
    )
    const newIndex = value.findIndex(
      item => functionMappingWithDefault(item) === over.id
    )

    form.change('highlights', {
      ...state,
      [stateKey]: arrayMove(value, oldIndex, newIndex)
    })
  }
}
