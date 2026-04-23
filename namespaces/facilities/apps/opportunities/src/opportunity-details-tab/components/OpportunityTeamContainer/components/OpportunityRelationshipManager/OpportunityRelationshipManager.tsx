import React from 'react'
import {
  RoleV2Scope,
  UpdateOpportunityRelationshipManagerInput,
  Maybe
} from '@staff-portal/graphql/staff'
import { OperationFragment } from '@staff-portal/operations'
import { StaffUserFragment } from '@staff-portal/staff'

import EditableStaffOpportunity from '../EditableStaffOpportunity'
import { SetOpportunityRelationshipManagerDocument } from '../../data'
import { getRelationshipManagerHook } from '../../utils'

interface Props {
  relationshipManager: Maybe<StaffUserFragment> | undefined
  opportunityId: string
  operation: OperationFragment
}

const OpportunityRelationshipManager = ({
  relationshipManager,
  opportunityId,
  operation
}: Props) => (
  <EditableStaffOpportunity<UpdateOpportunityRelationshipManagerInput>
    mutationDocument={SetOpportunityRelationshipManagerDocument}
    name='relationshipManagerId'
    queryHook={getRelationshipManagerHook}
    opportunityId={opportunityId}
    value={relationshipManager}
    scope={RoleV2Scope.SMB_RELATIONSHIP_MANAGERS}
    operation={operation}
  />
)

export default OpportunityRelationshipManager
