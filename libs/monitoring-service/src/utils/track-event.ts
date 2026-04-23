// eslint-disable-next-line @typescript-eslint/ban-types
const trackEvent = (event: string, data?: Object) =>
  window?.analytics?.track(event, data)

export default trackEvent
