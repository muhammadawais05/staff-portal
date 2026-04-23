import { EngagementBreakInitialValues, FormValues } from '../../types'

export const getFormInitialValues = (
  values?: EngagementBreakInitialValues
): FormValues | undefined => {
  if (!values) {
    return undefined
  }

  return {
    startDate: values.startDate,
    endDate: values.endDate ?? undefined,
    messageToClient: values.messageToClient || undefined
  }
}
