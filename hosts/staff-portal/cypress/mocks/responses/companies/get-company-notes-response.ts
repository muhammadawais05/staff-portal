import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client, HowDidYouHearValues } from '@staff-portal/graphql/staff'

import { getClientOperations } from '~integration/mocks/fragments'

export const getCompanyNotesResponse = (client?: Partial<Client>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      howDidYouHear: HowDidYouHearValues.A_TOPTAL_EMPLOYEE,
      howDidYouHearDetails: 'Somehow',
      logSalesCallWillChangeClaimer: false,
      engagements: {
        totalCount: 3,
        __typename: 'ClientEngagementConnection'
      },
      operations: getClientOperations(),
      activitiesAndNotes: {
        totalCount: 0,
        nodes: [],
        __typename: 'ActivityOrNoteConnection'
      },
      contact: {
        id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTE1NDQ4NDQ',
        webResource: {
          text: "Ruben D'Amore",
          url: 'https://staging.toptal.net/platform/staff/company_representatives/1544844',
          __typename: 'Link'
        },
        __typename: 'CompanyRepresentative',
        fullName: "Ruben D'Amore"
      },
      representatives: {
        nodes: [],
        totalCount: 0,
        __typename: 'ClientRepresentativesConnection'
      },
      ...client,
      __typename: 'Client'
    }
  }
})
