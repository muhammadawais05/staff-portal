import { BusinessTypes } from '@staff-portal/graphql/staff'

export const isEnterpriseBusiness = (businessType?: BusinessTypes | null) =>
  businessType === BusinessTypes.ENTERPRISE_BUSINESS
