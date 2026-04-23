import { ErrorInfo } from 'react'
import {
  reportComponentError,
  ErrorSeverity
} from '@staff-portal/monitoring-service'

interface CustomNotificationOptions extends NotificationOptions {
  playSound?: boolean
  sound?: HTMLAudioElement
  onClick?: (notification: Notification, ev: Event) => void
}

// Possible permission values: https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission
const PERMISSION_GRANTED = 'granted'
const PERMISSION_DENIED = 'denied'

const create = (title: string, options: CustomNotificationOptions = {}) => {
  const { playSound, sound, onClick, ...notificationOptions } = options

  try {
    const notification = new window.Notification(title, {
      silent: true,
      ...notificationOptions
    })

    if (playSound && sound) {
      notification.onshow = () => {
        sound.play().catch(() => {
          /**
           * this will throw `NotAllowedError: play() failed because the user didn't interact with the document first`
           * if the user haven't interacted in any way with the page before the notification
           * so we just swallow the error
           */
        })
      }
    }

    if (onClick) {
      // prettier-ignore
      notification.onclick = function(this: Notification, ev: Event) {
        onClick(this, ev)
      }
    }
  } catch (error) {
    if (!(error instanceof Error)) {
      return
    }

    const errorInfo = {} as ErrorInfo

    reportComponentError(
      error,
      errorInfo,
      { APP_NAME: 'staff-portal', PACKAGE_VERSION: '0.0.0' },
      ErrorSeverity.Warning
    )
  }
}

const checkNotificationPromise = () => {
  try {
    // eslint-disable-next-line
    window.Notification.requestPermission().then()
  } catch (e) {
    return false
  }

  return true
}

const checkPermissionGranted = (permission: NotificationPermission) =>
  permission === PERMISSION_GRANTED

const isPermissionDenied = () =>
  isSupported() && window.Notification.permission === PERMISSION_DENIED

const requestPermission = async (): Promise<boolean> => {
  if (!isSupported() || isPermissionDenied()) {
    return false
  }

  if (checkPermissionGranted(window.Notification.permission)) {
    return true
  }

  if (checkNotificationPromise()) {
    return window.Notification.requestPermission().then(checkPermissionGranted)
  }

  return new Promise(resolve =>
    window.Notification.requestPermission(permission =>
      resolve(checkPermissionGranted(permission))
    )
  )
}

const isSupported = () => Boolean(window.Notification)

export const Notifications = {
  create,
  requestPermission,
  isSupported,
  isPermissionDenied
}
