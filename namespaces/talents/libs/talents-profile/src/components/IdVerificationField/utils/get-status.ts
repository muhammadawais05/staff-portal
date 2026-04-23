import { toTitleCase } from '@toptal/picasso/utils'

const STATUS_TRANSLATIONS: Record<string, string> = {
  not_attempted: 'Not attempted',
  failure: 'Failed',
  checking_manually: 'Is being checked',
  success: 'Succeeded'
}

export const getStatus = (key: string) => {
  return STATUS_TRANSLATIONS[key] || toTitleCase(key)
}
