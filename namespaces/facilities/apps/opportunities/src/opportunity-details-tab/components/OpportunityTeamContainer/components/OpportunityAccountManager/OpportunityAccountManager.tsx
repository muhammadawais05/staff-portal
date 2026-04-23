import React from 'react'
import {
  RoleV2Scope,
  UpdateOpportunityAccountManagerInput,
  Maybe
} from '@staff-portal/graphql/staff'
import { OperationFragment } from '@staff-portal/operations'
import { StaffUserFragment } from '@staff-portal/staff'

import EditableStaffOpportunity from '../EditableStaffOpportunity'
import { SetOpportunityAccountManagerDocument } from '../../data'
import { getAccountManagerHook } from '../../utils'

interface Props {
  accountManager: Maybe<StaffUserFragment> | undefined
  opportunityId: string
  operation: OperationFragment
}

const OpportunityAccountManager = ({
  accountManager,
  opportunityId,
  operation
}: Props) => (
  <EditableStaffOpportunity<UpdateOpportunityAccountManagerInput>
    mutationDocument={SetOpportunityAccountManagerDocument}
    name='accountManagerId'
    queryHook={getAccountManagerHook}
    opportunityId={opportunityId}
    value={accountManager}
    scope={RoleV2Scope.COMPANY_SMB_ACCOUNT_MANAGERS}
    operation={operation}
  />
)

export default OpportunityAccountManager
