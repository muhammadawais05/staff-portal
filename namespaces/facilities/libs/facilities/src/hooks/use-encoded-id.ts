import { useParams } from '@staff-portal/navigation'
import { STAFF_SCHEMA_VERSION } from '@staff-portal/config'
import { encodeEntityId } from '@staff-portal/data-layer-service'

/**
 * Returns the encoded id param
 * @param nodeType
 */
const useEncodedIdParam = (nodeType: string) => {
  const params = useParams()
  const { id } = params as { id: string }

  return encodeEntityId(id, nodeType, STAFF_SCHEMA_VERSION)
}

export default useEncodedIdParam
