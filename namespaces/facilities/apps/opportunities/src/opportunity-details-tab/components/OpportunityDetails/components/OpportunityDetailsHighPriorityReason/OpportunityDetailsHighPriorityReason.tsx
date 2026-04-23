import React from 'react'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { Maybe, UpdateOpportunityInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'

interface Props {
  opportunityId: string
  updateOpportunityDisabled: boolean
  highPriorityReason: Maybe<string> | undefined
  onChange: (key: keyof UpdateOpportunityInput, values: AnyObject) => void
}

const OpportunityDetailsHighPriorityReason = ({
  opportunityId,
  updateOpportunityDisabled,
  highPriorityReason,
  onChange
}: Props) => (
  <EditableField<UpdateOpportunityInput>
    disabled={updateOpportunityDisabled}
    name='highPriorityReason'
    multiline
    onChange={onChange}
    value={highPriorityReason ?? undefined}
    queryValue={getOpportunityValueHook(opportunityId, 'highPriorityReason')}
    viewer={highPriorityReason || NO_VALUE}
    updateOnBlur
    editor={props => (
      <Form.Input {...props} autoFocus size='small' width='full' />
    )}
  />
)

export default OpportunityDetailsHighPriorityReason
