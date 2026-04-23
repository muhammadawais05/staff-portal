import { useParams } from '@staff-portal/navigation'
import { STAFF_SCHEMA_VERSION } from '@staff-portal/config'
import { encodeEntityId } from '@staff-portal/data-layer-service'

/**
 * Returns an array of encoded params with provided node types
 * If no param of a provided type is found in URL, returns null
 * @param nodeTypes
 * @example
 ```
 const [purchaseOrderId, purchaseOrderLineId] = useEncodedIdParams({
      poId: 'PurchaseOrder', // referenced as :poId in RoutePath
      id: 'PurchaseOrderLine'
    })
 ```
 */
const useEncodedIdParams = (nodeTypes: Record<string, string>) => {
  const params = useParams<Record<keyof typeof nodeTypes, string>>()

  return Object.keys(nodeTypes).map(nodeKey => {
    if (params[nodeKey]) {
      return encodeEntityId(
        params[nodeKey],
        nodeTypes[nodeKey],
        STAFF_SCHEMA_VERSION
      )
    }

    return null
  })
}

export default useEncodedIdParams
