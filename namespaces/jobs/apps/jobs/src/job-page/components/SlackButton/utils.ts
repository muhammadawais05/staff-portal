import { SlackContact } from './types'

export const hasSlackContacts = (
  contacts?: SlackContact[]
): contacts is SlackContact[] => {
  return !!contacts && contacts?.length > 0 && !!contacts[0].webResource.url
}
