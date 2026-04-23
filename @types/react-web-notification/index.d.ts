declare module 'react-web-notification' {
  import * as React from 'react'

  export interface NotificationProps {
    ignore?: boolean
    disableActiveWindow?: boolean
    askAgain?: boolean
    notSupported?: Function
    onPermissionGranted?: Function
    onPermissionDenied?: Function
    onShow?: Function
    onClick?: Function
    onClose?: Function
    onError?: Function
    timeout?: number
    title: string
    options?: Record<string, unknown>
    swRegistration?: Record<string, unknown>
  }

  export default class Notification extends React.Component<
    NotificationProps,
    unknown
  > {}
}
