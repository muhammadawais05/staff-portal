import { OperationValue } from '~integration/types'
import { getClientHierarchyResponse } from '../responses'

export const hierarchyPageStubs = (): { [key: string]: OperationValue } => ({
  GetClientHierarchy: getClientHierarchyResponse()
})
