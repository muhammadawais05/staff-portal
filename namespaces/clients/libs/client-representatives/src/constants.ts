import {
  PhoneCategory,
  CompanyRepresentativeCommunicationOption as CommOpts,
  CompanyRepresentativeBillingCommunicationOption as BillingCommOpts
} from '@staff-portal/graphql/staff'

import { AdditionalPhoneCategory } from './types'

const PHONE_CATEGORIES = [
  PhoneCategory.OTHER,
  PhoneCategory.OFFICE,
  PhoneCategory.MOBILE,
  PhoneCategory.HOME
]

export enum ADDITIONAL_PHONE_CATEGORY {
  BILLING = 'BILLING'
}

export const ADDITIONAL_PHONE_CATEGORY_TITLES = {
  [AdditionalPhoneCategory.BILLING]: 'Billing'
}

export const PHONE_CATEGORY_TITLES = {
  [PhoneCategory.OTHER]: 'Other',
  [PhoneCategory.OFFICE]: 'Office',
  [PhoneCategory.MOBILE]: 'Mobile',
  [PhoneCategory.HOME]: 'Home'
}

export const PHONE_CATEGORY_ITEMS = PHONE_CATEGORIES.map(value => ({
  text: PHONE_CATEGORY_TITLES[value],
  value
}))

export const communicationOptionLabels = {
  [CommOpts.NOTIFY_BILLING]: 'Send Billing Notices',
  [CommOpts.NOTIFY_JOBS]: 'Send Emails About All Jobs',
  [CommOpts.NOTIFY_OTHER]: 'Send Other Company Emails',
  [CommOpts.NOTIFY_TALENT_RECOMMENDATIONS]: 'Send Talent Recommendation Emails'
}

export const communicationOptionNames = {
  [CommOpts.NOTIFY_BILLING]: 'Billing',
  [CommOpts.NOTIFY_JOBS]: 'All Job Activity',
  [CommOpts.NOTIFY_OTHER]: 'Other',
  [CommOpts.NOTIFY_TALENT_RECOMMENDATIONS]: 'Talent'
}

export const billingCommunicationOptionLabels = {
  [BillingCommOpts.ALL]: 'All Notices',
  [BillingCommOpts.NONE]: 'None',
  [BillingCommOpts.SELECTED_JOB_NOTICES]: 'Selected Job Notices'
}
