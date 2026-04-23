import { when } from 'jest-when'
import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import JobCommissions from './JobCommissions'
import { JobCommissionsDocument } from './data/get-job-commissions/get-job-commissions.staff.gql.types'
import { createJobCommissionsQueryMock } from './data/get-job-commissions/mocks'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/ui/src/components/ContainerLoader')
jest.mock('./components/JobCommissionsFields', () => ({
  __esModule: true,
  default: () => <div data-testid='JobCommissionsFields' />
}))
const mockUseQuery = useQuery as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobCommissions jobId='123' />
    </TestWrapper>
  )

describe('JobCommissions', () => {
  describe('when there are no commissions', () => {
    it('returns no items copy', () => {
      const mockedData = createJobCommissionsQueryMock()

      when(mockUseQuery)
        .calledWith(JobCommissionsDocument, expect.anything())
        .mockImplementation(() => ({
          data: { ...mockedData },
          loading: false,
          initialLoading: false
        }))

      arrangeTest()

      expect(
        screen.queryByText('Currently, there are no commissions.')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('JobCommissionsFields')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('ContainerLoader-showSkeleton')
      ).toHaveTextContent('false')
    })
  })

  describe(`when there is 'loading' state`, () => {
    it('shows the skeleton loader', () => {
      const mockedData = createJobCommissionsQueryMock()

      when(mockUseQuery)
        .calledWith(JobCommissionsDocument, expect.anything())
        .mockImplementation(() => ({
          data: { ...mockedData },
          loading: true,
          initialLoading: true
        }))

      arrangeTest()

      expect(
        screen.queryByTestId('JobCommissionsFields')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('ContainerLoader-showSkeleton')
      ).toHaveTextContent('true')
    })
  })

  describe('when there are job commissions', () => {
    it('shows job fields', () => {
      const mockedData = createJobCommissionsQueryMock({
        clientCommissionFragment: {
          id: 'some-id',
          commissions: {
            commissionsPot: 10,
            referralCommissionV2: {
              __typename: 'FixedSourcingCommission',
              commission: '20'
            }
          },
          referrer: {
            id: 'some-id',
            fullName: 'some name',
            webResource: { text: 'some text', url: 'https://some-url' }
          }
        }
      })

      when(mockUseQuery)
        .calledWith(JobCommissionsDocument, expect.anything())
        .mockImplementation(() => ({
          data: { ...mockedData },
          loading: false,
          initialLoading: false
        }))

      arrangeTest()

      expect(screen.queryByTestId('JobCommissionsFields')).toBeInTheDocument()
      expect(
        screen.queryByTestId('ContainerLoader-showSkeleton')
      ).toHaveTextContent('false')
    })
  })
})
