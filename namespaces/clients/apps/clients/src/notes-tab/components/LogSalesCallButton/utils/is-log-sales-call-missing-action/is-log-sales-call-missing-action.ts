import {
  LogSalesCallBusinessAction,
  LogSalesCallMissingAction
} from '../../../../types'

export const isLogSalesCallMissingAction = (
  item: LogSalesCallBusinessAction
): item is LogSalesCallMissingAction =>
  (item as LogSalesCallMissingAction) ===
  LogSalesCallMissingAction.CHECK_COMPLIANCE
