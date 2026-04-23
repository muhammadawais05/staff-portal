import React from 'react'
import { BUSINESS_TYPE_MAPPING } from '@staff-portal/jobs'
import { BusinessTypes, Maybe } from '@staff-portal/graphql/staff'

export interface Props {
  businessType: Maybe<BusinessTypes> | undefined
  isEnterprise: boolean
}

const SourcingRequestBusinessTypeField = ({
  businessType,
  isEnterprise
}: Props) => (
  <span data-testid='sourcing-request-business-type'>
    {businessType && isEnterprise
      ? BUSINESS_TYPE_MAPPING[businessType]
      : 'Not Enterprise'}
  </span>
)

export default SourcingRequestBusinessTypeField
