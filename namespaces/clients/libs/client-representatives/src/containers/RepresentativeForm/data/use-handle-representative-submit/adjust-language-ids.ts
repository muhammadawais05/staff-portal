import { LanguageOption } from '../../RepresentativeForm'

export const adjustLanguageIds = (languages?: LanguageOption[]) =>
  languages?.map(({ value }) => value)
