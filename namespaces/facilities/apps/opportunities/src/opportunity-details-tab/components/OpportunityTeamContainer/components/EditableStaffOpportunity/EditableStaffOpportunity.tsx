import React from 'react'
import { EditableStaff, EditableStaffProps } from '@staff-portal/staff'
import { QueryResult } from '@staff-portal/editable'

import { OPPORTUNITY_STAFF_UPDATE } from '../../../../../messages'

type EditableStaffOpportunityRequiredInput = { opportunityId: string }

type EditableStaffOpportunityProps<
  TMutationInput extends EditableStaffOpportunityRequiredInput
> = Omit<EditableStaffProps<TMutationInput>, 'queryHook'> & {
  opportunityId: string
  queryHook: (opportunityId: string) => () => QueryResult<string>
}

const EditableStaffOpportunity = <
  TMutationInput extends EditableStaffOpportunityRequiredInput
>(
  props: EditableStaffOpportunityProps<TMutationInput>
) => {
  const { opportunityId, queryHook, ...rest } = props

  return (
    <EditableStaff<TMutationInput>
      {...rest}
      queryHook={queryHook(opportunityId)}
      requiredValues={{ opportunityId } as TMutationInput}
      mutationResultOptions={{
        successMessageEmitOptions: {
          type: OPPORTUNITY_STAFF_UPDATE,
          payload: { opportunityId }
        }
      }}
    />
  )
}

export default EditableStaffOpportunity
