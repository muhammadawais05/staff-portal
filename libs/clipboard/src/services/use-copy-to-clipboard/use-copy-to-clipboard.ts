import { useNotifications } from '@staff-portal/error-handling'

export const useCopyToClipBoard = () => {
  const { showSuccess } = useNotifications()

  const copyToClipboard = async ({
    data,
    successMessage
  }: {
    data: string
    successMessage?: string
  }) => {
    await navigator.clipboard.writeText(data)

    if (successMessage) {
      showSuccess(successMessage)
    }
  }

  return {
    copyToClipboard
  }
}
