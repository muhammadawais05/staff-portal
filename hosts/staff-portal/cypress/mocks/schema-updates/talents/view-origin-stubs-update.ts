import { encodeEntityId } from '@staff-portal/data-layer-service'
import { ApplicationInfo } from '@staff-portal/graphql/staff'

import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { webResourceMock } from '~integration/mocks/fragments'

const updateViewOriginStubs = () =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      applicationInfo: {
        id: encodeEntityId('123', 'ApplicationInfo'),
        ...webResourceMock({
          text: 'application info',
          url: 'https://toptal.com'
        }),
        __typename: 'ApplicationInfo'
      } as ApplicationInfo
    }),
    GetApplicationInfo: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          applicationInfo: {
            id: encodeEntityId('123', 'ApplicationInfo'),
            attributes: [
              {
                key: 'id',
                value: '123456789',
                __typename: 'KeyValueStrings'
              }
            ],
            __typename: 'ApplicationInfo'
          },
          __typename: 'Talent'
        }
      }
    }
  })

export default updateViewOriginStubs
