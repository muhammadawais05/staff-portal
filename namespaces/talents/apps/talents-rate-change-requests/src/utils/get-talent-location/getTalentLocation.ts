import { joinTruthy } from '@staff-portal/utils'

import { RateChangeRequestFragment } from '../../data/rate-change-request-fragment'

export const getTalentLocation = (
  talent: RateChangeRequestFragment['talent']
): string | null => {
  return talent?.locationV2?.cityName || talent?.locationV2?.countryName
    ? joinTruthy([talent.locationV2?.cityName, talent.locationV2?.countryName])
    : null
}
