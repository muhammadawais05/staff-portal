import React from 'react'
import { render } from '@testing-library/react'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { CLIENT_UPDATED } from '@staff-portal/clients'

import RestoreFromBadLeadModal from './RestoreFromBadLeadModal'
import { getRestoreFromBadLeadMessage } from '../utils'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  ConfirmationModal: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers/src/hooks', () => ({
  useModalFormChangeHandler: jest.fn()
}))
jest.mock('../utils', () => ({
  getRestoreFromBadLeadMessage: jest.fn()
}))

const getRestoreFromBadLeadMessageMock =
  getRestoreFromBadLeadMessage as jest.Mock
const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock
const mockedConfirmationModal = ConfirmationModal as jest.Mock
const loading = false
const handleSubmit = jest.fn()

describe('RestoreFromBadLeadPromptModal', () => {
  beforeEach(() => {
    useModalFormChangeHandlerMock.mockReturnValueOnce({
      handleSubmit,
      loading
    })
    mockedConfirmationModal.mockReturnValueOnce(null)
    getRestoreFromBadLeadMessageMock.mockReturnValueOnce('message')
  })

  it('renders modal', () => {
    const clientId = 'companyId'
    const clientName = 'clientName'
    const hideModal = jest.fn()

    render(
      <TestWrapper>
        <RestoreFromBadLeadModal
          clientId={clientId}
          clientName={clientName}
          hideModal={hideModal}
        />
      </TestWrapper>
    )

    expect(useModalFormChangeHandlerMock).toHaveBeenCalledTimes(1)
    expect(useModalFormChangeHandlerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationResultOptions: {
          onSuccessAction: hideModal,
          successNotificationMessage:
            'Client has been restored from Bad Lead status.',
          successMessageEmitOptions: {
            type: CLIENT_UPDATED,
            payload: { companyId: clientId }
          }
        }
      })
    )
    expect(getRestoreFromBadLeadMessageMock).toHaveBeenCalledWith(clientName)
    expect(mockedConfirmationModal).toHaveBeenCalledTimes(1)
    expect(mockedConfirmationModal).toHaveBeenCalledWith(
      {
        loading,
        'data-testid': 'restore-from-bad-lead-modal',
        onSubmit: expect.any(Function),
        onClose: hideModal,
        message: 'message',
        open: true,
        label: 'Comment',
        textFieldName: 'comment',
        placeholder: 'Please specify a reason.',
        submitText: 'Restore From Bad Lead',
        title: 'Restore Company from Bad Lead Status',
        variant: 'positive',
        required: true,
        operationVariables: {
          nodeId: clientId,
          nodeType: NodeType.CLIENT,
          operationName: 'restoreClientFromBadLead'
        }
      },
      {}
    )
  })
})
