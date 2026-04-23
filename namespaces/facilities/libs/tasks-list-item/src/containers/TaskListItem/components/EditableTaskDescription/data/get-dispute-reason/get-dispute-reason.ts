import {
  SearchChroniclesVariables,
  useSearchChroniclesQuery
} from '@staff-portal/chronicles'
import { AsyncTooltipWrapperDataHookOptions } from '@staff-portal/ui'

export const getDisputeReasonDataHook =
  (variables: SearchChroniclesVariables) =>
  (tooltipOptions: AsyncTooltipWrapperDataHookOptions) =>
    useSearchChroniclesQuery(variables, {
      ...tooltipOptions
    })
