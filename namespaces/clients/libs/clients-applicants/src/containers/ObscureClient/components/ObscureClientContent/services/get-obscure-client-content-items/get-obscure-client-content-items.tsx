import { parseAndFormatDateTime } from '@staff-portal/date-time-utils'
import { DetailedListItems } from '@staff-portal/ui'
import { ClientFragment } from '@staff-portal/clients'

export const getObscureClientContentItems = (
  { claimableSince, pendingCallbackRequest }: ClientFragment,
  timeZone?: string
): DetailedListItems => [
  [
    {
      label: 'Claimable since',
      value:
        claimableSince && parseAndFormatDateTime(claimableSince, { timeZone })
    },
    {
      label: 'Call Scheduled At',
      value:
        pendingCallbackRequest?.requestedStartTime &&
        parseAndFormatDateTime(pendingCallbackRequest.requestedStartTime, {
          timeZone
        })
    }
  ]
]
