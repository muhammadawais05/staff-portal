import { render } from '@testing-library/react'
import { PromptModal } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import SendMobileAppInvitationsToClientModal from './SendMobileAppInvitationsToClientModal'
import { useSubmitSendMobileAppInvitationsToClient } from './utils'

jest.mock('./utils', () => ({
  useSubmitSendMobileAppInvitationsToClient: jest.fn()
}))
jest.mock('@toptal/picasso', () => ({
  PromptModal: jest.fn()
}))

const arrangeTest = (
  props: ComponentProps<typeof SendMobileAppInvitationsToClientModal>
) => {
  render(
    <TestWrapper>
      <SendMobileAppInvitationsToClientModal {...props} />
    </TestWrapper>
  )
}

const mockedUseSubmitSendMobileAppInvitationsToClient =
  useSubmitSendMobileAppInvitationsToClient as jest.Mock
const mockedPromptModal = PromptModal as unknown as jest.Mock
const mockedHandleSubmit = () => null

describe('SendMobileAppInvitationsToClientModal', () => {
  beforeEach(() => {
    mockedUseSubmitSendMobileAppInvitationsToClient.mockReturnValueOnce({
      handleSubmit: mockedHandleSubmit,
      loading: false
    })
    mockedPromptModal.mockReturnValueOnce(null)
  })

  it('renders modal', () => {
    const mockedHideModal = () => null

    arrangeTest({
      clientId: 'clientId',
      hideModal: mockedHideModal
    })

    expect(mockedPromptModal).toHaveBeenCalledTimes(1)
    expect(mockedPromptModal).toHaveBeenCalledWith(
      expect.objectContaining({
        message:
          'Do you want to send a Client App invitation to the main client representative?',
        onClose: mockedHideModal,
        onSubmit: mockedHandleSubmit,
        open: true,
        submitText: 'Send',
        title: 'Send Client App invitation email'
      }),
      {}
    )
  })
})
