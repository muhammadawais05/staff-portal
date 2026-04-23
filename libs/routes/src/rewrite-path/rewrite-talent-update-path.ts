import {
  matchPath,
  objectToQueryString,
  queryStringToObject
} from '@staff-portal/navigation'

import { RoutePath } from '../enums'
import { PathRewriteRule } from '../types'

const PLATFORM_TALENT_UPDATE_PATH = '/../talents/update_profile'

const rewriteTalentUpdatePath: PathRewriteRule = ({ pathname, search }) => {
  const talentUpdateMatch = matchPath<{ id: string }>(pathname, {
    path: RoutePath.TalentUpdate,
    exact: true,
    strict: false
  })

  if (!talentUpdateMatch) {
    return
  }

  const queryString = objectToQueryString({
    ...queryStringToObject(search),
    role_id: talentUpdateMatch.params.id
  })

  return `${PLATFORM_TALENT_UPDATE_PATH}?${queryString}`
}

export default rewriteTalentUpdatePath
