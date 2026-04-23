import Cookie from 'js-cookie'
import * as FakeTimers from '@sinonjs/fake-timers'

let fakeClock: FakeTimers.Clock
let interval: number | null

const setupCucumber = () => {
  const tzOffset = Cookie.get('tz_offset_override')
  const tzValue = Cookie.get('tz_value_override')
  const time = Cookie.get('time_override')

  if (tzOffset) {
    // Rails returns offset in seconds from UTC to the local time zone,
    // while JS returns offset in minutes from the local time zone to UTC.
    // eslint-disable-next-line @miovision/disallow-date/no-static-date
    Date.prototype.getTimezoneOffset = () => -parseInt(tzOffset, 10) / 60
  }

  if (tzValue && window.Intl) {
    const originValues = new window.Intl.DateTimeFormat().resolvedOptions()

    window.Intl.DateTimeFormat.prototype.resolvedOptions = () => ({
      ...originValues,
      timeZone: tzValue
    })
  }

  if (time) {
    // Ruby has time value in seconds, JS in milliseconds
    const timeValue = parseInt(time) * 1000

    if (fakeClock) {
      fakeClock.uninstall()
    }

    // Skip timers and override only Date
    fakeClock = FakeTimers.install({
      now: timeValue,
      toFake: ['Date']
    } as FakeTimers.Config)

    // Keep clock ticking
    if (interval) {
      clearInterval(interval)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    interval = setInterval(() => {
      // Related to https://github.com/sinonjs/fake-timers/issues/356
      fakeClock.tick(100)
    }, 100)
  }
}

// Expose setupCucumber to Cucumber context
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(window as any).setupCucumber = setupCucumber

export { setupCucumber }
