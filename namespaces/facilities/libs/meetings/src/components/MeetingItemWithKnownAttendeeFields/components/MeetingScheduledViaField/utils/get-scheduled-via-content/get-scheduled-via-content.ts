import { titleize } from '@staff-portal/string'

import { MeetingFragment } from '../../../../../../data/meeting-fragment'

const getScheduledViaContent = ({
  currentScheduler,
  callbackRequest,
  masterBookingPage
}: Pick<
  MeetingFragment,
  'currentScheduler' | 'callbackRequest' | 'masterBookingPage'
>) => {
  if (callbackRequest) {
    const callbackRequestType = callbackRequest.type || ''

    return `${titleize(callbackRequestType, {
      splitter: ' '
    })}${callbackRequestType && ' '}Call Request`
  }

  if (masterBookingPage) {
    return `Master Booking Page (${masterBookingPage.title})`
  }

  if (currentScheduler) {
    return 'Booking Page'
  }

  return 'Unknown'
}

export default getScheduledViaContent
