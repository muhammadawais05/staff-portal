import React from 'react'
import {
  RoleV2Scope,
  UpdateOpportunitySalesClaimerInput,
  Maybe
} from '@staff-portal/graphql/staff'
import { OperationFragment } from '@staff-portal/operations'
import { StaffUserFragment } from '@staff-portal/staff'

import { SetOpportunitySalesClaimerDocument } from '../../data'
import EditableStaffOpportunity from '../EditableStaffOpportunity'
import { getSalesClaimerHook } from '../../utils'

interface Props {
  salesClaimer: Maybe<StaffUserFragment> | undefined
  opportunityId: string
  operation: OperationFragment
}

const OpportunitySalesClaimer = ({
  salesClaimer,
  opportunityId,
  operation
}: Props) => (
  <EditableStaffOpportunity<UpdateOpportunitySalesClaimerInput>
    mutationDocument={SetOpportunitySalesClaimerDocument}
    name='salesClaimerId'
    queryHook={getSalesClaimerHook}
    opportunityId={opportunityId}
    value={salesClaimer}
    scope={RoleV2Scope.COMPANY_CLAIMERS}
    operation={operation}
  />
)

export default OpportunitySalesClaimer
