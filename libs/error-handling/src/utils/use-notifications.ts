import { useNotifications } from '@toptal/picasso/utils'

export default () => {
  const { showError, ...rest } = useNotifications()

  const showDevError = (
    ...args: Parameters<ReturnType<typeof useNotifications>['showError']>
  ) => {
    const [message, ...restArgs] = args

    return (
      process.env.NODE_ENV === 'development' &&
      showError(`DEV: ${message}`, ...restArgs)
    )
  }

  return {
    ...rest,
    showError,
    showDevError
  }
}
