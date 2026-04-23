import { render, screen } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import { companyMetadataFragmentMock } from '../../data/get-client/company-metadata-fragment.mock'
import { CompanyNegotiationFragment } from '../../../basic-info-tab/components/LinkedCompaniesSection/data/company-negotiation-fragment.staff.gql.types'
import CompanyMoreActionsDropdown from '.'
import { ClientMetadataFragment } from '../../data/get-client'

jest.mock(
  './utils/use-company-dropdown-actions',
  () => ({
    useCompanyDropdownActions: () => ({
      loading: false,
      setLoading: jest.fn(),
      renderSendEmailModal: jest.fn(),
      showEnableEmbeddedSigningModal: jest.fn(),
      showDisableEmbeddedSigningModal: jest.fn(),
      loginAs: jest.fn()
    })
  })
)

const getCompanyMock = (
  companyMetaData: Partial<Omit<ClientMetadataFragment, 'operations'>> & {
    operations?: Partial<ClientMetadataFragment['operations']>
  } = {}
) => {
  const company: ClientMetadataFragment = {
    ...companyMetadataFragmentMock,
    ...companyMetaData,
    operations: {
      ...companyMetadataFragmentMock.operations,
      ...companyMetaData.operations
    }
  }

  return company
}

const renderComponent = (
  props: ComponentProps<typeof CompanyMoreActionsDropdown>
) => {
  return render(
    <TestWrapper>
      <CompanyMoreActionsDropdown {...props} />
    </TestWrapper>
  )
}

const openMenu = () => {
  screen.getByTestId('more-button').click()
}

describe('Operations', () => {
  it('renders Pause Company link', () => {
    const company = getCompanyMock()

    renderComponent({ company })
    openMenu()

    expect(screen.getByText('Pause Company')).toBeInTheDocument()
  })

  it('renders Mark As Bad Lead link', () => {
    const company = getCompanyMock({
      operations: { markClientAsBadLead: createOperationMock() }
    })

    renderComponent({ company })
    openMenu()

    expect(screen.getByText('Mark As Bad Lead')).toBeInTheDocument()
  })

  it('renders Invite Contact link', () => {
    const company = getCompanyMock({
      operations: { inviteCompanyRepresentative: createOperationMock() }
    })

    renderComponent({ company })
    openMenu()

    expect(screen.getByText('Invite Contact')).toBeInTheDocument()
  })

  it('renders Invoices link', () => {
    const company = getCompanyMock()

    renderComponent({ company })
    openMenu()

    expect(screen.getByText('Invoices')).toBeInTheDocument()
  })

  it('renders Payments link', () => {
    const company = getCompanyMock()

    renderComponent({ company })
    openMenu()

    expect(screen.getByText('Payments')).toBeInTheDocument()
  })

  it('renders Communication link', () => {
    const company = getCompanyMock()

    renderComponent({ company })
    openMenu()

    expect(screen.getByText('Communication')).toBeInTheDocument()
    expect(screen.getByText('Communication').closest('a')?.href).toMatch(
      /companies\/2596580\/email_messages/
    )
    expect(screen.getByText('Communication').closest('a')?.target).not.toBe(
      '_blank'
    )
  })

  it('renders GDPR report link', () => {
    const company = getCompanyMock()

    renderComponent({ company })
    openMenu()

    expect(screen.getByText('GDPR Report')).toBeInTheDocument()
  })

  it('renders Add New Job link', () => {
    const company = getCompanyMock()

    renderComponent({ company })
    openMenu()

    expect(screen.getByText('Add New Job')).toBeInTheDocument()
  })

  describe('when user has enough permissions', () => {
    it('renders Workflows link', () => {
      const company = getCompanyMock()

      renderComponent({ company })
      openMenu()

      expect(screen.getByText('Workflows')).toBeInTheDocument()
      expect(screen.getByText('Workflows').closest('a')?.href).toMatch(
        /companies\/123\/cases/
      )
      expect(screen.getByText('Workflows').closest('a')?.target).toBe('_blank')
    })

    it('renders Referred Users link', () => {
      const company = getCompanyMock()

      renderComponent({ company })
      openMenu()

      expect(screen.getByText('Referred Users')).toBeInTheDocument()
    })

    it('renders Edit Profile link', () => {
      const company = getCompanyMock()

      renderComponent({ company })
      openMenu()

      expect(screen.getByText('Edit Profile')).toBeInTheDocument()
    })
  })

  describe('when user has lack of permissions (no data)', () => {
    it('does not render Workflows link', () => {
      const company = getCompanyMock({ casesUrl: null })

      renderComponent({ company })
      openMenu()

      expect(screen.queryByText('Workflows')).not.toBeInTheDocument()
    })

    it('does not render Referred Users link', () => {
      const company = getCompanyMock({ referralsUrl: null })

      renderComponent({ company })
      openMenu()

      expect(screen.queryByText('Referred Users')).not.toBeInTheDocument()
    })

    it('does not render Edit Profile link', () => {
      const company = getCompanyMock({ updateProfileUrl: undefined })

      renderComponent({ company })
      openMenu()

      expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument()
    })
  })

  describe.each([
    { label: 'Issue an Invoice', operation: 'createClientServiceInvoice' },
    {
      label: 'Issue a Deposit Invoice',
      operation: 'createClientDepositInvoice'
    },
    {
      label: 'Disable Embedded Contract Signing',
      operation: 'disableEmbeddedSigning'
    },
    {
      label: 'Enable Embedded Contract Signing',
      operation: 'enableEmbeddedSigning'
    },
    { label: 'Import STA', operation: 'importSTA' },
    { label: 'Start Negotiations', operation: 'startNegotiationForClient' },
    {
      label: 'Update Negotiations Status',
      mock: (callable = OperationCallableTypes.ENABLED) =>
        getCompanyMock({
          currentNegotiation: {
            id: 'id',
            operations: {
              updateNegotiationStatus: {
                callable,
                messages: []
              }
            }
          } as unknown as CompanyNegotiationFragment['currentNegotiation']
        })
    },
    {
      label: 'Suspend Current Negotiation',
      mock: (callable = OperationCallableTypes.ENABLED) =>
        getCompanyMock({
          currentNegotiation: {
            id: 'id',
            operations: {
              suspendNegotiation: {
                callable,
                messages: []
              }
            }
          } as unknown as CompanyNegotiationFragment['currentNegotiation']
        })
    },
    { label: 'Leave Feedback', operation: 'leaveFeedbackClient' },
    {
      label: 'Send Email',
      mock: (callable = OperationCallableTypes.ENABLED) =>
        getCompanyMock({
          emailMessaging: {
            id: 'id',
            operations: {
              sendEmailTo: {
                callable,
                messages: []
              }
            }
          }
        })
    },
    {
      label: 'Open TopChat Conversation',
      mock: (callable = OperationCallableTypes.ENABLED) =>
        getCompanyMock({
          contact: {
            id: 'id',
            operations: {
              createConversationForStaff: {
                callable,
                messages: []
              }
            }
          } as unknown as ClientMetadataFragment['contact']
        })
    }
  ])('renders as expected', ({ label, operation, mock }) => {
    it(`does not render ${label} when HIDDEN`, () => {
      const company = getCompanyMock()

      renderComponent({ company })
      openMenu()

      expect(screen.queryByText(label)).not.toBeInTheDocument()
    })

    it(`renders ${label} when ENABLED`, () => {
      const company = mock
        ? mock()
        : getCompanyMock({
            operations: {
              [operation as string]: {
                callable: OperationCallableTypes.ENABLED,
                messages: []
              }
            }
          })

      renderComponent({ company })
      openMenu()

      expect(screen.getByText(label)).toBeInTheDocument()
    })

    it(`renders disabled ${label} item when DISABLED`, () => {
      const company = mock
        ? mock(OperationCallableTypes.DISABLED)
        : getCompanyMock({
            operations: {
              [operation as string]: {
                callable: OperationCallableTypes.DISABLED,
                messages: []
              }
            }
          })

      renderComponent({ company })
      openMenu()

      expect(screen.getByText(label)).toBeInTheDocument()
      expect(screen.getByText(label).closest('li')).toHaveAttribute(
        'aria-disabled',
        'true'
      )
    })
  })
})
