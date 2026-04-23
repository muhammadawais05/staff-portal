import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import DeleteOpportunityModal from './DeleteOpportunityModal'

jest.mock('./data', () => ({
  __esModule: true,
  useDeleteOpportunity: () => [() => {}, { loading: false }]
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <DeleteOpportunityModal opportunityId='id' onClose={() => {}} />
    </TestWrapper>
  )

describe('DeleteOpportunityModal', () => {
  it('displays required copies', async () => {
    arrangeTest()

    expect(await screen.findByText(`Delete Opportunity?`)).toBeInTheDocument()
  })
})
