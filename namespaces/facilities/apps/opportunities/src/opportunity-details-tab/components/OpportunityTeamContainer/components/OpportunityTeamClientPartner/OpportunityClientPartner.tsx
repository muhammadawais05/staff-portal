import React from 'react'
import {
  RoleV2Scope,
  UpdateOpportunityClientPartnerInput,
  Maybe
} from '@staff-portal/graphql/staff'
import { OperationFragment } from '@staff-portal/operations'
import { StaffUserFragment } from '@staff-portal/staff'

import EditableStaffOpportunity from '../EditableStaffOpportunity'
import { SetOpportunityClientPartnerDocument } from '../../data'
import { getClientPartnerHook } from '../../utils'

interface Props {
  clientPartner: Maybe<StaffUserFragment> | undefined
  opportunityId: string
  operation: OperationFragment
}

const OpportunityClientPartner = ({
  clientPartner,
  opportunityId,
  operation
}: Props) => (
  <EditableStaffOpportunity<UpdateOpportunityClientPartnerInput>
    mutationDocument={SetOpportunityClientPartnerDocument}
    name='clientPartnerId'
    queryHook={getClientPartnerHook}
    opportunityId={opportunityId}
    value={clientPartner}
    scope={RoleV2Scope.ENTERPRISE_CLAIMERS}
    operation={operation}
  />
)

export default OpportunityClientPartner
