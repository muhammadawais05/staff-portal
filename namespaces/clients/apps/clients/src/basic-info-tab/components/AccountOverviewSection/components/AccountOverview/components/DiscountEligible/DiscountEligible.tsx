import React from 'react'
import { BusinessTypes } from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import { YesOrNoDropdown } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import {
  CompanyOperationFragment,
  isEnterpriseBusiness
} from '@staff-portal/clients'

import { SetUpdateDiscountEligibleDocument } from '../../../../data/set-update-client-discount-eligible.staff.gql.types'
import { getClientDiscountEligibleHook } from '../../utils'
import { CompanyOverviewFragment } from '../../../../data'

interface Props {
  clientId: string
  value: CompanyOverviewFragment['discountEligible']
  operation: CompanyOperationFragment
  businessType?: BusinessTypes | null
}

const DiscountEligible = ({
  value,
  operation,
  clientId,
  businessType
}: Props) => {
  const isEnterprise = isEnterpriseBusiness(businessType)
  const useGetClientDiscountEligible = getClientDiscountEligibleHook(clientId)
  const onChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateDiscountEligibleDocument,
    initialValues: { discountEligible: value ?? undefined },
    requiredValues: { clientId }
  })

  if (!isEnterprise) {
    return null
  }

  return (
    <YesOrNoDropdown
      disabled={!isOperationEnabled(operation)}
      name='discountEligible'
      onChange={onChange}
      value={Number(value)}
      queryValue={useGetClientDiscountEligible}
    />
  )
}

export default DiscountEligible
