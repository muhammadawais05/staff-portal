import React from 'react'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { UpdateOpportunityInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'

import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'

interface Props {
  opportunityId: string
  disabled: boolean
  probability?: number | null
  onChange: (key: keyof UpdateOpportunityInput, values: AnyObject) => void
}

const OPTIONS = [
  { text: '20%', value: '20' },
  { text: '40%', value: '40' },
  { text: '60%', value: '60' },
  { text: '80%', value: '80' },
  { text: '100%', value: '100' }
]

const OpportunityDetailsProbability = ({
  opportunityId,
  disabled,
  probability,
  onChange
}: Props) => (
  <EditableField<UpdateOpportunityInput>
    disabled={disabled}
    name='probability'
    multiline
    onChange={onChange}
    value={probability?.toString()}
    queryValue={getOpportunityValueHook(opportunityId, 'probability')}
    viewer={`${probability}%`}
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

export default OpportunityDetailsProbability
