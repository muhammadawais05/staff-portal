import { USER_TRACKING_IS_ENABLED } from '@staff-portal/config'

import trackEvent from '../utils/track-event'

export const useAnalytics = () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const track = (event: string, data?: Object | undefined) => {
    if (USER_TRACKING_IS_ENABLED) {
      trackEvent(event, data)
    }
  }

  return { track }
}
