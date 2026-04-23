import React from 'react'
import {
  render,
  screen,
  getByTestId,
  getByText,
  queryByTestId
} from '@testing-library/react'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import { TalentProfileWorkingPeriodFragment } from '../../data'
import TalentWorkingPeriods from './TalentWorkingPeriods'

const TEST_WORKING_PERIODS: TalentProfileWorkingPeriodFragment[] = [
  {
    start: '2020-07-07',
    stop: '2020-08-08',
    workingHours: 10,
    activeEngagements: {
      edges: [
        {
          workingHours: 6,
          node: {
            id: 'test-id',
            job: {
              id: 'test-id',
              title: '6 hour job',
              webResource: {
                url: '/6-hour-job',
                text: '6 hour engagement'
              }
            }
          }
        },
        {
          workingHours: 4,
          node: {
            id: 'test-id',
            job: {
              id: 'test-id',
              title: '4 hour job',
              webResource: {
                url: '/4-hour-job',
                text: '4 hour engagement'
              }
            }
          }
        }
      ]
    }
  },
  {
    start: '2020-08-08',
    stop: '2020-09-09',
    workingHours: 7,
    activeEngagements: {
      edges: [
        {
          workingHours: 3,
          node: {
            id: 'test-id',
            job: {
              id: 'test-id',
              title: '3 hour job',
              webResource: {
                url: '/3-hour-job',
                text: '3 hour engagement'
              }
            }
          }
        },
        {
          workingHours: 4,
          node: {
            id: 'test-id',
            job: {
              id: 'test-id',
              title: '4 hour job',
              webResource: {
                url: '/4-hour-job',
                text: '4 hour engagement'
              }
            }
          }
        }
      ]
    }
  },
  {
    start: '2020-09-09',
    stop: '2020-10-10',
    workingHours: 11,
    activeEngagements: {
      edges: [
        {
          workingHours: 6,
          node: {
            id: 'test-id',
            job: {
              id: 'test-id',
              title: '6 hour job',
              webResource: {
                text: '6 hour engagement'
              }
            }
          }
        },
        {
          workingHours: 5,
          node: {
            id: 'test-id',
            job: {
              id: 'test-id',
              title: '5 hour job',
              webResource: {
                text: '5 hour engagement'
              }
            }
          }
        }
      ]
    }
  }
]

const arrangeTest = (workingPeriods?: TalentProfileWorkingPeriodFragment[]) =>
  render(
    <TestWrapper>
      <TalentWorkingPeriods workingPeriods={workingPeriods} />
    </TestWrapper>
  )

describe('Talent working periods', () => {
  describe('non-empty value', () => {
    let workingPeriods: HTMLElement[]

    beforeEach(() => {
      arrangeTest(TEST_WORKING_PERIODS)
      workingPeriods = screen.getAllByTestId('working-period')
    })

    it('renders nothing if no working periods provided', () => {
      const { container } = arrangeTest()

      expect(container.firstElementChild).toBeEmptyDOMElement()
    })

    it('renders nothing if empty working periods list provided', () => {
      const { container } = arrangeTest()

      expect(container.firstElementChild).toBeEmptyDOMElement()
    })

    it('renders working hours (with the tooltip for first working period)', () => {
      const firstItem = getByText(workingPeriods[0], '10 hours')
      const secondItem = getByText(workingPeriods[1], '7 hours')
      const thirdItem = getByText(workingPeriods[2], '11 hours')

      expect(workingPeriods).toHaveLength(3)

      expect(firstItem).toBeInTheDocument()
      expect(secondItem).toBeInTheDocument()
      expect(thirdItem).toBeInTheDocument()

      assertOnTooltipText(
        getByTestId(firstItem, 'tooltip-icon'),
        'Total hours billed across all active engagements for given week.'
      )

      expect(queryByTestId(secondItem, 'tooltip-icon')).not.toBeInTheDocument()
      expect(queryByTestId(thirdItem, 'tooltip-icon')).not.toBeInTheDocument()
    })

    it('renders active engagements breakdown with the tooltip for first working period', () => {
      const firstItemEngagements = getByTestId(
        workingPeriods[0],
        'active-engagements'
      )
      const secondItemEngagements = getByTestId(
        workingPeriods[1],
        'active-engagements'
      )
      const thirdItemEngagements = getByTestId(
        workingPeriods[2],
        'active-engagements'
      )

      assertOnTooltipText(
        getByTestId(firstItemEngagements, 'tooltip-icon'),
        'Number of hours billed from each active job for given week.'
      )

      expect(
        queryByTestId(secondItemEngagements, 'tooltip-icon')
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(thirdItemEngagements, 'tooltip-icon')
      ).not.toBeInTheDocument()

      expect(getByText(firstItemEngagements, '4')).toBeInTheDocument()
      expect(getByText(firstItemEngagements, '6')).toBeInTheDocument()

      expect(getByText(secondItemEngagements, '3')).toBeInTheDocument()
      expect(getByText(secondItemEngagements, '4')).toBeInTheDocument()

      expect(getByText(thirdItemEngagements, '6')).toBeInTheDocument()
      expect(getByText(thirdItemEngagements, '5')).toBeInTheDocument()
    })

    it('renders links for active engagement jobs if provided', () => {
      const firstItemEngagements = getByTestId(
        workingPeriods[0],
        'active-engagements'
      )
      const thirdItemEngagements = getByTestId(
        workingPeriods[2],
        'active-engagements'
      )

      const jobWithUrl = getByText(firstItemEngagements, '4')
      const jobWithhoutUrl = getByText(thirdItemEngagements, '6')

      expect(jobWithUrl.closest('a')).toHaveAttribute('href', '/4-hour-job')
      expect(jobWithhoutUrl.closest('a')).not.toBeInTheDocument()
    })

    it('renders tooltip with job title for active engagement links', () => {
      const firstItemEngagements = getByTestId(
        workingPeriods[0],
        'active-engagements'
      )
      const secondItemEngagements = getByTestId(
        workingPeriods[1],
        'active-engagements'
      )
      const thirdItemEngagements = getByTestId(
        workingPeriods[2],
        'active-engagements'
      )

      assertOnTooltipText(getByText(firstItemEngagements, '6'), '6 hour job')
      assertOnTooltipText(getByText(firstItemEngagements, '4'), '4 hour job')

      assertOnTooltipText(getByText(secondItemEngagements, '3'), '3 hour job')
      assertOnTooltipText(getByText(secondItemEngagements, '4'), '4 hour job')

      assertOnTooltipText(getByText(thirdItemEngagements, '6'), '6 hour job')
      assertOnTooltipText(getByText(thirdItemEngagements, '5'), '5 hour job')
    })

    it('renders working period start and end dates (with the "Last week" for first item)', () => {
      expect(getByText(workingPeriods[0], 'Last week')).toBeInTheDocument()
      expect(
        getByText(workingPeriods[1], 'Aug 8, 2020 — Sep 9, 2020')
      ).toBeInTheDocument()
      expect(
        getByText(workingPeriods[2], 'Sep 9, 2020 — Oct 10, 2020')
      ).toBeInTheDocument()
    })
  })
})
