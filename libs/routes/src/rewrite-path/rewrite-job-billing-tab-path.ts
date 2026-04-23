import { matchPath } from '@staff-portal/navigation'

import { PathRewriteRule } from '../types'
import { RoutePath, JobTabUrlHash } from '../enums'

const rewriteJobBillingTabPath: PathRewriteRule = ({
  pathname,
  hash,
  search
}) => {
  const jobPageMatch = matchPath<{ id: string }>(pathname, {
    path: RoutePath.Job,
    exact: true,
    strict: false
  })

  if (!jobPageMatch || hash !== `#${JobTabUrlHash.BILLING}`) {
    return
  }

  return `${jobPageMatch.url}/${JobTabUrlHash.BILLING}${search}`
}

export default rewriteJobBillingTabPath
