import { BreakType, FormValues, ScheduleType } from '../../types'
import { getMutationInput } from './get-mutation-input'

jest.mock('@staff-portal/date-time-utils', () => ({
  formatDate: (date: Date) => date
}))

const defaultFormValues: FormValues = {
  startDate: '2020-10-16T00:00:00+00:00',
  endDate: '2020-11-16T00:00:00+00:00',
  reasonId: 'Reason-11',
  comment: 'Comment-1',
  messageToClient: 'Hello dear client'
}

const engagementId = 'engagement-id'
const engagementBreakId = 'engagement-break-id'

describe('#getMutationInput', () => {
  it('returns input for create a break mutation', () => {
    const result = getMutationInput({
      values: defaultFormValues,
      scheduleType: ScheduleType.CREATE,
      activeTab: BreakType.MULTI,
      engagementId
    })

    expect(result).toStrictEqual({
      startDate: defaultFormValues.startDate,
      endDate: defaultFormValues.endDate,
      singleDay: false,
      messageToClient: defaultFormValues.messageToClient,
      comment: defaultFormValues.comment,
      engagementId: engagementId,
      reasonId: defaultFormValues.reasonId
    })
  })

  it('returns input for edit a break mutation', () => {
    const result = getMutationInput({
      values: defaultFormValues,
      scheduleType: ScheduleType.EDIT,
      activeTab: BreakType.SINGLE,
      engagementId,
      engagementBreakId
    })

    expect(result).toStrictEqual({
      startDate: defaultFormValues.startDate,
      endDate: defaultFormValues.endDate,
      singleDay: true,
      messageToClient: defaultFormValues.messageToClient,
      engagementBreakId: engagementBreakId
    })
  })
})
