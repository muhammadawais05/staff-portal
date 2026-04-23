import { concatMessages } from './concat-messages'

type Error = {
  message: string
  [key: string]: unknown
}

export const concatMutationErrors = (
  errors: Error[] = [],
  defaultMessage?: string
): string => {
  const messages = errors.map(({ message }) => message)

  const result = concatMessages(messages)

  return defaultMessage
    ? `${defaultMessage}, the following errors occurred: ${result}`
    : result
}
