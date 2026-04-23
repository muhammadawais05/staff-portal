import { ProposeEngagementEndInput } from '@staff-portal/graphql/staff'

import { isEstimatedDateChanged } from './is-estimated-date-changed'

describe('isEstimatedDateChanged', () => {
  it.each([
    {
      key: 'unknown',
      oldValues: {
        endDate: '2021-10-15'
      },
      nextValues: {
        endDate: '2021-10-16'
      },
      expectedResult: false
    },
    {
      key: 'endDate',
      oldValues: {},
      nextValues: {},
      expectedResult: false
    },
    {
      key: 'endDate',
      oldValues: {
        endDate: '2021-10-15'
      },
      nextValues: {
        endDate: '2021-10-16'
      },
      expectedResult: true
    },
    {
      key: 'endDate',
      oldValues: {
        endDate: '2021-10-15'
      },
      nextValues: {
        endDate: '2021-10-15'
      },
      expectedResult: false
    },
    {
      key: 'endDate',
      oldValues: {
        endDate: '2021-10-15'
      },
      nextValues: {
        endDate: ''
      },
      expectedResult: false
    },
    {
      key: 'endDate',
      oldValues: {
        endDate: ''
      },
      nextValues: {
        endDate: '2021-10-15'
      },
      expectedResult: true
    }
  ])(
    'returns correct value',
    ({ key, oldValues, nextValues, expectedResult }) => {
      const result = isEstimatedDateChanged(
        key as keyof ProposeEngagementEndInput,
        oldValues as Partial<ProposeEngagementEndInput>,
        nextValues as Partial<ProposeEngagementEndInput>
      )

      expect(result).toBe(expectedResult)
    }
  )
})
