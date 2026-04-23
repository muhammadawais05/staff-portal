import { titleize } from '@staff-portal/string'

import { TOP_SCREEN_KEY } from '../constants'

export const getTalentTypeTitle = (talentType: string) => {
  if (talentType === TOP_SCREEN_KEY) {
    return titleize(talentType, { separator: '' })
  }

  return titleize(talentType)
}
