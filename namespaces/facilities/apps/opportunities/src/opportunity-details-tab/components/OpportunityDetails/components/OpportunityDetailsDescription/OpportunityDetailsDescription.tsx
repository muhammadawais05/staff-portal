import React from 'react'
import { AnyObject } from '@toptal/picasso-forms'
import { Maybe, UpdateOpportunityInput } from '@staff-portal/graphql/staff'
import { EditableTextarea, EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'

interface Props {
  opportunityId: string
  updateOpportunityDisabled: boolean
  description: Maybe<string> | undefined
  onChange: (key: keyof UpdateOpportunityInput, values: AnyObject) => void
}

const OpportunityDetailsDescription = ({
  opportunityId,
  updateOpportunityDisabled,
  description,
  onChange
}: Props) => (
  <EditableField<UpdateOpportunityInput>
    disabled={updateOpportunityDisabled}
    name='description'
    multiline
    onChange={onChange}
    value={description?.toString() ?? undefined}
    queryValue={getOpportunityValueHook(opportunityId, 'description')}
    viewer={description?.toString() || NO_VALUE}
    updateOnBlur
    editor={props => <EditableTextarea {...props} />}
  />
)

export default OpportunityDetailsDescription
