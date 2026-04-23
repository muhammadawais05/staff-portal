import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Staff } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getStaffProfileOperations } from './get-staff-profile-operations'

export const getStaffProfileResponse = (staff?: Partial<Staff>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Staff'),
      email: 'pabl-b1b79f4ae152df12@toptal.io',
      about: 'This part was obfuscated, some content was here.',
      ofacStatus: 'NORMAL',
      visualComplianceStatus: 'FULLY_CHECKED',
      otherRoles: {
        nodes: [
          {
            id: 'VjEtTGVhZGVyLTExMzUyMTQ',
            type: 'Leader',
            __typename: 'Leader',
            webResource: {
              url: 'https://staging.toptal.net/platform/staff/leaders/1135214',
              __typename: 'Link'
            },
            cumulativeStatus: 'REMOVED'
          },
          {
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTg3NDI4Nw',
            type: 'CompanyRepresentative',
            __typename: 'CompanyRepresentative',
            webResource: {
              url: 'https://staging.toptal.net/platform/staff/company_representatives/874287',
              __typename: 'Link'
            },
            companyRepresentativeCumulativeStatus: 'DELETED',
            client: {
              id: 'VjEtQ2xpZW50LTE4NDIx',
              fullName: 'Davis-Barton EK',
              __typename: 'Client'
            }
          },
          {
            id: 'VjEtVGFsZW50LTI4ODAyMg',
            type: 'Developer',
            __typename: 'Talent',
            webResource: {
              url: 'https://staging.toptal.net/platform/staff/talents/288022',
              __typename: 'Link'
            },
            talentCumulativeStatus: 'ACTIVE'
          }
        ],
        __typename: 'RoleOrClientConnection'
      },
      cumulativeStatus: 'ACTIVE',
      location: {
        countryName: 'Argentina',
        __typename: 'Location'
      },
      twilioNumber: '+16502097810',
      cityDescription: 'Córdoba, Cordoba',
      timeZone: {
        name: '(UTC-03:00) America - Cordoba, Argentina',
        value: 'America/Argentina/Cordoba',
        __typename: 'TimeZone'
      },
      citizenship: null,
      twitterLink: null,
      photo: null,
      fullName: 'Ashleigh Alexander',
      phoneNumber: '+4823232222',
      skype: 'test',
      jobTitle: 'test job',
      legalName: 'legal',
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/staff/1307729',
        __typename: 'Link'
      },
      referralsUrl:
        'https://staging.toptal.net/platform/staff/staff/3079484/referrals',
      emailMessagesUrl:
        'https://staging.toptal.net/platform/staff/staff/3079484/email_messages',
      paymentsUrl: {
        enabled: false,
        messages: ['This staff does not have any payments.'],
        url: null,
        __typename: 'UrlWithMessages'
      },
      editDayoffsPage: null,
      editAbilitiesPage: {
        enabled: true,
        messages: [],
        url: 'https://staging.toptal.net/platform/staff/staff/3079484/permissions',
        __typename: 'UrlWithMessages'
      },
      gdprReportUrl:
        'https://staging.toptal.net/platform/gdpr_report?user_id=2818750',
      emailMessaging: {
        id: encodeEntityId('1108959', 'EmailMessagingRole'),
        operations: {
          sendEmailTo: enabledOperationMock(),
          __typename: 'EmailMessagingOperation'
        },
        __typename: 'EmailMessagingRole'
      },
      meetingSchedulers: {
        totalCount: 0,
        nodes: []
      },
      operations: getStaffProfileOperations(),
      __typename: 'Staff',
      createdAt: '2018-05-29T16:46:16+03:00',
      updatedAt: '2022-03-29T17:46:41+03:00',
      currentSignInAt: '2022-03-05T00:23:45+03:00',
      currentSignInIp: '136.144.43.87',
      ipLocation: {
        cityName: 'Dallas',
        countryName: 'United States'
      },
      billingNotes: null,
      paymentsFrequency: null,
      paymentsEmployeeType: null,
      unallocatedMemorandum: {
        totalAmount: '-2.08',
        webResource: {
          text: '-2.08',
          url: 'https://staging.toptal.net/platform/staff/memos?badges%5Bmanager_ids%5D=1108959&status=unallocated'
        }
      },
      teams: {
        nodes: [
          {
            id: 'VjEtVGVhbS0xMjAwMzg',
            name: 'Project Manager Screeners',
            manager: {
              role: {
                id: 'VjEtU3RhZmYtMTE0NDk0Nw'
              }
            }
          }
        ]
      },
      languages: {
        nodes: [
          {
            id: 'VjEtTGFuZ3VhZ2UtMQ',
            name: 'English'
          }
        ]
      },
      paymentOptions: {
        manageLink: {
          text: '★ UltiPro, Bank Wire',
          url: null
        },
        viewLink: {
          text: '★ UltiPro, Bank Wire',
          url: 'https://staging.toptal.net/platform/staff/staff/1108959/payment_methods'
        },
        nodes: [
          {
            accountInfo: [],
            paymentMethod: 'ULTIPRO',
            placeholder: false,
            preferred: true
          },
          {
            accountInfo: [
              {
                label: 'Iban',
                value: ''
              },
              {
                label: 'Routing number',
                value: ''
              },
              {
                label: 'Name on account',
                value: ''
              },
              {
                label: 'Personal address',
                value: ''
              },
              {
                label: 'Bank address',
                value: ''
              },
              {
                label: 'Comment',
                value: ''
              }
            ],
            paymentMethod: 'BANK_WIRE',
            placeholder: false,
            preferred: false
          }
        ]
      },
      tosAcceptedAt: '2018-05-29T17:07:02+03:00',
      website: null,
      ...staff
    }
  }
})
