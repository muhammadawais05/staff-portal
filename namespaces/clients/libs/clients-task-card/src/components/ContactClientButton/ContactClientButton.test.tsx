import React from 'react'
import { fireEvent, screen, render } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { useSendEmailModal } from '@staff-portal/communication-send-email'

import ContactClientButton from './ContactClientButton'
import { createClientContactMock } from './data/get-client-contact/mocks'

jest.mock(
  '@staff-portal/communication-send-email/src/containers/SendEmailModal/hooks/use-send-email-modal'
)

jest.mock(
  './components/SkypeButton',
  () =>
    ({ skypeId }: { skypeId: string }) =>
      <button>{skypeId}</button>
)

jest.mock(
  './components/PhoneButton',
  () =>
    ({ contactMethod }: { contactMethod: { value: string } }) =>
      <button>{contactMethod.value}</button>
)

const useSendEmailModalMock = useSendEmailModal as jest.Mock
const showModalMock = jest.fn()

const CLIENT_ID = 'VjEtQ2xpZW50LTEwNjA1'

const arrangeTest = (preselectedEmailTemplateId?: string) => {
  useSendEmailModalMock.mockReturnValue({
    showModal: showModalMock
  })

  return render(
    <TestWrapperWithMocks mocks={[createClientContactMock(CLIENT_ID)]}>
      <ContactClientButton
        clientId={CLIENT_ID}
        preselectedEmailTemplateId={preselectedEmailTemplateId}
      >
        Contact Client
      </ContactClientButton>
    </TestWrapperWithMocks>
  )
}

const openModal = async () => {
  fireEvent.click(screen.getByText('Contact Client'))
  await screen.findByText('Contact')
}

const getContactOptionByText = (text: string) =>
  screen.getByText(text).closest('label') as HTMLElement

describe('ContactClientButton', () => {
  it('should open modal', async () => {
    arrangeTest()
    await openModal()

    expect(
      screen.getByText('Please select the contact method')
    ).toBeInTheDocument()
  })

  it('should close modal', async () => {
    arrangeTest()
    await openModal()

    fireEvent.click(screen.getByText('Cancel'))

    expect(screen.queryByText('Contact', { selector: 'h3' })).toBeNull()
  })

  it('should show the given contact options', async () => {
    arrangeTest()
    await openModal()

    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Skype')).toBeInTheDocument()
    expect(screen.getByText('Phone Number')).toBeInTheDocument()
    expect(screen.getByText('Conference')).toBeInTheDocument()
  })

  it('should show action button for the selected contact option', async () => {
    arrangeTest()
    await openModal()

    fireEvent.click(getContactOptionByText('Email'))

    expect(screen.getByText('Send Email')).toBeInTheDocument()

    fireEvent.click(getContactOptionByText('Skype'))

    expect(
      screen.getByText('pura_schulist538', { exact: false })
    ).toBeInTheDocument()

    fireEvent.click(getContactOptionByText('Phone Number'))

    expect(
      screen.getByText('+14157541480', { exact: false })
    ).toBeInTheDocument()

    fireEvent.click(getContactOptionByText('Conference'))

    expect(screen.getByText('Create Conference')).toBeInTheDocument()
  })

  describe('when "Email" option is clicked', () => {
    it('triggers send email modal with preselected email template ID', async () => {
      const TEMPLATE_ID = 'abc123'

      arrangeTest(TEMPLATE_ID)
      await openModal()

      fireEvent.click(screen.getByText('Email'))
      fireEvent.click(await screen.findByText('Send Email'))

      expect(useSendEmailModalMock).toHaveBeenCalledWith({
        nodeId: CLIENT_ID,
        preselectedEmailTemplateId: TEMPLATE_ID,
        onCompleted: expect.anything()
      })
      expect(showModalMock).toHaveBeenCalled()
    })
  })
})
