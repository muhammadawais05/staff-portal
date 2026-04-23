import { TFunction } from 'i18next'

export const copyToClipboard = (
  translate: TFunction,
  text: string,
  setMessage: (message: string) => void
) => {
  const copyTest = document.queryCommandSupported('copy')
  const onError = () => {
    window.prompt(translate('actions.copy.manualPrompt'), text)
  }

  if (!copyTest) {
    return onError()
  }

  const copyTextArea = document.createElement('textarea')

  copyTextArea.value = text

  document?.body?.appendChild(copyTextArea)

  copyTextArea.select()

  try {
    const isCopied = document.execCommand('copy')

    setMessage(
      translate(isCopied ? 'actions.copy.success' : 'actions.copy.error')
    )
  } catch (err) {
    onError()
  }

  document?.body?.removeChild(copyTextArea)
}
