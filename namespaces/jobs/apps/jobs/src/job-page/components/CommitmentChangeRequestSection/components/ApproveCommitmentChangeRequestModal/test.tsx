import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetOperation } from '@staff-portal/operations'

import ApproveCommitmentChangeRequestModal from './ApproveCommitmentChangeRequestModal'
import {
  GetApproveCommitmentChangeRequestDataQuery,
  useGetAproveCommitmentChangeRequestData
} from './data'

jest.mock('@staff-portal/operations', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/operations'),
  useGetOperation: jest.fn()
}))
jest.mock('./data')
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/ui/src/components/ContainerLoader')
jest.mock('../ApproveCommitmentChangeRequestForm', () => ({
  __esModule: true,
  default: () => <div data-testid='ApproveCommitmentChangeRequestForm' />
}))

const hideModalMock = jest.fn()

const mockReturnValues = ({
  loading = false,
  initialLoading = false,
  data
}: Partial<{
  loading?: boolean
  initialLoading?: boolean
  data?: Partial<GetApproveCommitmentChangeRequestDataQuery['node']>
}> = {}) => {
  const useGetOperationMock = useGetOperation as jest.Mock

  useGetOperationMock.mockReturnValue({ enabled: true, loading: false })

  const useGetAproveCommitmentChangeRequestDataMock =
    useGetAproveCommitmentChangeRequestData as jest.Mock

  useGetAproveCommitmentChangeRequestDataMock.mockReturnValue({
    loading,
    initialLoading,
    data
  })
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <ApproveCommitmentChangeRequestModal
        hideModal={hideModalMock}
        jobId='123'
        commitmentChangeRequestId='commitment-id'
      />
    </TestWrapper>
  )

describe('ApproveCommitmentChangeRequestModal', () => {
  describe('when there is no job data', () => {
    it('returns nothing', () => {
      mockReturnValues()
      arrangeTest()

      expect(
        screen.queryByTestId('ApproveCommitmentChangeRequestForm')
      ).not.toBeInTheDocument()
      expect(
        screen.getByTestId('ContainerLoader-showSkeleton')
      ).toHaveTextContent('false')
    })
  })

  describe('when there is initial loading', () => {
    it('returns skeleton', () => {
      mockReturnValues({ initialLoading: true })
      arrangeTest()

      expect(
        screen.queryByTestId('ApproveCommitmentChangeRequestForm')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('ContainerLoader-showSkeleton')
      ).toHaveTextContent('true')
    })
  })

  describe('when there is job data', () => {
    it('returns form', () => {
      mockReturnValues({
        data: {
          id: 'some-id',
          title: 'some-title',
          pendingCommitmentChangeRequest: {
            id: 'some-id'
          }
        } as GetApproveCommitmentChangeRequestDataQuery['node']
      })
      arrangeTest()

      expect(
        screen.getByTestId('ApproveCommitmentChangeRequestForm')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('ContainerLoader-showSkeleton')
      ).toHaveTextContent('false')
    })
  })
})
