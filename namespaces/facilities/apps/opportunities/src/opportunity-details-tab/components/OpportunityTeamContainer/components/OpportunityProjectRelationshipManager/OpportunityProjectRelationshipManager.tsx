import React from 'react'
import {
  RoleV2Scope,
  UpdateOpportunityProjectRelationshipManagerInput,
  Maybe
} from '@staff-portal/graphql/staff'
import { OperationFragment } from '@staff-portal/operations'
import { StaffUserFragment } from '@staff-portal/staff'

import EditableStaffOpportunity from '../EditableStaffOpportunity'
import { SetOpportunityProjectRelationshipManagerDocument } from '../../data'
import { getProjectRelationshipManagerHook } from '../../utils'

interface Props {
  projectRelationshipManager: Maybe<StaffUserFragment> | undefined
  opportunityId: string
  operation: OperationFragment
}

const OpportunityProjectRelationshipManager = ({
  projectRelationshipManager,
  opportunityId,
  operation
}: Props) => (
  <EditableStaffOpportunity<UpdateOpportunityProjectRelationshipManagerInput>
    mutationDocument={SetOpportunityProjectRelationshipManagerDocument}
    name='projectRelationshipManagerId'
    queryHook={getProjectRelationshipManagerHook}
    opportunityId={opportunityId}
    value={projectRelationshipManager}
    scope={RoleV2Scope.SMB_RELATIONSHIP_MANAGERS}
    operation={operation}
  />
)

export default OpportunityProjectRelationshipManager
