import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { PromptModal } from '@staff-portal/modals-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import RestoreStaffModal from './RestoreStaffModal'
import { ReactivateStaffDocument } from './data/reactivate-staff/reactivate-staff.staff.gql.types'
import { RestoreStaffModalContent } from './components'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useModalFormChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  PromptModal: jest.fn()
}))

const renderComponent = (props: ComponentProps<typeof RestoreStaffModal>) =>
  render(
    <TestWrapper>
      <RestoreStaffModal {...props} />
    </TestWrapper>
  )

const MockPromptModal = PromptModal as jest.Mock
const mockUseModalFormChangeHandler = useModalFormChangeHandler as jest.Mock

describe('DeleteStaffModal', () => {
  const staffId = '12345'
  const fullName = 'fullName'
  const hideModal = () => null
  const loading = {}
  const handleSubmit = () => null

  beforeEach(() => {
    MockPromptModal.mockReturnValueOnce(null)
    mockUseModalFormChangeHandler.mockReturnValueOnce({
      loading,
      handleSubmit
    })
  })

  it('renders component', () => {
    renderComponent({
      staffId,
      fullName,
      hideModal
    })

    expect(MockPromptModal).toHaveBeenCalledTimes(1)
    expect(MockPromptModal).toHaveBeenCalledWith(
      {
        loading,
        open: true,
        onClose: hideModal,
        title: `Restore ${fullName}?`,
        message: expect.objectContaining({
          type: RestoreStaffModalContent,
          props: {
            fullName
          }
        }),
        submitText: 'Restore',
        variant: 'positive',
        operationVariables: {
          nodeId: staffId,
          nodeType: NodeType.STAFF,
          operationName: 'reactivateStaff'
        },
        onSubmit: expect.any(Function)
      },
      {}
    )
    expect(mockUseModalFormChangeHandler).toHaveBeenCalledWith({
      mutationDocument: ReactivateStaffDocument,
      mutationResultOptions: {
        onSuccessAction: expect.any(Function),
        successNotificationMessage: `The Staff account for ${fullName} was successfully restored.`
      }
    })
  })
})
