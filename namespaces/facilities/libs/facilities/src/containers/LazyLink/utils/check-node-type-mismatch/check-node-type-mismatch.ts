import { decodeEntityId } from '@staff-portal/data-layer-service'

import { GetLazyLinkQuery, GetLazyLinkVariables } from '../../types'

export const checkNodeTypeMismatch = (
  data: GetLazyLinkQuery,
  getLazyLinkVariables: GetLazyLinkVariables
) => {
  const { nodeId, nodeType, propertyName } = getLazyLinkVariables
  const { type } = decodeEntityId(nodeId)

  if (nodeType !== type) {
    throw new Error(
      `Lazy Link type mismatch: node ID (${nodeId}) was type ${type} instead of ${nodeType}.`
    )
  }

  if (!data.node?.[propertyName]) {
    throw new Error(
      `Lazy Link missing property: ${propertyName} is missing from ${nodeType}.`
    )
  }
}
