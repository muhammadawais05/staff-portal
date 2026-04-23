import {
  CompanyRepresentativeCumulativeStatus as CumulativeStatus,
  ContactType,
  OperationCallableTypes,
  PhoneCategory,
  RoleStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import {
  RepresentativeFragment,
  RepresentativeOperationsFragment
} from './representative-fragment.staff.gql.types'

export const DEFAULT_NAME = 'Rep McReppyFace'

const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: [],
  __typename: 'Operation'
}

export const createRepresentativeFragmentMock = (
  id: string,
  partialRepresentative?: Partial<RepresentativeFragment>,
  clientId?: string
): RepresentativeFragment => {
  const defaultRepresentative: RepresentativeFragment = {
    __typename: 'CompanyRepresentative',

    id: encodeEntityId(id, 'CompanyRepresentative'),
    fullName: partialRepresentative?.fullName || DEFAULT_NAME,
    contactInvitable: false,
    main: false,
    photo: null,

    currentSignInAt: '1999-09-02T08:08:03.292Z',
    currentSignInIp: 'TEST_IP',
    invitedToLoginAt: null,
    gdprReportUrl: null,

    position: 'Senior Software Engineer',
    information: null,
    linkedin: null,
    twitter: null,
    skype: null,
    zoominfoProfile: null,
    cumulativeStatus: CumulativeStatus.ACTIVE,
    callRecordingAccepted: true,
    phoneNumberNotes: null,
    mergedInto: null,

    location: null,
    about: null,
    languages: null,

    ofacStatus: null,
    visualComplianceStatus: null,

    createdAt: null,
    activatedAt: null,
    updatedAt: null,
    tosAcceptedAt: null,

    salesforceLink: null,
    lastAnsweredPromotion: null,
    lastAnsweredPromotionUrl: null,

    disabledBillingCommunicationOptions: [],
    billingCommunication: null,
    communicationOptions: [],
    disabledCommunicationOptions: [],
    jobsWithBillingNotification: {
      nodes: [],
      __typename: 'CompanyRepresentativeJobsConnection'
    },

    portalEnabled: false,
    readBillingReport: false,
    noLongerPartOfCompany: false,

    webResource: {
      text: partialRepresentative?.fullName || DEFAULT_NAME,
      url: 'TEST_LINK',
      __typename: 'Link'
    },

    client: {
      id: clientId || encodeEntityId(`mock-rep-${id}-client`, 'Test'),
      portalPermissionsEnabled: true,
      webResource: {
        text: 'TEST_NAME',
        url: 'TEST_LINK',
        __typename: 'Link'
      },
      __typename: 'Client'
    },

    operations: {
      addRoleFlag: OPERATION,
      inviteToLoginCompanyRepresentative: OPERATION,
      loginAs: OPERATION,
      updateCompanyRepresentativeProfile: OPERATION,
      assignCompanyRepresentativeToJob: OPERATION,
      markCompanyRepresentativeAsPrimary: OPERATION,
      deactivateCompanyRepresentative: OPERATION,
      reactivateCompanyRepresentative: OPERATION,
      createConversationForStaff: OPERATION,
      linkOpportunityCompanyRepresentative: OPERATION,
      updateRolePhoto: OPERATION,
      __typename: 'CompanyRepresentativeOperations'
    } as RepresentativeOperationsFragment,

    ipLocation: {
      cityName: 'TEST_NAME',
      countryName: 'TEST_NAME',
      __typename: 'IpLocation'
    },

    timeZone: {
      name: '(UTC-04:00) America - New York',
      value: 'America/New_York',
      __typename: 'TimeZone'
    },

    jobs: {
      nodes: [
        {
          id: encodeEntityId(`mock-rep-${id}-job`, 'Test'),
          webResource: {
            text: 'Senior Web Designer linked job (225543)',
            url: 'TEST_LINK',
            __typename: 'Link'
          },
          __typename: 'Job'
        }
      ],
      __typename: 'CompanyRepresentativeJobsConnection'
    },

    contacts: {
      nodes: [
        {
          id: encodeEntityId(`mock-rep-${id}-contact-1`, 'Test'),
          value: 'TEST_EMAIL',
          primary: true,
          phoneCategory: PhoneCategory.OTHER,
          note: 'TEST_NOTE_1',
          type: ContactType.EMAIL,
          __typename: 'Contact'
        },
        {
          id: encodeEntityId(`mock-rep-${id}-contact-2`, 'Test'),
          value: 'TEST_PHONE',
          primary: true,
          phoneCategory: PhoneCategory.OTHER,
          note: 'TEST_NOTE_2',
          type: ContactType.PHONE,
          __typename: 'Contact'
        }
      ],
      __typename: 'ContactConnection'
    },

    viewerCanViewHistory: true,

    opportunities: null,
    paymentsUrl: null,

    status: RoleStatus.ACTIVE
  }

  // :thonk: maybe deep merge would help with __typename's
  return {
    ...defaultRepresentative,
    ...partialRepresentative
  }
}
