import { defineDependency } from '@staff-portal/dependency-injector'

import { TalentStatusMapping, CompanyStatusTextMapping } from './types'

export const TALENT_STATUS_MAPPING_DI_KEY =
  defineDependency<TalentStatusMapping>()
export const COMPANY_STATUS_TEXT_MAPPING_DI_KEY =
  defineDependency<CompanyStatusTextMapping>()
