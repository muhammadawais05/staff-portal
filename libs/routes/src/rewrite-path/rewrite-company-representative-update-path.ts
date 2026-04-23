import {
  matchPath,
  objectToQueryString,
  queryStringToObject
} from '@staff-portal/navigation'

import { RoutePath } from '../enums'
import { PathRewriteRule } from '../types'

const PLATFORM_COMPANY_REPRESENTATIVE_UPDATE_PATH =
  '/../company_representatives/update_profile'

const rewriteCompanyRepresentativeUpdatePath: PathRewriteRule = ({
  pathname,
  search
}) => {
  const companyRepresentativeUpdateMatch = matchPath<{ id: string }>(pathname, {
    path: RoutePath.EditCompanyRepresentative,
    exact: true,
    strict: false
  })

  if (!companyRepresentativeUpdateMatch) {
    return
  }

  const queryString = objectToQueryString({
    ...queryStringToObject(search),
    role_id: companyRepresentativeUpdateMatch.params.id
  })

  return `${PLATFORM_COMPANY_REPRESENTATIVE_UPDATE_PATH}?${queryString}`
}

export default rewriteCompanyRepresentativeUpdatePath
