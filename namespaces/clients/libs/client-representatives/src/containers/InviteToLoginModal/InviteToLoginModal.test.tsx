import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { PromptModal } from '@staff-portal/modals-service'

import { InviteToLoginCompanyRepresentativeFragment } from '../../data'
import { InviteToLoginCompanyRepresentativeDocument } from './data'
import InviteToLoginModal from './InviteToLoginModal'

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useGetCurrentUser: jest.fn()
}))

const USER = {
  timeZone: {
    value: Symbol('timezone-value')
  }
}
const FORMATTED_DATED = 'FORMATTED_DATE'
const LOADING = Symbol('loading')
const HANDLE_SUBMIT = jest.fn()
const HIDE_MODAL = () => {}
const PERMISSION_ALERT_TEXT =
  'Warning: inviting this contact to login will also enable Client Portal access with Default permissions.'

const getContact = (props?: {
  portalPermissionsEnabled?: boolean
  invitedToLoginAt?: null | symbol
}) =>
  ({
    fullName: 'Test Name',
    invitedToLoginAt: props?.invitedToLoginAt,
    client: {
      portalPermissionsEnabled: props?.portalPermissionsEnabled
    }
  } as unknown as InviteToLoginCompanyRepresentativeFragment)

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  PromptModal: jest.fn()
}))

jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  parseAndFormatDate: jest.fn()
}))

const parseAndFormatDateMock = parseAndFormatDate as jest.Mock

const renderComponent = (contact: InviteToLoginCompanyRepresentativeFragment) =>
  render(
    <TestWrapper>
      <InviteToLoginModal hideModal={HIDE_MODAL} contact={contact} />
    </TestWrapper>
  )

const useGetCurrentUserMock = useGetCurrentUser as jest.Mock
const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock
const PromptModalMock = PromptModal as jest.Mock

describe('InviteToLoginModal', () => {
  beforeEach(() => {
    useGetCurrentUserMock.mockReturnValue(USER)
    useModalFormChangeHandlerMock.mockReturnValue({
      handleSubmit: HANDLE_SUBMIT,
      loading: LOADING
    })
    PromptModalMock.mockImplementation(({ message }) => message)
    parseAndFormatDateMock.mockReturnValue(FORMATTED_DATED)
  })

  it('invokes inners hooks correctly', () => {
    const contact = getContact()

    renderComponent(contact)

    expect(useGetCurrentUserMock).toHaveBeenCalled()
    expect(useModalFormChangeHandlerMock).toHaveBeenCalledWith({
      mutationDocument: InviteToLoginCompanyRepresentativeDocument,
      mutationResultOptions: {
        onSuccessAction: HIDE_MODAL,
        successNotificationMessage: `You've successfully invited Test Name to Login.`
      }
    })
  })

  it('renders general text correctly', () => {
    const contact = getContact()

    renderComponent(contact)

    expect(
      screen.getByText(
        'Test Name will get an email with the link to set their password.'
      )
    ).toBeInTheDocument()

    expect(
      screen.getByText('Are you sure you want to send it?')
    ).toBeInTheDocument()
  })

  describe('when invitedToLoginAt passed', () => {
    it('renders a warning', () => {
      const invitedToLoginAt = Symbol('invite-to-login-at')
      const contact = getContact({ invitedToLoginAt })

      renderComponent(contact)

      expect(parseAndFormatDateMock).toHaveBeenCalledWith(invitedToLoginAt, {
        timeZone: USER.timeZone.value
      })

      expect(
        screen.getByTestId('invite-to-login-modal-warning').textContent
      ).toBe(
        'Warning: Invitation to Test Name has already been sent on FORMATTED_DATE.'
      )
    })
  })

  describe('when invitedToLoginAt is not passed', () => {
    it("doesn't render a warning", () => {
      const invitedToLoginAt = null
      const contact = getContact({ invitedToLoginAt })

      renderComponent(contact)

      expect(screen.queryByTestId('invite-to-login-modal-warning')).toBeNull()
    })
  })

  describe('when client has portalPermissionsEnabled set to true', () => {
    it("doesn't render an Alert", () => {
      const contact = getContact({ portalPermissionsEnabled: true })

      renderComponent(contact)

      expect(screen.queryByTestId('invite-to-login-modal-alert')).toBeNull()
    })
  })

  describe('when client has portalPermissionsEnabled set to false', () => {
    it('renders an Alert', () => {
      const contact = getContact({ portalPermissionsEnabled: false })

      renderComponent(contact)

      expect(
        screen.getByTestId('invite-to-login-modal-alert').textContent
      ).toBe(PERMISSION_ALERT_TEXT)
    })
  })
})
