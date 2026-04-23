const SECONDS_IN_MINUTE = 60

const getCurrentTimezoneSettings = () => {
  const timezoneOffsetInSeconds =
    new Date().getTimezoneOffset() * SECONDS_IN_MINUTE

  return {
    timezoneOffset: -timezoneOffsetInSeconds,
    timezoneName:
      typeof window.Intl === 'object'
        ? window.Intl.DateTimeFormat().resolvedOptions().timeZone
        : undefined
  }
}

export default getCurrentTimezoneSettings
