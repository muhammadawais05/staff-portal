import { matchPath, objectToQueryString } from '@staff-portal/navigation'
import { LEGACY_PATH_PREFIX } from '@staff-portal/config'

import { RoutePath } from '../enums'
import { PathRewriteRule } from '../types'

const CLAIM_MODAL_SEARCH_STRING = '?modal=claim'

const rewriteCallRequestClaimPath: PathRewriteRule = ({ pathname, search }) => {
  const callRequestMatch = matchPath<{ id: string }>(pathname, {
    path: RoutePath.CallRequest,
    exact: true,
    strict: false
  })

  if (!callRequestMatch || search !== CLAIM_MODAL_SEARCH_STRING) {
    return
  }

  const queryString = objectToQueryString({ id: callRequestMatch.params.id })

  const newHash = `modal=${LEGACY_PATH_PREFIX}${callRequestMatch.url}/claim`

  return `${RoutePath.CallRequests}?${queryString}#${newHash}`
}

export default rewriteCallRequestClaimPath
