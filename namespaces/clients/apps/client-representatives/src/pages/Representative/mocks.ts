import { RepresentativeFragment } from '@staff-portal/client-representatives'
import {
  CompanyRepresentativeBillingCommunicationOption as BillingCommOption,
  CompanyRepresentativeCommunicationOption as CommunicationOption,
  CompanyRepresentativeCumulativeStatus as CumulativeStatus,
  ContactType,
  OfacStatus,
  VisualComplianceStatus
} from '@staff-portal/graphql/staff'

export const REP_WITH_TEXTS_AND_LINKS: Partial<RepresentativeFragment> = {
  currentSignInAt: '2021-12-15T14:52:55+02:00',

  createdAt: '2021-12-12T04:20:00+02:00',
  activatedAt: '2021-12-13T04:20:00+02:00',
  updatedAt: '2021-12-14T04:20:00+02:00',
  tosAcceptedAt: '2021-12-15T04:20:00+02:00',

  salesforceLink: { url: 'http://doot.sales.force', text: 'salesforce_id_boo' },
  lastAnsweredPromotion: {
    score: 1337,
    updatedAt: '2021-12-14T04:20:00+02:00'
  },
  lastAnsweredPromotionUrl: 'http://last.promotion.url',

  languages: {
    nodes: [
      { id: 'lang-ba', name: 'Bosnian' },
      { id: 'lang-ua', name: 'Ukrainian' }
    ]
  },
  location: {
    country: { id: 'emirates-id', name: 'United Arab Emirates' },
    cityName: 'Dubai',
    __typename: 'Location'
  },
  position: 'woot position!',
  skype: 'skyppity',
  linkedin: 'http://linked.in',
  phoneNumberNotes: 'phone number notes doot',
  twitter: 'twitter-handle',
  zoominfoProfile: 'https://zoominfo.com/whoopittyzoom',
  cumulativeStatus: CumulativeStatus.PENDING_APPROVAL,
  communicationOptions: [
    CommunicationOption.NOTIFY_TALENT_RECOMMENDATIONS,
    CommunicationOption.NOTIFY_OTHER,
    CommunicationOption.NOTIFY_JOBS
  ],
  callRecordingAccepted: true,
  invitedToLoginAt: '2021-12-22T17:18:06+02:00',
  ofacStatus: OfacStatus.NORMAL,
  visualComplianceStatus: VisualComplianceStatus.FULLY_CHECKED,
  billingCommunication: BillingCommOption.ALL,
  disabledCommunicationOptions: [
    CommunicationOption.NOTIFY_TALENT_RECOMMENDATIONS,
    CommunicationOption.NOTIFY_OTHER
  ],
  disabledBillingCommunicationOptions: [
    BillingCommOption.SELECTED_JOB_NOTICES,
    BillingCommOption.NONE
  ],
  portalEnabled: true,
  readBillingReport: false,
  timeZone: {
    name: '(UTC-08:00) America - Los Angeles',
    value: 'America/Los_Angeles',
    __typename: 'TimeZone'
  },
  jobs: {
    nodes: [
      {
        id: 'VjEtSm9iLTI3MDM4OQ',
        webResource: {
          text: 'linked jobbo',
          url: 'http://linked.jobbo.link',
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
        id: 'email-contact-id',
        value: 'email@cont.act',
        primary: true,
        note: null,
        phoneCategory: null,
        type: ContactType.EMAIL,
        __typename: 'Contact'
      }
    ],
    __typename: 'ContactConnection'
  }
}
