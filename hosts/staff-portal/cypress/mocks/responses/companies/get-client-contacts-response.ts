import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client } from '@staff-portal/graphql/staff'

import {
  getClientOperations,
  getCompanyRepresentativeOperations
} from '~integration/mocks/fragments'

export const getClientContactsResponse = (client?: Partial<Client>) => ({
  data: {
    staffNode: {
      id: encodeEntityId('123', 'Client'),
      children: {
        totalCount: 1,
        __typename: 'ClientChildrenConnection'
      },
      operations: getClientOperations(),
      representatives: {
        nodes: [
          {
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTE1NDQ4NDQ',
            photo: null,
            fullName: "Ruben D'Amore",
            webResource: {
              text: "Ruben D'Amore",
              url: 'https://staging.toptal.net/platform/staff/company_representatives/1544844',
              __typename: 'Link'
            },
            __typename: 'CompanyRepresentative',
            client: {
              id: 'VjEtQ2xpZW50LTMzNzkzOQ',
              webResource: {
                text: 'DuBuque, Cruickshank and Volkman',
                url: 'https://staging.toptal.net/platform/staff/companies/1544845',
                __typename: 'Link'
              },
              __typename: 'Client'
            },
            noLongerPartOfCompany: false,
            currentSignInAt: null,
            currentSignInIp: null,
            ipLocationV2: null,
            position: 'Sr Sourcing Consultant',
            skype: null,
            main: true,
            information: null,
            linkedin: 'http://linkedin.com/in/ruben.damore1740779',
            phoneNumberNotes: null,
            twitter: null,
            zoominfoProfile: null,
            cumulativeStatus: 'NO_LOGIN',
            communicationOptions: [],
            callRecordingAccepted: false,
            invitedToLoginAt: null,
            billingCommunication: 'NONE',
            disabledCommunicationOptions: [],
            disabledBillingCommunicationOptions: [],
            portalEnabled: false,
            readBillingReport: false,
            timeZone: {
              name: '(UTC-06:00) America - Chicago',
              value: 'America/Chicago',
              __typename: 'TimeZone'
            },
            jobs: {
              nodes: [
                {
                  id: 'VjEtSm9iLTIwNDkzMg',
                  webResource: {
                    text: 'Senior Marketing Developer (204932)',
                    url: 'https://staging.toptal.net/platform/staff/jobs/204932',
                    __typename: 'Link'
                  },
                  __typename: 'Job'
                }
              ],
              __typename: 'CompanyRepresentativeJobsConnection'
            },
            jobsWithBillingNotification: {
              nodes: [],
              __typename: 'CompanyRepresentativeJobsConnection'
            },
            contacts: {
              nodes: [
                {
                  id: 'VjEtQ29udGFjdC0yMjM3MzI5',
                  value: 'dhar-ed0c9b2ff6f3b805@toptal.io',
                  category: null,
                  note: null,
                  primary: true,
                  type: 'EMAIL',
                  __typename: 'Contact'
                }
              ],
              __typename: 'ContactConnection'
            },
            operations: getCompanyRepresentativeOperations(),
            mergedInto: null
          }
        ],
        totalCount: 1,
        __typename: 'ClientRepresentativesConnection'
      },
      ...client,
      __typename: 'Client'
    }
  }
})
