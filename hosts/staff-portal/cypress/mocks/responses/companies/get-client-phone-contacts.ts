import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getClientPhoneContacts = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      contact: {
        id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTE1NDQ4NDQ',
        orderedPhoneNumbers: {
          nodes: [
            {
              id: 'VjEtQ29udGFjdC0yOTU1Mzc0',
              type: 'PHONE',
              value: 'get-phone-contacts',
              note: 'TEST_NOTE_0',
              primary: true,
              phoneCategory: 'OTHER',
              __typename: 'Contact'
            }
          ],
          totalCount: 4,
          __typename: 'ContactConnection'
        },
        __typename: 'CompanyRepresentative'
      },
      __typename: 'Client'
    }
  }
})
