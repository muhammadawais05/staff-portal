import React from 'react'
import { render } from '@testing-library/react'
import { PromptModal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import DraftJobDeleteModal from './DraftJobDeleteModal'

const mockedHandleSubmit = jest.fn(() => null)
const mockedPromptModal = PromptModal as unknown as jest.Mock

jest.mock('@staff-portal/mutation-result-handlers/src/hooks', () => ({
  useModalFormChangeHandler: () => ({
    handleSubmit: mockedHandleSubmit,
    loading: false
  })
}))

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  PromptModal: jest.fn()
}))

const renderComponent = (draftJobId: string, hideModal: () => void) => {
  render(<DraftJobDeleteModal draftJobId={draftJobId} hideModal={hideModal} />)
}

describe('DraftJobDeleteModal', () => {
  beforeEach(() => {
    mockedPromptModal.mockImplementationOnce(() => null)
  })

  it('renders the modal', () => {
    const draftJobId = 'draftJobId'
    const hideModal = () => null

    renderComponent(draftJobId, hideModal)

    expect(mockedPromptModal).toHaveBeenCalledTimes(1)
    expect(mockedPromptModal).toHaveBeenCalledWith(
      {
        open: true,
        operationVariables: {
          nodeId: draftJobId,
          nodeType: NodeType.DRAFT_JOB,
          operationName: 'removeSalesDraftJob'
        },
        onSubmit: expect.any(Function),
        onClose: hideModal,
        loading: false,
        message: 'Are you sure that you want to delete the Draft Job?',
        submitText: 'Delete Job',
        title: 'Delete Draft Job?',
        variant: 'negative'
      },
      {}
    )
  })
})
