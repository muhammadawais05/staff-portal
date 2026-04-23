import { JobBudgetDetails, JobHoursOverlap } from '@staff-portal/graphql/staff'

import { adjustFormData } from './adjust-form-data'
import { DefaultDraftJobFormType, DraftJobFormType } from '../../../types'
import { adjustSkillsValue } from './adjust-skills-value'

jest.mock('./adjust-skills-value', () => ({
  adjustSkillsValue: jest.fn()
}))

const adjustSkillsValueMock = adjustSkillsValue as jest.Mock
const skills = 'skills'

describe('adjustFormData', () => {
  it.each([
    {
      data: {
        budgetDetails: undefined,
        hasPreferredHours: 'false',
        industries: [],
        maxHourlyRate: undefined,
        talentCount: undefined,
        timeZoneName: undefined,
        hoursOverlap: undefined,
        workingTimeFrom: null,
        workingTimeTo: null,
        skills
      },
      expected: {
        budgetDetails: undefined,
        hasPreferredHours: false,
        industries: null,
        maxHourlyRate: null,
        talentCount: undefined,
        timeZoneName: null,
        hoursOverlap: null,
        workingTimeFrom: undefined,
        workingTimeTo: undefined,
        skills
      }
    },
    {
      data: {
        budgetDetails: JobBudgetDetails.UNCERTAIN_OF_BUDGET,
        hasPreferredHours: 'true',
        industries: [
          { value: '123', text: 'text1' },
          { value: '456', text: 'text2' }
        ],
        skills,
        maxHourlyRate: 10.5,
        talentCount: '2',
        timeZoneName: 'time-zone',
        hoursOverlap: JobHoursOverlap.HOUR_10,
        workingTimeFrom: 'time-from',
        workingTimeTo: 'time-to'
      },
      expected: {
        budgetDetails: JobBudgetDetails.UNCERTAIN_OF_BUDGET,
        hasPreferredHours: true,
        industries: [{ id: '123' }, { id: '456' }],
        skills,
        maxHourlyRate: null,
        talentCount: 2,
        timeZoneName: 'time-zone',
        hoursOverlap: JobHoursOverlap.HOUR_10,
        workingTimeFrom: 'time-from',
        workingTimeTo: 'time-to'
      }
    },
    {
      data: {
        budgetDetails: JobBudgetDetails.RATE_SPECIFIED,
        maxHourlyRate: '10.5'
      },
      expected: {
        budgetDetails: JobBudgetDetails.RATE_SPECIFIED,
        hasPreferredHours: false,
        hoursOverlap: null,
        industries: null,
        skills,
        maxHourlyRate: 10,
        talentCount: undefined,
        timeZoneName: null,
        workingTimeFrom: undefined,
        workingTimeTo: undefined
      }
    }
  ] as {
    data: DraftJobFormType | DefaultDraftJobFormType
    expected: (DraftJobFormType | DefaultDraftJobFormType) & {
      hasPreferredHours: boolean
    }
  }[])('returns expected data', ({ data, expected }) => {
    adjustSkillsValueMock.mockReturnValue(skills)

    const adjustedData = adjustFormData(data)

    expect(adjustedData).toEqual(expected)
  })
})
