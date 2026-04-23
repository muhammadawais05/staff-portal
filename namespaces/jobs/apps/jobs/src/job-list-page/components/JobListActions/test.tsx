import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import JobListActions from '../../components/JobListActions/JobListActions'
import { useViewerPermits } from '../../data/get-viewer-permits'

jest.mock('../AddJobButton', () => ({
  __esModule: true,
  default: () => <div data-testid='AddJobButton' />
}))

jest.mock('../../data/get-viewer-permits', () => ({
  __esModule: true,
  useViewerPermits: jest.fn()
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobListActions />
    </TestWrapper>
  )

describe('JobListActions', () => {
  it('does render when createClaimableJob permit is true', () => {
    const mockUseViewerPermits = useViewerPermits as jest.Mock

    mockUseViewerPermits.mockImplementation(() => ({
      permits: {
        createClaimableJob: true
      }
    }))

    arrangeTest()
    expect(screen.getByTestId('AddJobButton')).toBeInTheDocument()
  })

  it('does not render when createClaimableJob permit is false', () => {
    const mockUseViewerPermits = useViewerPermits as jest.Mock

    mockUseViewerPermits.mockImplementation(() => ({
      permits: {
        createClaimableJob: false
      }
    }))

    arrangeTest()
    expect(screen.queryByTestId('AddJobButton')).not.toBeInTheDocument()
  })
})
