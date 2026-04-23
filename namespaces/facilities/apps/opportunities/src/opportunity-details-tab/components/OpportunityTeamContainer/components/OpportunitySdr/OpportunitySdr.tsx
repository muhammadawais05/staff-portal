import React from 'react'
import {
  RoleV2Scope,
  UpdateOpportunitySdrInput,
  Maybe
} from '@staff-portal/graphql/staff'
import { OperationFragment } from '@staff-portal/operations'
import { StaffUserFragment } from '@staff-portal/staff'

import EditableStaffOpportunity from '../EditableStaffOpportunity'
import { SetOpportunitySdrDocument } from '../../data'
import { getSdrHook } from '../../utils'

interface Props {
  sdr: Maybe<StaffUserFragment> | undefined
  opportunityId: string
  operation: OperationFragment
}

const OpportunitySdr = ({ sdr, opportunityId, operation }: Props) => (
  <EditableStaffOpportunity<UpdateOpportunitySdrInput>
    mutationDocument={SetOpportunitySdrDocument}
    name='sdrId'
    queryHook={getSdrHook}
    opportunityId={opportunityId}
    value={sdr}
    scope={RoleV2Scope.ENTERPRISE_CLAIMERS}
    operation={operation}
  />
)

export default OpportunitySdr
