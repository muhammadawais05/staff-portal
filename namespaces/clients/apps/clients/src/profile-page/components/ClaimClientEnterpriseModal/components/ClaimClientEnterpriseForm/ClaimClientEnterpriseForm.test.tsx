import React, { ReactNode } from 'react'
import { Form } from '@toptal/picasso-forms'
import { SkypeLink, PhoneLink } from '@staff-portal/communication'
import { ContactType } from '@staff-portal/graphql/staff'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { render } from '@toptal/picasso/test-utils'
import { CLIENT_UPDATED } from '@staff-portal/clients'
import { findContact } from '@staff-portal/contacts'
import { useSendEmailModal } from '@staff-portal/communication-send-email'

import ClaimClientEnterpriseForm from '.'

jest.mock(
  '@staff-portal/contacts/src/services/find-contact/find-contact.ts',
  () => ({
    findContact: jest.fn()
  })
)
jest.mock('@staff-portal/communication-send-email', () => ({
  useSendEmailModal: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers/src/hooks', () => ({
  useModalFormChangeHandler: jest.fn()
}))
jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    Checkbox: jest.fn(),
    SubmitButton: jest.fn()
  }
}))
jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  ModalForm: ({ children }: { children: ReactNode }) => <>{children}</>
}))
jest.mock('@staff-portal/communication', () => ({
  SkypeLink: jest.fn(),
  PhoneLink: jest.fn()
}))

const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock
const useSendEmailModalMock = useSendEmailModal as jest.Mock
const findContactMock = findContact as jest.Mock
const mockedCheckbox = Form.Checkbox as unknown as jest.Mock
const mockedSubmitButton = Form.SubmitButton as unknown as jest.Mock
const mockedSkypeLink = SkypeLink as jest.Mock
const mockedPhoneLink = PhoneLink as jest.Mock

const hideModal = () => {}
const clientId = 'clientId'
const skypeId = 'skypeId'
const roleId = 'roleId'
const phoneContactId = 'phoneId'
const phoneContactValue = 'phoneContactValue'
const contacts = {
  nodes: [
    {
      id: phoneContactId,
      type: ContactType.PHONE,
      value: phoneContactValue
    },
    { id: '123', type: ContactType.SKYPE, value: skypeId }
  ]
}
const node = {
  id: clientId,
  fullName: 'fullName',
  contact: {
    id: roleId,
    fullName: 'contactFullName',
    contacts
  }
}

describe('ClaimClientEnterpriseForm', () => {
  it('renders as expected', () => {
    findContactMock
      .mockReturnValueOnce({ value: skypeId })
      .mockReturnValueOnce({
        id: phoneContactId,
        value: phoneContactValue
      })
    useModalFormChangeHandlerMock.mockReturnValue({
      loading: false,
      handleSubmit: () => {}
    })
    useSendEmailModalMock.mockReturnValue({
      showModal: () => {}
    })
    mockedCheckbox.mockReturnValue(null)
    mockedSubmitButton.mockReturnValue(null)
    mockedSkypeLink.mockReturnValue(null)
    mockedPhoneLink.mockReturnValue(null)

    render(
      <ClaimClientEnterpriseForm
        hideModal={hideModal}
        clientId={clientId}
        data={node}
      />
    )

    expect(useSendEmailModalMock).toHaveBeenCalledTimes(1)
    expect(findContactMock).toHaveBeenNthCalledWith(1, contacts, 'SKYPE')
    expect(findContactMock).toHaveBeenNthCalledWith(2, contacts, 'PHONE')
    expect(useModalFormChangeHandlerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationResultOptions: {
          mutationResult: 'claimClientEnterprise',
          onSuccessAction: expect.any(Function),
          successNotificationMessage: 'Your call was successfully logged.',
          successMessageEmitOptions: {
            type: CLIENT_UPDATED,
            payload: { companyId: clientId }
          }
        }
      })
    )
    expect(mockedCheckbox).toHaveBeenCalledWith(
      {
        name: 'successfulCall',
        label: 'I was able to get in touch with them'
      },
      {}
    )
    expect(mockedSubmitButton).toHaveBeenCalledWith(
      expect.objectContaining({ children: 'Confirm Call' }),
      {}
    )
    expect(mockedSkypeLink).toHaveBeenCalledWith(
      expect.objectContaining({
        skypeId
      }),
      {}
    )
    expect(mockedPhoneLink).toHaveBeenCalledWith(
      {
        roleId,
        phoneContactId,
        phoneContactValue
      },
      {}
    )
  })
})
