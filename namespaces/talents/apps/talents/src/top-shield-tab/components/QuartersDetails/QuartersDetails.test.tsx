import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import {
  Scalars,
  TopShieldApplicationStatus
} from '@staff-portal/graphql/staff'
import {
  createQuarterMock,
  createTopShieldApplicationMock
} from '@staff-portal/talents-top-shield/src/mocks'
import { addDays } from '@staff-portal/date-time-utils'

import QuartersDetails from '.'

const arrangeTest = (props: ComponentProps<typeof QuartersDetails>) => {
  return render(
    <TestWrapperWithMocks mocks={[]}>
      <QuartersDetails
        topShieldApplication={props.topShieldApplication}
        loading={props.loading}
      />
    </TestWrapperWithMocks>
  )
}

describe('QuartersDetails', () => {
  it('renders details of top shield quarters', () => {
    const { topShieldApplication } = createTopShieldApplicationMock()

    arrangeTest({ topShieldApplication, loading: false })

    expect(screen.getByText('Jun 1, 2020 to Jan 1, 2022')).toBeInTheDocument()
    expect(screen.getByText('Jul 1, 2020')).toBeInTheDocument()
    expect(screen.getByTestId('addQuarterButton')).toBeInTheDocument()
    expect(screen.getByTestId('updateQuarterButton')).toBeInTheDocument()
  })

  describe('when top shield has many quarters', () => {
    it('renders correct quarter group names', () => {
      const { topShieldApplication } = createTopShieldApplicationMock(
        {},
        {
          quarters: {
            nodes: [
              createQuarterMock({
                id: '12',
                startDate: '2019-01-01',
                endDate: '2019-01-02'
              }),
              createQuarterMock({
                id: '1234',
                startDate: '2019-01-01',
                endDate: addDays(
                  new Date(),
                  1
                ).toDateString() as Scalars['Date']
              }),
              createQuarterMock({
                id: '12345',
                startDate: '2077-01-01',
                endDate: '2077-01-01'
              })
            ],
            totalCount: 1
          }
        }
      )

      arrangeTest({ topShieldApplication, loading: false })

      expect(screen.getByText('Archived Quarters Group')).toBeInTheDocument()
      expect(screen.getByText('Future Quarters Group')).toBeInTheDocument()
      expect(screen.getByText('Current Quarter Group')).toBeInTheDocument()
    })
  })

  describe('when top shield does not have any quarters', () => {
    it('renders empty quarter message', () => {
      const { topShieldApplication } = createTopShieldApplicationMock(
        {},
        {
          quarters: { totalCount: 0, nodes: [] }
        }
      )

      arrangeTest({ topShieldApplication, loading: false })

      expect(screen.getByText('There are no quarters.')).toBeInTheDocument()
      expect(screen.queryByText('Jul 1, 2020')).not.toBeInTheDocument()
      expect(
        screen.queryByText('Jun 1, 2020 to Jan 1, 2022')
      ).not.toBeInTheDocument()
    })
  })

  it.each([
    [TopShieldApplicationStatus.NOT_A_FIT],
    [TopShieldApplicationStatus.PROSPECTIVE_CANDIDATE]
  ])('does not render quarters details section for %o', status => {
    const { topShieldApplication } = createTopShieldApplicationMock(
      {},
      { status }
    )

    arrangeTest({ topShieldApplication, loading: false })

    expect(screen.queryByText('There are no quarters.')).not.toBeInTheDocument()
  })
})
