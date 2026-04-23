import { ContactType } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '../enabled-operation-mock'

export const clientContactMock = () => ({
  contact: {
    id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTI1OTY1Nzk',
    webResource: {
      text: 'Oda Wyman',
      url: 'https://staging.toptal.net/platform/staff/company_representatives/2596579'
    },
    fullName: 'Oda Wyman',
    contacts: {
      nodes: [
        {
          id: 'VjEtQ29udGFjdC0yOTU1Mzc1',
          type: ContactType.EMAIL,
          value: 'kala-537e316bb544285a@toptal.io'
        },
        {
          id: 'VjEtQ29udGFjdC0yOTU1Mzc0',
          type: ContactType.PHONE,
          value: '+17879661123'
        },
        {
          id: 'VjEtQ29udGFjdC0yOTU1Mzc2',
          type: ContactType.SKYPE,
          value: 'skype_id'
        }
      ]
    },
    invitedToLoginAt: null,
    operations: {
      inviteToLoginCompanyRepresentative: enabledOperationMock()
    }
  }
})
