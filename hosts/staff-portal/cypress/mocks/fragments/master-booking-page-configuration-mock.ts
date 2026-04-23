import { MasterBookingPageConfiguration } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { WithTypename } from '~integration/types'

export const masterBookingPageConfigurationMock = (
  masterBookingPageConfiguration?: Partial<MasterBookingPageConfiguration>
): WithTypename<MasterBookingPageConfiguration> => ({
  id: encodeEntityId('123', 'MasterBookingPageConfiguration'),
  title: 'title',
  ...masterBookingPageConfiguration,
  __typename: 'MasterBookingPageConfiguration'
})
