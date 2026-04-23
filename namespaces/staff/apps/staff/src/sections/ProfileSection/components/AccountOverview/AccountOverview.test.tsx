import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { TwitterLink, EmailLink, ExternalLink } from '@staff-portal/ui'
import { RolePhoneLink, SkypeLink } from '@staff-portal/communication'
import { getTimeZoneFullText } from '@staff-portal/date-time-utils'
import { OFACStatusField } from '@staff-portal/ofac-compliance'
import {
  AccountField,
  LastLoginField,
  SpokenLanguagesField,
  OtherRolesField
} from '@staff-portal/role-profile'
import { ContactType } from '@staff-portal/graphql/staff'
import {
  useUserDateFormatter,
  useUserDateTimeFormatter
} from '@staff-portal/current-user'
import { ApolloError, checkIfFieldIsForbidden } from '@staff-portal/data-layer-service'
/**
 * TODO: remove the comment, once the component would be extracted to the correct folder
 * https://toptal-core.atlassian.net/browse/SP-2308
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { PaymentMethodsField } from '@staff-portal/talents-profile'

import TwilioNumber from '../TwilioNumber/TwilioNumber'
import StatusField from '../../../../components/StatusField/StatusField'
import Teams from '../../../../components/Teams/Teams'
import BillingNotes from '../BillingNotes/BillingNotes'
import EmployeeType from '../EmployeeType/EmployeeType'
import PayFrequency from '../PayFrequency/PayFrequency'
import TermsOfService from '../TermsOfService/TermsOfService'
import { StaffProfileFragment } from '../../../../data/get-staff-profile.staff.gql.types'
import AccountOverview from './AccountOverview'
import { useStaffContext } from '../../../../context/StaffContext'

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  TwitterLink: jest.fn(),
  EmailLink: jest.fn(),
  ExternalLink: jest.fn()
}))
jest.mock('@staff-portal/communication', () => ({
  ...jest.requireActual('@staff-portal/communication'),
  RolePhoneLink: jest.fn(),
  SkypeLink: jest.fn()
}))
jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  getTimeZoneFullText: jest.fn()
}))
jest.mock('@staff-portal/ofac-compliance', () => ({
  OFACStatusField: jest.fn()
}))
jest.mock('@staff-portal/role-profile', () => ({
  ...jest.requireActual('@staff-portal/role-profile'),
  AccountField: jest.fn(),
  LastLoginField: jest.fn(),
  SpokenLanguagesField: jest.fn(),
  OtherRolesField: jest.fn()
}))
jest.mock('../TwilioNumber/TwilioNumber', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../../../../components/StatusField/StatusField', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../../../../components/Teams/Teams', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../BillingNotes/BillingNotes', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../EmployeeType/EmployeeType', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../PayFrequency/PayFrequency', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../TermsOfService/TermsOfService', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('@staff-portal/current-user', () => ({
  useUserDateFormatter: jest.fn(),
  useUserDateTimeFormatter: jest.fn()
}))
jest.mock('@staff-portal/talents-profile', () => ({
  PaymentMethodsField: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  checkIfFieldIsForbidden: jest.fn()
}))
jest.mock('../../../../context/StaffContext', () => ({
  useStaffContext: jest.fn()
}))

const renderComponent = () =>
  render(
    <TestWrapper>
      <AccountOverview />
    </TestWrapper>
  )

const MockTwitterLink = TwitterLink as jest.Mock
const MockEmailLink = EmailLink as jest.Mock
const MockRolePhoneLink = RolePhoneLink as jest.Mock
const MockSkypeLink = SkypeLink as jest.Mock
const MockOFACStatusField = OFACStatusField as jest.Mock
const MockOtherRolesField = OtherRolesField as jest.Mock
const MockAccountField = AccountField as jest.Mock
const MockLastLoginField = LastLoginField as jest.Mock
const MockSpokenLanguagesField = SpokenLanguagesField as jest.Mock
const MockTwilioNumber = TwilioNumber as jest.Mock
const MockStatusField = StatusField as jest.Mock
const MockBillingNotes = BillingNotes as jest.Mock
const MockEmployeeType = EmployeeType as jest.Mock
const MockPayFrequency = PayFrequency as jest.Mock
const MockTermsOfService = TermsOfService as jest.Mock
const MockTeams = Teams as jest.Mock
const MockExternalLink = ExternalLink as jest.Mock
const MockPaymentMethodsField = PaymentMethodsField as jest.Mock
const mockGetTimeZoneFullText = getTimeZoneFullText as jest.Mock
const mockUseUserDateFormatter = useUserDateFormatter as jest.Mock
const mockUseUserDateTimeFormatter = useUserDateTimeFormatter as jest.Mock
const mockCheckIfFieldIsForbidden = checkIfFieldIsForbidden as jest.Mock
const mockUseStaffContext = useStaffContext as jest.Mock

describe('AccountOverview', () => {
  const mockedUseUserDateFormatter = jest.fn()
  const mockedUserDateTimeFormatter = jest.fn().mockReturnValueOnce(null)

  beforeEach(() => {
    MockTwitterLink.mockReturnValueOnce(null)
    MockEmailLink.mockReturnValueOnce(null)
    MockRolePhoneLink.mockReturnValueOnce(null)
    MockSkypeLink.mockReturnValueOnce(null)
    MockOFACStatusField.mockReturnValueOnce(null)
    MockOtherRolesField.mockReturnValueOnce(null)
    MockTwilioNumber.mockReturnValueOnce(null)
    MockStatusField.mockReturnValueOnce(null)
    MockAccountField.mockReturnValueOnce(null)
    MockLastLoginField.mockReturnValueOnce(null)
    MockSpokenLanguagesField.mockReturnValueOnce(null)
    MockTeams.mockReturnValueOnce(null)
    MockBillingNotes.mockReturnValueOnce(null)
    MockEmployeeType.mockReturnValueOnce(null)
    MockPayFrequency.mockReturnValueOnce(null)
    MockTermsOfService.mockReturnValueOnce(null)
    MockExternalLink.mockReturnValueOnce(null)
    MockPaymentMethodsField.mockReturnValueOnce(null)
    mockGetTimeZoneFullText.mockReturnValueOnce(null)
    mockUseUserDateFormatter.mockReturnValue(mockedUseUserDateFormatter)
    mockUseUserDateTimeFormatter.mockReturnValue(mockedUserDateTimeFormatter)
  })

  describe('when properties passed', () => {
    it('renders all the fields', () => {
      mockCheckIfFieldIsForbidden.mockReturnValueOnce(false)

      const email = {} as string
      const id = {} as string
      const fullName = {} as string
      const phoneNumber = {} as string
      const twilioNumber = {} as string
      const skype = {} as string
      const cumulativeStatus = {} as string
      const twitterLink = {
        url: {},
        text: {}
      }
      const jobTitle = 'jobTitle'
      const legalName = 'legalName'
      const countryName = 'countryName'
      const cityDescription = 'cityDescription'
      const location = {
        countryName
      }
      const timeZone = {}
      const name = 'name'
      const citizenship = {
        name
      }
      const ofacStatus = {}
      const visualComplianceStatus = {}
      const createdAt = {} as StaffProfileFragment['createdAt']
      const updatedAt = {}
      const ipLocation = {}
      const currentSignInAt = {}
      const currentSignInIp = {}
      const tosAcceptedAt = {}
      const website = {}
      const teams = {
        nodes: {
          length: 1
        }
      }
      const languages = {
        nodes: {
          length: 1
        }
      }
      const paymentOptions = {
        nodes: {
          length: 1
        }
      }
      const billingNotes = {}
      const paymentsEmployeeType = {}
      const paymentsFrequency = {}
      const operations = {
        updateBillingNotes: {},
        updatePaymentsEmployeeType: {},
        updatePaymentsFrequency: {}
      }
      const unallocatedMemorandum = {}
      const webResource = {}
      const otherRoles = {
        nodes: [{}]
      } as StaffProfileFragment['otherRoles']
      const staffProfile = {
        email,
        fullName,
        citizenship,
        id,
        cumulativeStatus,
        otherRoles,
        phoneNumber,
        skype,
        twilioNumber,
        twitterLink,
        timeZone,
        jobTitle,
        legalName,
        location,
        cityDescription,
        ofacStatus,
        visualComplianceStatus,
        createdAt,
        updatedAt,
        ipLocation,
        currentSignInAt,
        currentSignInIp,
        tosAcceptedAt,
        website,
        teams,
        languages,
        paymentOptions,
        billingNotes,
        operations,
        unallocatedMemorandum,
        webResource,
        paymentsEmployeeType,
        paymentsFrequency
      } as StaffProfileFragment

      mockUseStaffContext.mockReturnValueOnce({ staffProfile })

      renderComponent()

      expect(MockEmailLink).toHaveBeenCalledTimes(1)
      expect(MockEmailLink).toHaveBeenCalledWith(
        expect.objectContaining({
          email
        }),
        {}
      )
      expect(MockOtherRolesField).toHaveBeenCalledTimes(1)
      expect(MockOtherRolesField).toHaveBeenCalledWith(
        expect.objectContaining({
          otherRoles: otherRoles?.nodes
        }),
        {}
      )
      expect(MockRolePhoneLink).toHaveBeenCalledTimes(1)
      expect(MockRolePhoneLink).toHaveBeenCalledWith(
        expect.objectContaining({
          roleId: id,
          destination: phoneNumber,
          contactType: ContactType.PHONE
        }),
        {}
      )
      expect(MockTwilioNumber).toHaveBeenCalledTimes(1)
      expect(MockTwilioNumber).toHaveBeenCalledWith(
        expect.objectContaining({
          twilioNumber,
          staffId: id
        }),
        {}
      )
      expect(MockSkypeLink).toHaveBeenCalledTimes(1)
      expect(MockSkypeLink).toHaveBeenCalledWith(
        expect.objectContaining({
          skypeId: skype
        }),
        {}
      )
      expect(MockTwitterLink).toHaveBeenCalledTimes(1)
      expect(MockTwitterLink).toHaveBeenCalledWith(
        expect.objectContaining({
          text: twitterLink.text,
          url: twitterLink.url
        }),
        {}
      )
      expect(MockStatusField).toHaveBeenCalledTimes(1)
      expect(MockStatusField).toHaveBeenCalledWith(
        expect.objectContaining({
          cumulativeStatus
        }),
        {}
      )
      expect(MockOFACStatusField).toHaveBeenCalledTimes(1)
      expect(MockOFACStatusField).toHaveBeenCalledWith(
        expect.objectContaining({
          ofacStatus,
          visualComplianceStatus
        }),
        {}
      )
      expect(mockGetTimeZoneFullText).toHaveBeenCalledTimes(1)
      expect(mockGetTimeZoneFullText).toHaveBeenCalledWith(timeZone)
      expect(screen.getByTestId('item-field: Title')).toHaveTextContent(
        jobTitle
      )
      expect(screen.getByTestId('item-field: Legal name')).toHaveTextContent(
        legalName
      )
      expect(
        screen.getByTestId('item-field: Current country')
      ).toHaveTextContent(countryName)
      expect(screen.getByTestId('item-field: Current city')).toHaveTextContent(
        cityDescription
      )
      expect(screen.getByTestId('item-field: Citizenship')).toHaveTextContent(
        citizenship.name
      )
      expect(mockedUseUserDateFormatter).toHaveBeenCalledTimes(2)
      expect(mockedUseUserDateFormatter).toHaveBeenNthCalledWith(1, createdAt)
      expect(mockedUseUserDateFormatter).toHaveBeenNthCalledWith(2, updatedAt)
      expect(MockLastLoginField).toHaveBeenCalledTimes(1)
      expect(MockLastLoginField).toHaveBeenCalledWith(
        {
          ip: currentSignInIp,
          ipLocation,
          size: 'medium',
          weight: 'semibold'
        },
        {}
      )
      expect(MockTermsOfService).toHaveBeenCalledTimes(1)
      expect(MockTermsOfService).toHaveBeenCalledWith(
        {
          tosAcceptedAt,
          size: 'medium',
          weight: 'semibold'
        },
        {}
      )
      expect(MockExternalLink).toHaveBeenCalledTimes(1)
      expect(MockExternalLink).toHaveBeenCalledWith(
        {
          href: website,
          size: 'medium',
          weight: 'semibold'
        },
        {}
      )
      expect(MockTeams).toHaveBeenCalledTimes(1)
      expect(MockTeams).toHaveBeenCalledWith(
        {
          teams,
          staffId: id,
          size: 'medium',
          weight: 'semibold'
        },
        {}
      )
      expect(MockSpokenLanguagesField).toHaveBeenCalledTimes(1)
      expect(MockSpokenLanguagesField).toHaveBeenCalledWith(
        {
          languages: languages.nodes,
          size: 'medium',
          weight: 'semibold'
        },
        {}
      )
      expect(MockPaymentMethodsField).toHaveBeenCalledTimes(1)
      expect(MockPaymentMethodsField).toHaveBeenCalledWith(
        {
          paymentOptions,
          size: 'medium',
          weight: 'semibold'
        },
        {}
      )
      expect(MockBillingNotes).toHaveBeenCalledTimes(1)
      expect(MockBillingNotes).toHaveBeenCalledWith(
        {
          staffId: id,
          billingNotes,
          operation: operations.updateBillingNotes,
          size: 'medium',
          weight: 'semibold'
        },
        {}
      )
      expect(MockEmployeeType).toHaveBeenCalledTimes(1)
      expect(MockEmployeeType).toHaveBeenCalledWith(
        {
          staffId: id,
          operation: operations.updatePaymentsEmployeeType,
          value: paymentsEmployeeType,
          size: 'medium',
          weight: 'semibold'
        },
        {}
      )
      expect(MockPayFrequency).toHaveBeenCalledTimes(1)
      expect(MockPayFrequency).toHaveBeenCalledWith(
        {
          staffId: id,
          operation: operations.updatePaymentsFrequency,
          value: paymentsFrequency,
          size: 'medium',
          weight: 'semibold'
        },
        {}
      )
      expect(MockAccountField).toHaveBeenCalledTimes(1)
      expect(MockAccountField).toHaveBeenCalledWith(
        {
          unallocatedMemorandum,
          size: 'medium',
          weight: 'semibold'
        },
        {}
      )
    })
  })

  describe('when properties are not passed', () => {
    it('does not render fields', () => {
      mockCheckIfFieldIsForbidden.mockReturnValueOnce(true)

      const staffProfile = {
        operations: {
          updateBillingNotes: {},
          updatePaymentsEmployeeType: {},
          updatePaymentsFrequency: {}
        },
        otherRoles: {
          nodes: []
        } as StaffProfileFragment['otherRoles']
      } as StaffProfileFragment
      const error = {} as ApolloError

      mockUseStaffContext.mockReturnValueOnce({ staffProfile, error })

      renderComponent()

      expect(MockOtherRolesField).toHaveBeenCalledTimes(0)
      expect(MockRolePhoneLink).toHaveBeenCalledTimes(0)
      expect(MockSkypeLink).toHaveBeenCalledTimes(0)
      expect(MockStatusField).toHaveBeenCalledTimes(0)
      expect(MockTwitterLink).toHaveBeenCalledTimes(0)
      expect(MockLastLoginField).toHaveBeenCalledTimes(0)
      expect(MockTeams).toHaveBeenCalledTimes(0)
      expect(MockExternalLink).toHaveBeenCalledTimes(0)
      expect(MockSpokenLanguagesField).toHaveBeenCalledTimes(0)
      expect(MockPaymentMethodsField).toHaveBeenCalledTimes(0)
    })
  })
})
