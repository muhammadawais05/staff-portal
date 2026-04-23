import { useModal } from '@staff-portal/modals-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { useSendEmailModal } from './use-send-email-modal'

jest.mock('@staff-portal/modals-service', () => ({
  useModal: jest.fn()
}))
const useModalMock = useModal as jest.Mock
const showModalMock = jest.fn()

const BUTTON_TEXT = 'send email'
const TestComponent = ({ roleOrClientId }: { roleOrClientId: string }) => {
  const { showModal } = useSendEmailModal()

  return (
    <>
      <button
        onClick={() => {
          showModal({ nodeId: roleOrClientId })
        }}
      >
        {BUTTON_TEXT}
      </button>
    </>
  )
}

const arrangeTest = ({ roleOrClientId }: { roleOrClientId: string }) => {
  useModalMock.mockReturnValue({
    showDetachedModal: showModalMock
  })

  render(
    <TestWrapper>
      <TestComponent roleOrClientId={roleOrClientId} />
    </TestWrapper>
  )
}

describe('useSendEmailModal()', () => {
  it('triggers the show email modal with specific parameters', async () => {
    const ROLE_ID = '123'

    arrangeTest({ roleOrClientId: ROLE_ID })

    fireEvent.click(screen.getByText(BUTTON_TEXT))

    expect(showModalMock).toHaveBeenCalled()
  })
})
