import { FunctionComponent } from 'react'
import { TaskIconProps } from '@staff-portal/tasks'
import { JobType } from '@staff-portal/jobs'

import DesignerIcon from './components/DesignerIcon'
import DeveloperIcon from './components/DeveloperIcon'
import FinanceExpertIcon from './components/FinanceExpertIcon'
import ProjectManagerIcon from './components/ProjectManagerIcon'
import { JobContentField } from './enums'
import ProductManagerIcon from './components/ProductManagerIcon'

export const JOB_TYPE_ICON_MAPPING: Record<
  JobType,
  FunctionComponent<TaskIconProps>
> = {
  [JobType.FINANCE_EXPERT]: FinanceExpertIcon,
  [JobType.DESIGNER]: DesignerIcon,
  [JobType.DEVELOPER]: DeveloperIcon,
  [JobType.PROJECT_MANAGER]: ProjectManagerIcon,
  [JobType.PRODUCT_MANAGER]: ProductManagerIcon
}

export const SEMI_MONTHLY_BILLING_NOTICE = `This client has specific billing requirements, and as such payment cycles will differ from standard jobs. The payment cycles will be set as two periods for each calendar month: the first of each month until the 15th, and the 16th to the last day of each month. The terms for payment are still Net 20 days from the issue date of the notice of payment.`

export const JOB_CONFIGURATION = [
  JobContentField.ORIGINAL_JOB,
  JobContentField.COMPANY,
  JobContentField.SKILL_REG,
  JobContentField.SPECIALIZATION,
  JobContentField.TIMEZONE,
  JobContentField.DESIRED_START,
  JobContentField.COMMITMENT,
  JobContentField.ESTIMATED_LENGTH,
  JobContentField.RECRUITER,
  JobContentField.SALES_CLAIMER,
  JobContentField.POSTED,
  JobContentField.CLAIMED,
  JobContentField.APPLICANTS,
  JobContentField.AV_REQUESTS,
  JobContentField.CANDIDATES,
  JobContentField.ASSIGNED_TALENT,
  JobContentField.JOB_START_DATE,
  JobContentField.JOB_END_DATE,
  JobContentField.LAST_BREAK
]
