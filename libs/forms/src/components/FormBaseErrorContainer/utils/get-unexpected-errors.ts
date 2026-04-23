import { SubmissionErrors } from '@toptal/picasso-forms'

const getUnexpectedErrors = ({
  submitError,
  submitErrors,
  registeredFields,
  fieldErrorKeys
}: {
  submitError: unknown
  submitErrors: SubmissionErrors
  registeredFields: string[]
  fieldErrorKeys?: string[]
}) => {
  let fieldErrors: string | undefined

  if (!submitError) {
    if (!submitErrors) {
      return undefined
    }

    const { originalErrors } = submitErrors

    const mappedOriginalErrors: Record<string, string> = (
      (originalErrors as { key: string; message: string }[]) || []
    ).reduce(
      (result, error) => ({
        ...result,
        [error.key]: result[error.key]
          ? `${result[error.key]}<br />${error.message}`
          : error.message
      }),
      {} as Record<string, string>
    )

    fieldErrors = (
      fieldErrorKeys ||
      Object.keys(mappedOriginalErrors).filter(
        key => !registeredFields.includes(key)
      )
    )
      .map(key => mappedOriginalErrors[key])
      .filter(Boolean)
      .join('<br />')
  }

  return typeof submitError === 'string' ? (submitError || fieldErrors) : fieldErrors
}

export default getUnexpectedErrors
