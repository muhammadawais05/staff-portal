import React from 'react'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { Maybe, UpdateOpportunityInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { isNotNullish } from '@staff-portal/utils'
import { NO_VALUE } from '@staff-portal/config'

import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'

interface Props {
  opportunityId: string
  updateOpportunityDisabled: boolean
  highPriority: Maybe<boolean> | undefined
  onChange: (key: keyof UpdateOpportunityInput, values: AnyObject) => void
}

const OPTIONS = [
  { text: 'Yes', value: 'true' },
  { text: 'No', value: 'false' }
]

const OpportunityDetailsHighPriority = ({
  opportunityId,
  updateOpportunityDisabled,
  highPriority,
  onChange
}: Props) => (
  <EditableField<UpdateOpportunityInput>
    disabled={updateOpportunityDisabled}
    name='highPriority'
    multiline
    onChange={onChange}
    value={String(!!highPriority)}
    queryValue={getOpportunityValueHook(opportunityId, 'highPriority')}
    viewer={
      isNotNullish(highPriority) ? (highPriority ? 'Yes' : 'No') : NO_VALUE
    }
    updateOnBlur
    editor={props => (
      <Form.Select
        {...props}
        autoFocus
        size='small'
        width='full'
        options={OPTIONS}
      />
    )}
  />
)

export default OpportunityDetailsHighPriority
