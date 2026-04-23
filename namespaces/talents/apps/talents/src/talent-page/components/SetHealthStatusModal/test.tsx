import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useSetHealthStatusTalent } from './data/set-health-status-talent.staff.gql'
import SetHealthStatusModal from './SetHealthStatusModal'

jest.mock('./data/set-health-status-talent.staff.gql', () => ({
  __esModule: true,
  useSetHealthStatusTalent: jest.fn()
}))

const arrangeTest = () => {
  const { findByText } = render(
    <TestWrapper>
      <SetHealthStatusModal talentId='id' hideModal={() => {}} />
    </TestWrapper>
  )

  return { findByText }
}

describe('SetHealthStatusModal', () => {
  beforeEach(() => {
    const mockUseSetHealthStatusTalent = useSetHealthStatusTalent as jest.Mock

    mockUseSetHealthStatusTalent.mockImplementation(() => [
      () => {},
      { loading: false }
    ])
  })

  it('displays required copies', async () => {
    const { findByText } = arrangeTest()

    expect(await findByText('Set talent health status')).toBeInTheDocument()
    expect(await findByText('Set Health Status')).toBeInTheDocument()
  })
})
