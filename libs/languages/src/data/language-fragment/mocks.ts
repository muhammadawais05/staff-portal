import { LanguageFragment } from './language-fragment.staff.gql.types'

export const createLanguageFragment = (
  data?: Partial<LanguageFragment>
): LanguageFragment => ({
  name: data?.name || 'Croatian',
  id: data?.id || '12334'
})
