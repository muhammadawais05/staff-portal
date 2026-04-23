import React, { ComponentProps } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { ModalForm } from '@staff-portal/modals-service'

import InviteContactContent from './InviteContactContent'
import { useSubmitInviteContact } from '../../hooks'

jest.mock('../../hooks', () => ({
  useSubmitInviteContact: jest.fn()
}))
jest.mock('@staff-portal/modals-service', () => ({
  ModalForm: jest.fn()
}))

const renderComponent = (props: ComponentProps<typeof InviteContactContent>) =>
  render(
    <TestWrapper>
      <InviteContactContent {...props} />
    </TestWrapper>
  )

const mockedUseSubmitInviteContact = useSubmitInviteContact as jest.Mock
const mockedModalForm = ModalForm as jest.Mock

describe('InviteContactContent', () => {
  it('submit handler is called with the correct values', async () => {
    const clientId = 'clientId'
    const handleSubmit = () => {}

    mockedModalForm.mockReturnValueOnce(null)
    mockedUseSubmitInviteContact.mockReturnValueOnce({
      handleSubmit
    })

    renderComponent({
      clientId,
      hideModal: () => null
    })

    expect(mockedModalForm).toHaveBeenCalledTimes(1)
    expect(mockedModalForm).toHaveBeenCalledWith(
      {
        initialValues: {
          clientId
        },
        onSubmit: handleSubmit,
        title: 'Invite Contact',
        children: expect.any(Array)
      },
      {}
    )
  })
})
