import Clipboard from 'clipboard'
import { useNotifications } from '@staff-portal/error-handling'

export const useCopyRichTextToClipBoard = () => {
  const { showSuccess } = useNotifications()

  const copyRichTextToClipboard = async ({
    target,
    successMessage
  }: {
    target: Element
    successMessage?: string
  }): Promise<void> => {
    return new Promise((resolve, reject) => {
      const fakeBtn = document.createElement('button')
      const clipboard = new Clipboard(fakeBtn, {
        target: () => target
      })

      clipboard.on('success', () => {
        clipboard.destroy()

        if (successMessage) {
          showSuccess(successMessage)
        }

        resolve()
      })
      clipboard.on('error', event => {
        clipboard.destroy()
        reject(event)
      })
      document.body.appendChild(fakeBtn)
      fakeBtn.click()
      document.body.removeChild(fakeBtn)
    })
  }

  return {
    copyRichTextToClipboard
  }
}
