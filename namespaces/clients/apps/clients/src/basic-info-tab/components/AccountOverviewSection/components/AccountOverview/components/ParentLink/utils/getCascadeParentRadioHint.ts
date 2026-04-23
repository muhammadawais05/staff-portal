export const getCascadeParentRadioHint = (
  name: string,
  hintOrError: string
) => {
  if (!hintOrError) {
    return []
  }

  if (name === 'cascadeBillingDetails') {
    const document = new DOMParser().parseFromString(hintOrError, 'text/html')

    return Array.from(document.body.children).map(el => el.innerHTML)
  }

  return [hintOrError]
}
