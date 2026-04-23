import { RoutePath } from '@staff-portal/routes'
import { matchPath, createUrl } from '@staff-portal/navigation'
import { LEGACY_PATH_PREFIX } from '@staff-portal/config'

const isTalentProfileUrl = (talentProfileUrl: string) => {
  const { pathname } = createUrl(talentProfileUrl)

  return matchPath(pathname, {
    path: `(${LEGACY_PATH_PREFIX})?${RoutePath.TalentProfile}`,
    exact: true
  })
}

export const getTalentProfileLinkTarget = (talentProfileUrl?: string | null) =>
  talentProfileUrl && isTalentProfileUrl(talentProfileUrl)
    ? undefined
    : '_blank'
