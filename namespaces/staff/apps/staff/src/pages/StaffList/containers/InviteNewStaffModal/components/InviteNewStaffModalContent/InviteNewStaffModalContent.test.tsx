import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { REFETCH_STAFF_LIST } from '@staff-portal/staff'

import InviteNewStaffModalContent from './InviteNewStaffModalContent'
import { InviteStaffDocument } from '../../data/invite-staff/invite-staff.staff.gql.types'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useModalFormChangeHandler: jest.fn()
}))

const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock

const renderComponent = (
  props: ComponentProps<typeof InviteNewStaffModalContent>
) =>
  render(
    <TestWrapper>
      <InviteNewStaffModalContent {...props} />
    </TestWrapper>
  )

describe('InviteNewStaffModalContent', () => {
  const hideModalMock = jest.fn(() => null)
  const handleSubmitMock = jest.fn()
  const loading = false

  beforeEach(() => {
    useModalFormChangeHandlerMock.mockReturnValueOnce({
      loading,
      handleSubmit: handleSubmitMock
    })
  })

  it('renders component', () => {
    renderComponent({ hideModal: hideModalMock, title: 'Invite New Staff' })

    expect(useModalFormChangeHandlerMock).toHaveBeenCalledWith({
      mutationDocument: InviteStaffDocument,
      mutationResultOptions: {
        onSuccessAction: hideModalMock,
        successNotificationMessage: 'The Invitation was successfully sent.',
        successMessageEmitOptions: {
          type: REFETCH_STAFF_LIST
        }
      }
    })
  })
})
