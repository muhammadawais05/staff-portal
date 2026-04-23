import { isEnterpriseBusiness, ClientFragment } from '@staff-portal/clients'

import {
  getClientsConfiguration,
  ClientCardType
} from '../get-clients-configuration'
import { getClientContentMapping } from './get-client-content-mapping'

export const getClientContentItems = (
  client: ClientFragment,
  type: ClientCardType,
  timeZone?: string
) => {
  const isParentVisible = isEnterpriseBusiness(client.businessType)

  const contentMapping = getClientContentMapping(client, timeZone)

  return getClientsConfiguration(isParentVisible, type)
    .filter(key => contentMapping[key])
    .map(key => contentMapping[key])
}
