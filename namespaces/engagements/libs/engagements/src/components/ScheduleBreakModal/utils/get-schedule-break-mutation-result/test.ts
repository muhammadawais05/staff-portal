import { ScheduleType } from '../../types'
import { getScheduleBreakMutationResult } from './get-schedule-break-mutation-result'

describe('#getScheduleBreakMutationResult', () => {
  it('returns undefined for missing data', () => {
    const result = getScheduleBreakMutationResult({
      scheduleType: ScheduleType.CREATE
    })

    expect(result).toBeUndefined()
  })

  it('returns schedule a break mutation data', () => {
    const data = {
      scheduleEngagementBreak: {
        __typename: 'ScheduleEngagementBreakPayload',
        errors: [],
        success: true
      }
    }
    const result = getScheduleBreakMutationResult({
      scheduleType: ScheduleType.CREATE,
      data
    })

    expect(result).toStrictEqual(data.scheduleEngagementBreak)
  })

  it('returns reschedule a break mutation data', () => {
    const data = {
      rescheduleEngagementBreak: {
        __typename: 'RescheduleEngagementBreakPayload',
        errors: [],
        success: true
      }
    }
    const result = getScheduleBreakMutationResult({
      scheduleType: ScheduleType.EDIT,
      data
    })

    expect(result).toStrictEqual(data.rescheduleEngagementBreak)
  })
})
