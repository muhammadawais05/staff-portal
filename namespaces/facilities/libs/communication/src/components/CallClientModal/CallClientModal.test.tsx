import React, { ComponentProps, useEffect } from 'react'
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal } from '@toptal/picasso/utils'
import { navigateExternallyTo } from '@staff-portal/navigation'
import { ContactType } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import {
  createCallContactMock,
  createCallContactFailedMock,
  createCallContactInvalidMock,
  createCallableClientFragmentMock
} from '../../mocks'
import CallClientModal from './CallClientModal'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  navigateExternallyTo: jest.fn()
}))

const navigateExternallyToMock = navigateExternallyTo as jest.Mock

const TestComponent = ({
  client,
  onCompleted
}: Pick<ComponentProps<typeof CallClientModal>, 'client' | 'onCompleted'>) => {
  const { showModal, hideModal, isOpen } = useModal()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => showModal(), [])

  return isOpen ? (
    <CallClientModal
      client={client}
      onCompleted={onCompleted}
      hideModal={hideModal}
    />
  ) : null
}

const ERROR_CASES = [
  ['fails', 'enabled', 'Start Call'],
  ['is invalid', 'enabled', 'Start Call'],
  ['fails', 'disabled', 'Call Company'],
  ['is invalid', 'disabled', 'Call Company']
]

describe('Communication module', () => {
  it('should call client phone number via TopCall if the TopCall is enabled for caller', async () => {
    const CLIENT_NAME = 'Client Name (ku7)'
    const COMPANY_REPRESENTATIVE_ID = encodeEntityId('3000', 'Test')
    const CONTACT_ID = '2000'
    const clientMock = createCallableClientFragmentMock({
      clientName: CLIENT_NAME,
      roleId: COMPANY_REPRESENTATIVE_ID,
      contacts: [
        {
          id: CONTACT_ID,
          value: '+12345678812',
          type: ContactType.PHONE,
          external: false,
          primary: true
        }
      ]
    })

    const onCompletedMock = jest.fn()

    render(
      <TestWrapperWithMocks
        mocks={[
          createCallContactMock({
            input: {
              roleId: COMPANY_REPRESENTATIVE_ID,
              contactId: CONTACT_ID
            }
          })
        ]}
      >
        <TestComponent client={clientMock} onCompleted={onCompletedMock} />
      </TestWrapperWithMocks>
    )

    expect(screen.getByText(`Call ${CLIENT_NAME}`)).toBeInTheDocument()

    const submitButton = screen.getByText('Start Call')

    fireEvent.click(submitButton)

    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'))

    expect(onCompletedMock).toHaveBeenCalledTimes(1)
  })

  it('should call client phone number via Skype if the TopCall is disabled for caller', async () => {
    const CLIENT_NAME = 'Client Name (xp9)'
    const COMPANY_REPRESENTATIVE_ID = encodeEntityId('4000', 'Test')
    const PHONE_CONTACT_ID = '12345678735'
    const PHONE_CONTACT_VALUE = '+12345678735'

    const clientMock = createCallableClientFragmentMock({
      clientName: CLIENT_NAME,
      roleId: COMPANY_REPRESENTATIVE_ID,
      contacts: [
        {
          id: PHONE_CONTACT_ID,
          value: PHONE_CONTACT_VALUE,
          type: ContactType.PHONE,
          external: true,
          primary: true
        },
        {
          id: '12345678111',
          value: '+12345678111',
          type: ContactType.PHONE,
          external: true
        }
      ]
    })

    const onCompletedMock = jest.fn()

    render(
      <TestWrapperWithMocks
        mocks={[
          createCallContactMock({
            input: {
              roleId: COMPANY_REPRESENTATIVE_ID,
              contactId: PHONE_CONTACT_ID
            }
          })
        ]}
      >
        <TestComponent client={clientMock} onCompleted={onCompletedMock} />
      </TestWrapperWithMocks>
    )

    fireEvent.click(screen.getByLabelText(`Phone (${PHONE_CONTACT_VALUE})`))
    const submitButton = screen.getByText('Call Company')

    fireEvent.click(submitButton)

    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'))

    expect(onCompletedMock).toHaveBeenCalledTimes(1)
    expect(navigateExternallyToMock).toHaveBeenCalledWith(
      `skype:${PHONE_CONTACT_VALUE}`
    )
  })

  it('should call client Skype nickname via Skype if the TopCall is disabled for caller', async () => {
    const CLIENT_NAME = 'Client Name (rq4)'
    const COMPANY_REPRESENTATIVE_ID = encodeEntityId('5000', 'Test')
    const PHONE_CONTACT_ID = '12345678655'
    const PHONE_CONTACT_VALUE = '+12345678655'
    const SKYPE_CONTACT_ID = '200'
    const SKYPE_CONTACT_VALUE = 'test-skype-nickname-200'

    const clientMock = createCallableClientFragmentMock({
      clientName: CLIENT_NAME,
      roleId: COMPANY_REPRESENTATIVE_ID,
      contacts: [
        {
          id: PHONE_CONTACT_ID,
          value: PHONE_CONTACT_VALUE,
          type: ContactType.PHONE,
          external: true,
          primary: true
        },
        {
          id: SKYPE_CONTACT_ID,
          value: SKYPE_CONTACT_VALUE,
          type: ContactType.SKYPE,
          external: true
        }
      ]
    })

    const callContactMock = createCallContactMock({
      input: {
        roleId: COMPANY_REPRESENTATIVE_ID,
        contactId: SKYPE_CONTACT_ID
      }
    })

    const onCompletedMock = jest.fn()

    render(
      <TestWrapperWithMocks mocks={[callContactMock]}>
        <TestComponent client={clientMock} onCompleted={onCompletedMock} />
      </TestWrapperWithMocks>
    )

    const callPhoneRadioSelector = screen.getByLabelText(
      `Phone (${PHONE_CONTACT_VALUE})`
    )

    expect(callPhoneRadioSelector).toBeInTheDocument()

    const callSkypeRadioSelector = screen.getByLabelText(
      `Skype (${SKYPE_CONTACT_VALUE})`
    )

    expect(callSkypeRadioSelector).toBeInTheDocument()

    fireEvent.click(callSkypeRadioSelector)

    const submitButton = screen.getByText('Call Company')

    fireEvent.click(submitButton)

    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'))

    expect(onCompletedMock).toHaveBeenCalledTimes(1)
    expect(navigateExternallyToMock).toHaveBeenCalledWith(
      `skype:${SKYPE_CONTACT_VALUE}`
    )
  })

  // TODO: https://toptal-core.atlassian.net/browse/SPB-2248
  // Disabled due its started to fail during the react-router usage
  // eslint-disable-next-line
  it.skip.each(ERROR_CASES)(
    'should display error if the call contact request %s when TopCall is %s for caller',
    async (
      errorType: string,
      topCallStatus: string,
      submitButtonText: string
    ) => {
      const COMPANY_REPRESENTATIVE_ID = encodeEntityId('6000', 'Test')
      const PHONE_CONTACT_ID = '600'

      const clientMock = createCallableClientFragmentMock({
        roleId: COMPANY_REPRESENTATIVE_ID,
        contacts: [
          {
            id: PHONE_CONTACT_ID,
            primary: true,
            external: topCallStatus !== 'enabled'
          }
        ]
      })

      const callContactMock =
        errorType === 'fails'
          ? createCallContactFailedMock({
              input: {
                roleId: COMPANY_REPRESENTATIVE_ID,
                contactId: PHONE_CONTACT_ID
              }
            })
          : createCallContactInvalidMock({
              input: {
                roleId: COMPANY_REPRESENTATIVE_ID,
                contactId: PHONE_CONTACT_ID
              },
              errors: [
                { code: '', key: '100', message: 'User error 1' },
                { code: '', key: '200', message: 'User error 2' }
              ]
            })

      render(
        <TestWrapperWithMocks mocks={[callContactMock]}>
          <TestComponent client={clientMock} onCompleted={() => {}} />
        </TestWrapperWithMocks>
      )

      const submitButton = await screen.findByText(submitButtonText)

      fireEvent.click(submitButton)
      await waitForElementToBeRemoved(() => screen.queryByRole('dialog'))

      expect(
        await screen.findByText(
          errorType === 'fails'
            ? 'Unable to call contact.'
            : 'User error 1. User error 2.'
        )
      ).toBeInTheDocument()
    }
  )
})
