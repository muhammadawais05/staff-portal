import { Maybe } from '@toptal/picasso/utils'
import { NO_VALUE } from '@staff-portal/config'

const getRequiredApplicationPitch = (value?: Maybe<boolean>) => {
  if (value == null) {
    return NO_VALUE
  }

  return value ? 'Yes' : 'No'
}

export default getRequiredApplicationPitch
