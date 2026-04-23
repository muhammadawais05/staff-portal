import React from 'react'
import { render } from '@testing-library/react'
import { PromptModal } from '@staff-portal/modals-service'
import { TestWrapper } from '@staff-portal/test-utils'

import { getRestoreFromBadLeadMessage } from '../utils'
import RestoreFromBadLeadPromptModal from './RestoreFromBadLeadPromptModal'

jest.mock('@staff-portal/modals-service', () => ({
  PromptModal: jest.fn()
}))
jest.mock('../utils', () => ({
  getRestoreFromBadLeadMessage: jest.fn()
}))

const getRestoreFromBadLeadMessageMock =
  getRestoreFromBadLeadMessage as jest.Mock
const mockedPromptModal = PromptModal as jest.Mock

describe('RestoreFromBadLeadPromptModal', () => {
  beforeEach(() => {
    mockedPromptModal.mockReturnValueOnce(null)
    getRestoreFromBadLeadMessageMock.mockReturnValueOnce('message')
  })

  it('renders modal', () => {
    const clientName = 'clientName'
    const loading = false
    const hideModal = jest.fn()
    const onSubmit = jest.fn()

    render(
      <TestWrapper>
        <RestoreFromBadLeadPromptModal
          clientName={clientName}
          loading={loading}
          onSubmit={onSubmit}
          hideModal={hideModal}
        />
      </TestWrapper>
    )

    expect(getRestoreFromBadLeadMessageMock).toHaveBeenCalledWith(clientName)
    expect(mockedPromptModal).toHaveBeenCalledTimes(1)
    expect(mockedPromptModal).toHaveBeenCalledWith(
      expect.objectContaining({
        loading,
        message: 'message',
        onClose: hideModal,
        onSubmit: expect.any(Function),
        open: true,
        submitText: 'Restore From Bad Lead',
        title: 'Restore Company from Bad Lead Status'
      }),
      {}
    )
  })
})
