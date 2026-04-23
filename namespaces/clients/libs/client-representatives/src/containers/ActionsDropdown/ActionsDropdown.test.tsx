import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { fireEvent } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { RepresentativeFragment } from '../../data'
import MoreActionsDropdown, { Props } from './ActionsDropdown'
import { isDropdownVisible } from './services/is-dropdown-visible/is-dropdown-visible'

const mockLoginAs = jest.fn()

jest.mock('@staff-portal/facilities', () => ({
  ...jest.requireActual('@staff-portal/facilities'),
  useLoginAs: () => ({
    loginAs: mockLoginAs
  })
}))

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useLocation: () => ({
    location: jest.fn()
  })
}))

const mockMarkAsPrimary = jest.fn()

jest.mock(
  './data/mark-as-primary-representative/mark-as-primary-representative.staff.gql',
  () => ({
    useMarkCompanyRepresentativeAsPrimary: () => [mockMarkAsPrimary]
  })
)
jest.mock('@staff-portal/clients', () => ({
  useCreateConversationForStaff: () => [mockMarkAsPrimary]
}))

jest.mock('./services/is-dropdown-visible/is-dropdown-visible', () => ({
  isDropdownVisible: jest.fn()
}))

const isDropdownVisibleMock = isDropdownVisible as jest.Mock

const HIDDEN_OPERATION = {
  callable: OperationCallableTypes.HIDDEN,
  messages: []
}
const ENABLED_OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const renderComponent = (
  operations: Partial<Props['representative']['operations']> = {},
  fullList = false
) => {
  const representative: Props['representative'] = {
    id: '123',
    fullName: 'Thomas Müller',
    invitedToLoginAt: new Date(2020, 2, 1).toISOString(),
    disabledCommunicationOptions: [],
    client: {
      id: '456',
      __typename: 'Client',
      webResource: {
        __typename: 'Link',
        text: 'Great Company'
      }
    },
    gdprReportUrl: 'http://gd.pr',
    paymentsUrl: {
      url: 'https://payments.com',
      enabled: true,
      messages: []
    },
    operations: {
      __typename: 'CompanyRepresentativeOperations',
      inviteToLoginCompanyRepresentative: HIDDEN_OPERATION,
      loginAs: HIDDEN_OPERATION,
      markCompanyRepresentativeAsPrimary: HIDDEN_OPERATION,
      deactivateCompanyRepresentative: HIDDEN_OPERATION,
      reactivateCompanyRepresentative: HIDDEN_OPERATION,
      ...operations
    }
  } as unknown as RepresentativeFragment

  return render(
    <TestWrapper>
      <MoreActionsDropdown
        representative={representative}
        fullList={fullList}
      />
    </TestWrapper>
  )
}

const openMenu = () => screen.getByTestId('more-button').click()

describe('Operations', () => {
  beforeEach(() => {
    isDropdownVisibleMock.mockReturnValue(true)
  })

  describe('More button', () => {
    it(`it's not rendered when there are no items to display`, async () => {
      isDropdownVisibleMock.mockReturnValue(false)
      renderComponent()

      expect(screen.queryByTestId('more-button')).not.toBeInTheDocument()
    })
  })

  describe('inviteToLoginCompanyRepresentative', () => {
    it('does not render when HIDDEN', () => {
      renderComponent({
        markCompanyRepresentativeAsPrimary: ENABLED_OPERATION,
        inviteToLoginCompanyRepresentative: HIDDEN_OPERATION
      })
      openMenu()

      expect(screen.queryByText(/Invite to Login/i)).not.toBeInTheDocument()
    })

    it('renders when ENABLED', () => {
      renderComponent({
        inviteToLoginCompanyRepresentative: ENABLED_OPERATION
      })
      openMenu()

      expect(screen.getByText(/Invite to Login/i)).toBeInTheDocument()
    })
  })

  describe('loginAs', () => {
    it('does not render when HIDDEN', () => {
      renderComponent({
        inviteToLoginCompanyRepresentative: ENABLED_OPERATION,
        loginAs: HIDDEN_OPERATION
      })
      openMenu()

      expect(screen.queryByText(/Login As This User/i)).not.toBeInTheDocument()
    })

    it('renders when ENABLED', () => {
      renderComponent({
        loginAs: ENABLED_OPERATION
      })
      openMenu()

      expect(screen.getByText(/Login As This User/i)).toBeInTheDocument()
    })

    it('calls callback on click', () => {
      renderComponent({
        loginAs: ENABLED_OPERATION
      })
      openMenu()

      fireEvent.click(screen.getByText(/Login As This User/i))

      expect(mockLoginAs).toHaveBeenCalled()
    })
  })

  describe('markCompanyRepresentativeAsPrimary', () => {
    it('does not render when HIDDEN', () => {
      renderComponent({
        loginAs: ENABLED_OPERATION,
        markCompanyRepresentativeAsPrimary: HIDDEN_OPERATION
      })
      openMenu()

      expect(
        screen.queryByText(/Make primary contact/i)
      ).not.toBeInTheDocument()
    })

    it('renders when ENABLED', () => {
      renderComponent({
        markCompanyRepresentativeAsPrimary: ENABLED_OPERATION
      })
      openMenu()

      expect(screen.getByText(/Make primary contact/i)).toBeInTheDocument()
    })

    describe('Mutation', () => {
      it('renders success notification', async () => {
        mockMarkAsPrimary.mockReturnValue(
          Promise.resolve({
            data: { markCompanyRepresentativeAsPrimary: { success: true } }
          })
        )

        renderComponent({
          markCompanyRepresentativeAsPrimary: ENABLED_OPERATION
        })
        openMenu()

        fireEvent.click(screen.getByText(/Make primary contact/i))

        expect(
          await screen.findByText('Primary representative updated.')
        ).toBeInTheDocument()
      })

      it('renders form level errors', async () => {
        mockMarkAsPrimary.mockReturnValue(
          Promise.resolve({
            data: {
              markCompanyRepresentativeAsPrimary: {
                success: false,
                errors: [{ message: "Can't touch this 🕺🏿", key: 'base' }]
              }
            }
          })
        )

        renderComponent({
          markCompanyRepresentativeAsPrimary: ENABLED_OPERATION
        })
        openMenu()

        fireEvent.click(screen.getByText(/Make primary contact/i))

        expect(
          await screen.findByText("Can't touch this 🕺🏿")
        ).toBeInTheDocument()
      })
    })
  })

  describe('deactivate', () => {
    it('does not render when HIDDEN', () => {
      renderComponent({
        loginAs: ENABLED_OPERATION,
        deactivateCompanyRepresentative: HIDDEN_OPERATION
      })
      openMenu()

      expect(screen.queryByText(/Delete/i)).not.toBeInTheDocument()
    })

    it('renders when ENABLED', () => {
      renderComponent({
        deactivateCompanyRepresentative: ENABLED_OPERATION
      })
      openMenu()

      expect(screen.getByText(/Delete/i)).toBeInTheDocument()
    })
  })

  describe('reactivate', () => {
    it('does not render when HIDDEN', () => {
      renderComponent({
        loginAs: ENABLED_OPERATION,
        reactivateCompanyRepresentative: HIDDEN_OPERATION
      })
      openMenu()

      expect(screen.queryByText(/Restore/i)).not.toBeInTheDocument()
    })

    it('renders when ENABLED', () => {
      renderComponent({
        reactivateCompanyRepresentative: ENABLED_OPERATION
      })
      openMenu()

      expect(screen.getByText(/Restore/i)).toBeInTheDocument()
    })
  })

  describe('Small (default) list', () => {
    it('does not render gdpr link', () => {
      renderComponent({ loginAs: ENABLED_OPERATION })
      openMenu()

      expect(screen.queryByText(/GDPR report/i)).not.toBeInTheDocument()
    })

    it('does not render payments link', () => {
      renderComponent({ loginAs: ENABLED_OPERATION })
      openMenu()

      expect(screen.queryByText(/Payments/i)).not.toBeInTheDocument()
    })

    it('renders `mark as primary` item', () => {
      renderComponent({ markCompanyRepresentativeAsPrimary: ENABLED_OPERATION })
      openMenu()

      expect(screen.queryByText(/Make primary contact/i)).toBeInTheDocument()
    })
  })

  describe('Full list', () => {
    it('renders gdpr link', () => {
      const { container } = renderComponent(
        { loginAs: ENABLED_OPERATION },
        true
      )

      openMenu()

      expect(screen.queryByText(/GDPR report/i)).toBeInTheDocument()
      expect(
        container.querySelector('a[href="http://gd.pr"]')
      ).toBeInTheDocument()
    })

    it('renders payments link', () => {
      const { container } = renderComponent(
        { loginAs: ENABLED_OPERATION },
        true
      )

      openMenu()

      expect(screen.queryByText(/Payments/i)).toBeInTheDocument()
      expect(
        container.querySelector('a[href="https://payments.com"]')
      ).toBeInTheDocument()
    })

    it('does not render `mark as primary` item', () => {
      renderComponent(
        { markCompanyRepresentativeAsPrimary: ENABLED_OPERATION },
        true
      )
      openMenu()

      expect(
        screen.queryByText(/Make primary contact/i)
      ).not.toBeInTheDocument()
    })
  })
})
