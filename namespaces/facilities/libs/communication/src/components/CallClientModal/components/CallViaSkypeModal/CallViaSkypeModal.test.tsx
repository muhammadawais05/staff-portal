import React, { ComponentProps } from 'react'
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { navigateExternallyTo } from '@staff-portal/navigation'
import { TestWrapper } from '@staff-portal/test-utils'

import CallViaSkypeModal from './CallViaSkypeModal'
import { createCallableClientFragmentMock } from '../../../../data/callable-client-fragment/mocks'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  navigateExternallyTo: jest.fn()
}))

const navigateExternallyToMock = navigateExternallyTo as jest.Mock

const arrangeTest = ({
  calleeName,
  contacts,
  hideModal,
  onCompleted
}: Omit<ComponentProps<typeof CallViaSkypeModal>, 'startCallForContact'>) =>
  render(
    <TestWrapper>
      <CallViaSkypeModal
        calleeName={calleeName}
        contacts={contacts}
        startCallForContact={() =>
          new Promise(resolve => setTimeout(resolve, 100))
        }
        hideModal={hideModal}
        onCompleted={onCompleted}
      />
    </TestWrapper>
  )

describe('CallViaSkypeModal', () => {
  it('displays an invitation to call default contact and make a call via Skype', async () => {
    const CALLEE_NAME = 'Test Company (cl8)'
    const CONTACT_ID = '1000'
    const CONTACT_VALUE = '+12345678902'

    const callableClientMock = createCallableClientFragmentMock({
      contacts: [
        {
          id: CONTACT_ID,
          value: CONTACT_VALUE
        }
      ]
    })

    const hideModalMock = jest.fn()
    const onCompletedMock = jest.fn()

    arrangeTest({
      calleeName: CALLEE_NAME,
      contacts: callableClientMock.contact.contacts.nodes,
      hideModal: hideModalMock,
      onCompleted: onCompletedMock
    })

    screen.getAllByText(
      (_, element) =>
        element?.textContent ===
        `Time to call "${CALLEE_NAME}". Please make sure that you are in quiet place with good connection.`
    )
    const submitButton = screen.getByText('Call Company')

    fireEvent.click(submitButton)

    await waitForElementToBeRemoved(() =>
      document.querySelector('[role="progressbar"]')
    )

    expect(hideModalMock).toHaveBeenCalledTimes(1)
    expect(onCompletedMock).toHaveBeenCalledTimes(1)
    expect(navigateExternallyToMock).toHaveBeenCalledWith(
      `skype:${CONTACT_VALUE}`
    )
  })

  it('displays phone number selector if there are multiple phone numbers available and make a call via Skype', async () => {
    const CALLEE_NAME = 'Test Company (ab1)'
    const PRIMARY_CONTACT_ID = '1003'
    const PRIMARY_CONTACT_VALUE = '+12345678903'
    const NON_PRIMARY_CONTACT_ID = '1004'
    const NON_PRIMARY_CONTACT_VALUE = '+12345678904'

    const callableClientMock = createCallableClientFragmentMock({
      contacts: [
        {
          id: NON_PRIMARY_CONTACT_ID,
          value: NON_PRIMARY_CONTACT_VALUE
        },
        {
          id: PRIMARY_CONTACT_ID,
          value: PRIMARY_CONTACT_VALUE,
          primary: true
        }
      ]
    })

    const hideModalMock = jest.fn()
    const onCompletedMock = jest.fn()

    arrangeTest({
      calleeName: CALLEE_NAME,
      contacts: callableClientMock.contact.contacts.nodes,
      hideModal: hideModalMock,
      onCompleted: onCompletedMock
    })

    screen.getAllByText(
      (_, element) =>
        element?.textContent ===
        `Call "${CALLEE_NAME}" by using the following contact details:`
    )

    const primaryPhoneNumberCheckbox = screen.getByLabelText(
      `Phone (${PRIMARY_CONTACT_VALUE})`
    )

    expect(primaryPhoneNumberCheckbox).toBeInTheDocument()

    const nonPrimaryPhoneNumberCheckbox = screen.getByLabelText(
      `Phone (${NON_PRIMARY_CONTACT_VALUE})`
    )

    expect(nonPrimaryPhoneNumberCheckbox).toBeInTheDocument()

    fireEvent.click(nonPrimaryPhoneNumberCheckbox)

    const submitButton = screen.getByText('Call Company')

    fireEvent.click(submitButton)

    await waitForElementToBeRemoved(() =>
      document.querySelector('[role="progressbar"]')
    )

    expect(hideModalMock).toHaveBeenCalledTimes(1)
    expect(onCompletedMock).toHaveBeenCalledTimes(1)
    expect(navigateExternallyToMock).toHaveBeenCalledWith(
      `skype:${NON_PRIMARY_CONTACT_VALUE}`
    )
  })

  it('shows a single phone number if there are numbers with same value', () => {
    const CONTACT_VALUE = '+12345678903'
    const PRIMARY_CONTACT_ID = '1003'
    const NON_PRIMARY_CONTACT_ID = '1004'

    const callableClientMock = createCallableClientFragmentMock({
      contacts: [
        {
          id: NON_PRIMARY_CONTACT_ID,
          value: CONTACT_VALUE
        },
        {
          id: PRIMARY_CONTACT_ID,
          value: CONTACT_VALUE
        }
      ]
    })

    arrangeTest({
      contacts: callableClientMock.contact.contacts.nodes
    })

    expect(screen.getAllByText(CONTACT_VALUE, { exact: false })).toHaveLength(1)
  })
})
