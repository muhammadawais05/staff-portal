import { windowOpen } from '@staff-portal/navigation'
import { Notifications } from '@staff-portal/notifications'

import icon from './escalation-notification-icon'
import sound from './escalation-notification-sound'
interface Options {
  tag: string
  playSound: boolean
  companyApplicationPath: string
}

const createEscalationNotification = ({
  tag,
  playSound,
  companyApplicationPath
}: Options) => {
  const title = 'UNCLAIMED LEAD'
  const body = 'Client is unclaimed for more than 7 minutes!'
  const onClick = (notification: Notification) => {
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
    onClick
  })
}

export default createEscalationNotification
