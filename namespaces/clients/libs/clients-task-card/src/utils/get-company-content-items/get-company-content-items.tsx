import { TaskCardLayoutContentItem } from '@staff-portal/tasks'

import {
  COMPANY_ACTIVE_CONFIGURATION,
  COMPANY_APPLIED_CONFIGURATION
} from '../../config'
import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment'
import { getCompanyContentMapping } from './get-company-content-mapping'

export const getCompanyContentItems = (
  company: TaskCardCompanyFragment,
  isActiveCompany: boolean,
  timeZone?: string
): TaskCardLayoutContentItem[] => {
  const configurations = isActiveCompany
    ? COMPANY_ACTIVE_CONFIGURATION
    : COMPANY_APPLIED_CONFIGURATION

  const contentMapping = getCompanyContentMapping(company, timeZone)

  return configurations
    .filter(key => contentMapping[key])
    .map(key => ({
      ...(contentMapping[key] as TaskCardLayoutContentItem),
      key
    }))
}
