import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client } from '@staff-portal/graphql/staff'

import { hiddenOperationMock } from '~integration/mocks'

export const getClientAboutAndOperationResponse = (
  client?: Partial<Client>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      about: 'This part was obfuscated, some content was here.',
      buyingSignalsService: {
        about:
          'American Family Insurance has given its customers peace of mind by making their insurance experience easy and convenient.\n\nSpecialties: Business Insurance, Property Insurance, Auto Insurance, Life Insurance',
        __typename: 'BuyingSignalsService'
      },
      clientopedia: null,
      __typename: 'Client',
      operations: {
        patchClientProfile: hiddenOperationMock(),
        __typename: 'ClientOperations'
      },
      ...client
    }
  }
})
