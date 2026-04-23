import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import { JobContractFragment } from './data/get-job-contracts'
import { createHiredTalentEngagementFragmentMock } from '../../data/get-hired-talent/mocks'
import JobContracts from './JobContracts'
import { Props as JobContractItemProps } from './components/JobContractItem/JobContractItem'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/ui/src/components/ContainerLoader')
jest.mock('./components/JobContractsActions', () => ({
  __esModule: true,
  default: () => <div data-testid='contracts-actions' />
}))
jest.mock('./components/JobContractItem', () => ({
  __esModule: true,
  default: (props: JobContractItemProps) => (
    <div data-testid='contract-item'>
      <div data-testid='contract-item-header' onClick={props.onSuccessAction} />
    </div>
  )
}))

const refetchContractsMock = jest.fn()

const mockReturnValues = ({
  initialLoading = false,
  contracts
}: Partial<{
  initialLoading?: boolean
  contracts?: Partial<JobContractFragment>[]
}> = {}) => {
  const mockUseGetNode = useGetNode as jest.Mock

  mockUseGetNode.mockImplementation(() => () => ({
    data: {
      contracts: { nodes: contracts }
    },
    initialLoading,
    refetch: refetchContractsMock
  }))
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobContracts
        engagement={createHiredTalentEngagementFragmentMock()}
        jobId='123'
      />
    </TestWrapper>
  )

describe('JobContracts', () => {
  it('shows job contracts actions', () => {
    mockReturnValues({ initialLoading: false, contracts: [{ id: '1' }] })
    arrangeTest()

    expect(screen.queryByTestId('contracts-actions')).toBeInTheDocument()
  })

  it('returns copy if there are no contracts', () => {
    mockReturnValues()
    arrangeTest()

    expect(screen.queryByText('No related contracts.')).toBeInTheDocument()
    expect(screen.queryByTestId('contract-item')).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('ContainerLoader-showSkeleton')
    ).toHaveTextContent('false')
  })

  it('shows the skeleton loader', () => {
    mockReturnValues({ initialLoading: true })
    arrangeTest()

    expect(screen.queryByTestId('contract-item')).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('ContainerLoader-showSkeleton')
    ).toHaveTextContent('true')
  })

  it('shows job contracts', () => {
    mockReturnValues({ initialLoading: false, contracts: [{ id: '1' }] })
    arrangeTest()

    expect(screen.queryByTestId('contract-item')).toBeInTheDocument()
    expect(
      screen.queryByTestId('ContainerLoader-showSkeleton')
    ).toHaveTextContent('false')
  })

  it('refetches job contracts on job contract destroy', () => {
    mockReturnValues({ initialLoading: false, contracts: [{ id: '1' }] })
    arrangeTest()

    screen.queryByTestId('contract-item-header')?.click()

    expect(refetchContractsMock).toHaveBeenCalledTimes(1)
  })
})
