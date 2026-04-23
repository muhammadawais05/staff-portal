import { windowOpen } from '@staff-portal/navigation'
import { Notifications } from '@staff-portal/notifications'

import icon from './new-lead-notification-icon'
import sound from './new-lead-notification-sound'
interface Options {
  tag: string
  numberOfClients: number
  playSound: boolean
  companyApplicationPath: string
}

const createNewLeadNotification = ({
  tag,
  numberOfClients,
  playSound,
  companyApplicationPath
}: Options) => {
  const title =
    numberOfClients > 1
      ? `New leads are claimable (${numberOfClients})`
      : 'New lead is claimable'
  const body =
    numberOfClients > 1
      ? `${numberOfClients} clients just signed up.`
      : 'Client just signed up.'
  const onClick = (notification: Notification, ev: Event) => {
    ev.preventDefault() // prevent the browser from focusing the Notification's tab
    windowOpen(companyApplicationPath)
    notification.close()
  }

  Notifications.create(title, {
    tag,
    body,
    playSound,
    icon,
    sound,
    requireInteraction: true,
    onClick,
    // prevent sound playing without displaying the notification
    renotify: true
  })
}

export default createNewLeadNotification
