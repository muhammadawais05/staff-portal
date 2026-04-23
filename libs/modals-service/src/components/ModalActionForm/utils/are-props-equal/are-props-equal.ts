/* eslint-disable @typescript-eslint/no-unused-vars */
import shallowequal from 'shallowequal'
import { Dictionary } from '@staff-portal/utils'

import { Props } from '../../ModalActionForm'

/**
 * We completely ignore `adjustFormValues` and `mutation` props
 * We equal shallowly all fields of `operationVariables` object
 * We equal shallowly all other fields of main `props` object
 */
const arePropsEqual = (
  prevProps: Props<Dictionary>,
  nextProps: Props<Dictionary>
): boolean => {
  const {
    adjustFormValues: prevAdjustFormValues,
    mutation: prevMutation,
    ...restPrevProps
  } = prevProps
  const {
    adjustFormValues: nextAdjustFormValues,
    mutation: nextMutation,
    ...restNextProps
  } = nextProps

  return shallowequal(restPrevProps, restNextProps)
}

export default arePropsEqual
