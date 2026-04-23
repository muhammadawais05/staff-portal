import {
  BreakType,
  CommonScheduleMutationsType,
  FormValues,
  ScheduleType
} from '../../types'

export const getMutationInput = ({
  values,
  activeTab,
  engagementId,
  engagementBreakId,
  scheduleType
}: {
  values: FormValues
  activeTab: BreakType
  engagementId: string
  engagementBreakId?: string
  scheduleType: ScheduleType
}): CommonScheduleMutationsType => {
  const baseInput = {
    startDate: values.startDate,
    endDate: values.endDate,
    singleDay: activeTab === BreakType.SINGLE,
    messageToClient: values.messageToClient
  }

  if (scheduleType === ScheduleType.CREATE) {
    return {
      ...baseInput,
      comment: values.comment,
      engagementId: engagementId,
      reasonId: values.reasonId
    } as CommonScheduleMutationsType
  }

  return {
    ...baseInput,
    engagementBreakId
  } as CommonScheduleMutationsType
}
