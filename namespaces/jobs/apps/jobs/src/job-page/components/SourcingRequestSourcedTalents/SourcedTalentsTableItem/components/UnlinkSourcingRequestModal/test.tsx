import { render, screen, fireEvent, act } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import UnlinkSourcingRequestModal from './UnlinkSourcingRequestModal'

const mockUnlinkSourcingRequestTalent = jest.fn()

jest.mock('./data/unlink-sourcing-request', () => ({
  useUnlinkSourcingRequest: () => ({
    unlinkSourcingRequestTalent: mockUnlinkSourcingRequestTalent,
    loading: false
  })
}))

const SOURCING_TALENT_REQUEST_ID = 'SOURCING_TALENT_REQUEST_ID'
const TALENT_FULL_NAME = 'TALENT_FULL_NAME'
const COMMENT =
  'Ergonomic capacitor Borders Account Forges Future Open-architected Fresh Rubber Future Planner eyeballs Estate leverage adapter Ergonomic Dakota whiteboard Dynamic Oregon Lucia Avon turquoise User-friendly'

const arrangeTest = (props: {
  sourcingTalentRequestId: string
  talentFullName: string
}) => {
  return render(
    <TestWrapper>
      <UnlinkSourcingRequestModal {...props} onClose={() => {}} />
    </TestWrapper>
  )
}

describe('UnlinkSourcingRequestModal', () => {
  it('link talent to sourcing request successfully', async () => {
    arrangeTest({
      sourcingTalentRequestId: SOURCING_TALENT_REQUEST_ID,
      talentFullName: TALENT_FULL_NAME
    })

    fireEvent.change(screen.getByLabelText(/Comment/i), {
      target: { value: COMMENT }
    })

    const unlinkButton = screen.getByText('Unlink')

    expect(unlinkButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(unlinkButton)
    })

    expect(mockUnlinkSourcingRequestTalent).toHaveBeenCalledWith(
      SOURCING_TALENT_REQUEST_ID,
      COMMENT
    )
  })
})
