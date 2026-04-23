import React from 'react'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { Maybe, UpdateOpportunityInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'

interface Props {
  opportunityId: string
  updateOpportunityDisabled: boolean
  name: Maybe<string> | undefined
  onChange: (key: keyof UpdateOpportunityInput, values: AnyObject) => void
}

const OpportunityDetailsName = ({
  opportunityId,
  updateOpportunityDisabled,
  name,
  onChange
}: Props) => (
  <EditableField<UpdateOpportunityInput>
    disabled={updateOpportunityDisabled}
    name='name'
    multiline
    onChange={onChange}
    value={name?.toString() ?? undefined}
    queryValue={getOpportunityValueHook(opportunityId, 'name')}
    viewer={name?.toString() || NO_VALUE}
    updateOnBlur
    editor={props => (
      <Form.Input {...props} autoFocus size='small' width='full' />
    )}
  />
)

export default OpportunityDetailsName
