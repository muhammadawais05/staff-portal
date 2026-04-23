import React, { ComponentProps } from 'react'
import { screen, render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { UserBadge } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'
import { ClientEnterpriseAccountStatusEnum } from '@staff-portal/graphql/staff'
import { ProfileHeader } from '@staff-portal/facilities'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { isEnterpriseBusiness } from '@staff-portal/clients'

import { companyOverviewFragmentMock } from '../../data/company-overview-fragment.mock'
import { isAuthorisedField } from './utils/is-authorised-field'
import AccountOverview from '.'

jest.mock('@staff-portal/clients', () => ({
  DeleteApplicationModal: jest.fn(),
  isEnterpriseBusiness: jest.fn(),
  CompanyStatus: jest.fn(),
  LeadProbabilityBucket: jest.fn(),
  ClientIcon: jest.fn()
}))
jest.mock('@staff-portal/ofac-compliance', () => ({
  OFACComplianceSection: jest.fn(),
  OFACStatusField: jest.fn()
}))
jest.mock('@staff-portal/communication', () => ({
  ClientPhoneLink: jest.fn()
}))
jest.mock('@staff-portal/facilities', () => ({
  ProfileHeader: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock(
  '@staff-portal/clients/src/services/is-enterprise-business/is-enterprise-business.ts'
)
jest.mock('@staff-portal/ui', () => {
  const mock = jest.fn() as unknown as {
    Row: Function
    Item: Function
  }

  mock.Row = jest.fn()
  mock.Item = jest.fn()

  return {
    DetailedList: mock
  }
})
jest.mock('./utils/use-patch-client-change-handler', () => ({
  usePatchClientChangeHandler: jest.fn()
}))
jest.mock('./utils/is-authorised-field', () => ({
  isAuthorisedField: jest.fn()
}))
jest.mock('./components', () => ({
  ParentLink: jest.fn(),
  AccountOverviewContactName: jest.fn(),
  AccountOverviewEmail: jest.fn(),
  AccountOverviewSkype: jest.fn(),
  CountAsLead: jest.fn(),
  PrimaryRegion: jest.fn(),
  PhoneContacts: jest.fn(),
  CompanyHqPhone: jest.fn(),
  TimeZone: jest.fn(),
  LegalName: jest.fn(),
  LegalContact: jest.fn(),
  SalesforceLink: jest.fn(),
  AccountOverviewHierarchy: jest.fn(),
  Location: jest.fn(),
  ActualSignDate: jest.fn(),
  SalesPlaybookName: jest.fn(),
  ClientLeadSource: jest.fn(),
  AccountPlan: jest.fn(),
  Website: jest.fn(),
  ClientBusinessType: jest.fn(),
  LikelihoodToClose: jest.fn(),
  LeadStatus: jest.fn(),
  NextLeadAction: jest.fn(),
  BillingOptionsUpdate: jest.fn(),
  Tier: jest.fn(),
  SecondaryRegion: jest.fn(),
  DiscountEligible: jest.fn(),
  DefaultDiscount: jest.fn(),
  EnterpriseAccountStatus: jest.fn(),
  LegalStaTerms: jest.fn()
}))

const isAuthorisedFieldMock = isAuthorisedField as jest.Mock
const isEnterpriseBusinessMock = isEnterpriseBusiness as jest.Mock
const mockedProfileHeader = ProfileHeader as jest.Mock
const mockedDetailedList = DetailedList as unknown as jest.Mock
const mockedDetailedListRow = DetailedList.Row as unknown as jest.Mock
const mockedDetailedListItem = DetailedList.Item as unknown as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock

const defaultFields = [
  'Primary Contact',
  'Email',
  'Phone',
  'Company HQ Phone',
  'Billing Phone',
  'Skype',
  'Time Zone',
  'Legal Name',
  'Legal Contact',
  'Salesforce Account',
  'Hierarchy',
  'Location',
  'Status',
  'OFAC Status',
  'Actual Sign Date',
  'Lead Probability Bucket',
  'Lead Source',
  'Onboarding Path',
  'Account Plan',
  'Website',
  'Business Type',
  'Count as Lead',
  '3% Discount Eligible',
  'Default Discount',
  'Legal STA Terms'
]

const enterpriseFields = [
  'Parent',
  'Likelihood to Close',
  'Lead Status',
  'Next lead action',
  'Negotiation Status',
  'Billing Options Update',
  'Tier',
  'Primary Region',
  'Secondary Region'
]

const nonEnterpriseFields = ['Sales Playbook']

const authorisedFields = ['Actual Sign Date', 'Count as Lead']

const renderComponent = (props: ComponentProps<typeof AccountOverview>) => {
  mockedProfileHeader.mockReturnValue(null)
  mockedDetailedList.mockImplementation(({ children }) => children)
  mockedDetailedListRow.mockImplementation(({ children }) => children)
  mockedDetailedListItem.mockImplementation(({ label }) => (
    <div data-testid={label} />
  ))
  useEditableFieldChangeHandlerMock.mockReturnValue('change-handler')

  render(
    <TestWrapper>
      <AccountOverview {...props} />
    </TestWrapper>
  )
}

describe('AccountOverview', () => {
  it('renders company overview details', () => {
    isAuthorisedFieldMock.mockImplementation(() => true)
    isEnterpriseBusinessMock.mockImplementation(() => true)

    renderComponent({
      company: companyOverviewFragmentMock,
      error: undefined
    })

    const { id, photo } = companyOverviewFragmentMock

    expect(mockedProfileHeader).toHaveBeenCalledTimes(1)
    expect(mockedProfileHeader).toHaveBeenCalledWith(
      {
        id,
        children: expect.objectContaining({
          type: UserBadge,
          props: {
            avatar: photo?.small,
            center: 'auto',
            invert: false,
            name: '',
            size: 'small'
          }
        })
      },
      {}
    )
    expect(mockedDetailedList).toHaveBeenCalledTimes(1)
  })

  describe('when company is enterprise', () => {
    it('renders default and enterprise items', () => {
      isAuthorisedFieldMock.mockImplementation(() => true)
      isEnterpriseBusinessMock.mockImplementation(() => true)

      renderComponent({
        company: companyOverviewFragmentMock,
        error: undefined
      })

      defaultFields.forEach(label =>
        expect(screen.getByTestId(label)).toBeInTheDocument()
      )

      enterpriseFields.forEach(label =>
        expect(screen.getByTestId(label)).toBeInTheDocument()
      )

      nonEnterpriseFields.forEach(label =>
        expect(screen.queryByTestId(label)).not.toBeInTheDocument()
      )
    })
  })

  describe('when company is not enterprise', () => {
    it('renders default and non-enterprise items', () => {
      isAuthorisedFieldMock.mockImplementation(() => true)
      isEnterpriseBusinessMock.mockImplementation(() => false)

      renderComponent({
        company: companyOverviewFragmentMock,
        error: undefined
      })

      defaultFields.forEach(label =>
        expect(screen.getByTestId(label)).toBeInTheDocument()
      )

      enterpriseFields.forEach(label =>
        expect(screen.queryByTestId(label)).not.toBeInTheDocument()
      )

      nonEnterpriseFields.forEach(label =>
        expect(screen.getByTestId(label)).toBeInTheDocument()
      )
    })
  })

  describe('Enterprise Account Status', () => {
    it('is rendered when conditions are met', () => {
      isAuthorisedFieldMock.mockImplementation(() => true)
      isEnterpriseBusinessMock.mockImplementation(() => true)

      renderComponent({
        company: {
          ...companyOverviewFragmentMock,
          parent: null,
          enterpriseAccountStatus: {
            status: ClientEnterpriseAccountStatusEnum.ACTIVE
          }
        },
        error: undefined
      })

      expect(
        screen.getByTestId('Enterprise Account Status')
      ).toBeInTheDocument()
    })

    it('is NOT rendered when conditions are not met', () => {
      renderComponent({
        company: companyOverviewFragmentMock,
        error: undefined
      })

      expect(
        screen.queryByTestId('Enterprise Account Status')
      ).not.toBeInTheDocument()
    })
  })

  describe('authorised fields', () => {
    it('are rendered when there are no errors', () => {
      isAuthorisedFieldMock.mockImplementation(() => true)

      renderComponent({
        company: companyOverviewFragmentMock,
        error: undefined
      })

      authorisedFields.forEach(label =>
        expect(screen.getByTestId(label)).toBeInTheDocument()
      )
    })

    it('are not rendered when there are errors', () => {
      isAuthorisedFieldMock.mockImplementation(() => false)

      renderComponent({
        company: companyOverviewFragmentMock,
        error: undefined
      })

      authorisedFields.forEach(label =>
        expect(screen.queryByTestId(label)).not.toBeInTheDocument()
      )
    })
  })
})
