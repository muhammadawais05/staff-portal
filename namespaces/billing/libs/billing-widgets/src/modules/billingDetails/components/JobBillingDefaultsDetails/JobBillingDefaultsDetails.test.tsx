import React from 'react'
import { useTranslation } from 'react-i18next'
import { render } from '@testing-library/react'
import { BillCycle, JobCommitment, WeekDay } from '@staff-portal/graphql/staff'
import { DetailedList } from '@staff-portal/ui'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import JobBillingDefaultsItems from './JobBillingDefaultsDetails'

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn()
}))
jest.mock('@staff-portal/ui', () => {
  const mock = jest.fn() as unknown as {
    Row: Function
    Item: Function
  }

  mock.Row = jest.fn()
  mock.Item = jest.fn()

  return {
    DetailedList: mock
  }
})

const useTranslationMock = useTranslation as jest.Mock
const DetailedListMock = DetailedList as unknown as jest.Mock
const DetailedListRowMock = DetailedList.Row as unknown as jest.Mock
const DetailedListItemMock = DetailedList.Item as unknown as jest.Mock

describe('#JobBillingDefaultsItems', () => {
  beforeEach(() => {
    jest.resetAllMocks()

    useTranslationMock.mockImplementation(() => ({
      t: (...args: (string | object)[]) => args.join('')
    }))
    DetailedListMock.mockImplementation(({ children }) => children)
    DetailedListRowMock.mockImplementation(({ children }) => children)
    DetailedListItemMock.mockImplementation(({ children }) => children)
  })

  describe('when all job billing defaults details are provided', () => {
    it('renders labels', () => {
      const jobTemplate = {
        billCycle: BillCycle.BI_WEEKLY,
        billDay: WeekDay.MONDAY,
        commitment: JobCommitment.FULL_TIME
      }

      render(<JobBillingDefaultsItems jobTemplate={jobTemplate} />)

      expect(DetailedListItemMock).toHaveBeenCalledTimes(3)
      expect(DetailedListItemMock).toHaveBeenNthCalledWith(
        1,
        {
          children: 'billingCycleTable:CommitmentAvailability.full_time',
          label: 'billingDetails:modals.jobTemplate.fields.commitment.label'
        },
        {}
      )
      expect(DetailedListItemMock).toHaveBeenNthCalledWith(
        2,
        {
          children: 'Bi-weekly',
          label: 'billingDetails:modals.jobTemplate.fields.billCycle.label'
        },
        {}
      )
      expect(DetailedListItemMock).toHaveBeenNthCalledWith(
        3,
        {
          children: 'Monday',
          label: 'billingDetails:modals.jobTemplate.fields.billDay.label'
        },
        {}
      )
    })
  })

  describe('when job billing defaults details are not provided', () => {
    it('renders empty data signs', () => {
      render(<JobBillingDefaultsItems jobTemplate={{}} />)

      expect(DetailedListItemMock).toHaveBeenCalledTimes(3)
      expect(DetailedListItemMock).toHaveBeenNthCalledWith(
        1,
        {
          children: EMPTY_DATA,
          label: 'billingDetails:modals.jobTemplate.fields.commitment.label'
        },
        {}
      )
      expect(DetailedListItemMock).toHaveBeenNthCalledWith(
        2,
        {
          children: EMPTY_DATA,
          label: 'billingDetails:modals.jobTemplate.fields.billCycle.label'
        },
        {}
      )
      expect(DetailedListItemMock).toHaveBeenNthCalledWith(
        3,
        {
          children: EMPTY_DATA,
          label: 'billingDetails:modals.jobTemplate.fields.billDay.label'
        },
        {}
      )
    })
  })

  describe('when a job template is not passed', () => {
    it('returns null', () => {
      render(<JobBillingDefaultsItems jobTemplate={undefined} />)

      expect(DetailedListItemMock).toHaveBeenCalledTimes(0)
    })
  })
})
