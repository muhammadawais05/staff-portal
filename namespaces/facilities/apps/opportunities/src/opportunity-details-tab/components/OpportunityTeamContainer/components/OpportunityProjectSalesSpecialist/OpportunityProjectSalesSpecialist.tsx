import React from 'react'
import {
  RoleV2Scope,
  UpdateOpportunityProjectSalesSpecialistInput,
  Maybe
} from '@staff-portal/graphql/staff'
import { OperationFragment } from '@staff-portal/operations'
import { StaffUserFragment } from '@staff-portal/staff'

import EditableStaffOpportunity from '../EditableStaffOpportunity'
import { SetOpportunityProjectSalesSpecialistDocument } from '../../data'
import { getProjectSalesSpecialistHook } from '../../utils'

interface Props {
  projectSalesSpecialist: Maybe<StaffUserFragment> | undefined
  opportunityId: string
  operation: OperationFragment
}

const OpportunityProjectSalesSpecialist = ({
  projectSalesSpecialist,
  opportunityId,
  operation
}: Props) => (
  <EditableStaffOpportunity<UpdateOpportunityProjectSalesSpecialistInput>
    mutationDocument={SetOpportunityProjectSalesSpecialistDocument}
    name='projectSalesSpecialistId'
    queryHook={getProjectSalesSpecialistHook}
    opportunityId={opportunityId}
    value={projectSalesSpecialist}
    scope={RoleV2Scope.COMPANY_CLAIMERS}
    operation={operation}
  />
)

export default OpportunityProjectSalesSpecialist
