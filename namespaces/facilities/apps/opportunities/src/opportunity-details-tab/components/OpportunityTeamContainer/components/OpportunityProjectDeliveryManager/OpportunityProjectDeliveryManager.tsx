import React from 'react'
import {
  RoleV2Scope,
  UpdateOpportunityProjectDeliveryManagerInput,
  Maybe
} from '@staff-portal/graphql/staff'
import { OperationFragment } from '@staff-portal/operations'
import { StaffUserFragment } from '@staff-portal/staff'

import EditableStaffOpportunity from '../EditableStaffOpportunity'
import { SetOpportunityProjectDeliveryManagerDocument } from '../../data'
import { getProjectDeliveryManagerHook } from '../../utils'

interface Props {
  projectDeliveryManager: Maybe<StaffUserFragment> | undefined
  opportunityId: string
  operation: OperationFragment
}

const OpportunityProjectDeliveryManager = ({
  projectDeliveryManager,
  opportunityId,
  operation
}: Props) => (
  <EditableStaffOpportunity<UpdateOpportunityProjectDeliveryManagerInput>
    mutationDocument={SetOpportunityProjectDeliveryManagerDocument}
    name='projectDeliveryManagerId'
    queryHook={getProjectDeliveryManagerHook}
    opportunityId={opportunityId}
    value={projectDeliveryManager}
    scope={RoleV2Scope.COMPANY_SMB_PROJECT_DELIVERY_MANAGERS}
    operation={operation}
  />
)

export default OpportunityProjectDeliveryManager
