import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { PromptModal } from '@staff-portal/modals-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import DeleteStaffModal from './DeleteStaffModal'
import { DeactivateStaffDocument } from './data/deactivate-staff/deactivate-staff.staff.gql.types'
import { useGetStaffHasPendingTasks } from './data/get-staff-has-pending-tasks/get-staff-has-pending-tasks.staff.gql'
import { DeleteStaffModalContent } from './components'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useModalFormChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  PromptModal: jest.fn()
}))
jest.mock(
  './data/get-staff-has-pending-tasks/get-staff-has-pending-tasks.staff.gql',
  () => ({
    useGetStaffHasPendingTasks: jest.fn()
  })
)

const renderComponent = (props: ComponentProps<typeof DeleteStaffModal>) =>
  render(
    <TestWrapper>
      <DeleteStaffModal {...props} />
    </TestWrapper>
  )

const MockPromptModal = PromptModal as jest.Mock
const mockUseModalFormChangeHandler = useModalFormChangeHandler as jest.Mock
const mockUseGetStaffHasPendingTasks = useGetStaffHasPendingTasks as jest.Mock

describe('DeleteStaffModal', () => {
  const staffId = '12345'
  const fullName = 'fullName'
  const initialLoading = {}
  const hideModal = () => null
  const loading = {}
  const hasPendingTasks = {}
  const handleSubmit = () => null

  beforeEach(() => {
    MockPromptModal.mockReturnValueOnce(null)
    mockUseModalFormChangeHandler.mockReturnValueOnce({
      loading,
      handleSubmit
    })
    mockUseGetStaffHasPendingTasks.mockReturnValueOnce({
      initialLoading,
      data: {
        node: {
          hasPendingTasks
        }
      }
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
        initialLoading,
        loading,
        open: true,
        onClose: hideModal,
        title: `Delete ${fullName}?`,
        message: expect.objectContaining({
          type: DeleteStaffModalContent,
          props: {
            staffId,
            fullName,
            hasPendingTasks
          }
        }),
        submitText: 'Delete',
        variant: 'negative',
        operationVariables: {
          nodeId: staffId,
          nodeType: NodeType.STAFF,
          operationName: 'deactivateStaff'
        },
        onSubmit: expect.any(Function)
      },
      {}
    )
    expect(mockUseModalFormChangeHandler).toHaveBeenCalledWith({
      mutationDocument: DeactivateStaffDocument,
      mutationResultOptions: {
        onSuccessAction: expect.any(Function),
        successNotificationMessage: `The Staff account for ${fullName} was successfully deleted.`
      }
    })
  })
})
