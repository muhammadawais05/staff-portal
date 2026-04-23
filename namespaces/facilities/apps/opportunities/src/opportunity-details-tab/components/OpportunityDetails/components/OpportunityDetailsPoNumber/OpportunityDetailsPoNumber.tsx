import React from 'react'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { Maybe, UpdateOpportunityInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'

interface Props {
  opportunityId: string
  updateOpportunityDisabled: boolean
  poNumber: Maybe<string> | undefined
  onChange: (key: keyof UpdateOpportunityInput, values: AnyObject) => void
}

const OpportunityDetailsPoNumber = ({
  opportunityId,
  updateOpportunityDisabled,
  poNumber,
  onChange
}: Props) => (
  <EditableField<UpdateOpportunityInput>
    disabled={updateOpportunityDisabled}
    name='poNumber'
    multiline
    onChange={onChange}
    value={poNumber ?? undefined}
    queryValue={getOpportunityValueHook(opportunityId, 'poNumber')}
    viewer={poNumber || NO_VALUE}
    updateOnBlur
    editor={props => (
      <Form.Input {...props} autoFocus size='small' width='full' />
    )}
  />
)

export default OpportunityDetailsPoNumber
