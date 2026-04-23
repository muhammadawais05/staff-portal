import React from 'react'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { Maybe, UpdateOpportunityInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'
import useOpportunityEventOptions from '../../utils/use-opportunity-event-options'

interface Props {
  opportunityId: string
  updateOpportunityDisabled: boolean
  event: Maybe<string> | undefined
  onChange: (key: keyof UpdateOpportunityInput, values: AnyObject) => void
}

const OpportunityAttributionEvent = ({
  opportunityId,
  updateOpportunityDisabled,
  event,
  onChange
}: Props) => {
  const { opportunityEventOptions, loading: eventsLoading } =
    useOpportunityEventOptions()

  return (
    <EditableField<UpdateOpportunityInput>
      disabled={updateOpportunityDisabled}
      name='event'
      multiline
      onChange={onChange}
      value={event?.toString() ?? undefined}
      queryValue={getOpportunityValueHook(opportunityId, 'event')}
      viewer={event?.toString() || NO_VALUE}
      updateOnBlur
      editor={props => (
        <Form.Select
          {...props}
          autoFocus
          size='small'
          width='full'
          enableReset
          options={opportunityEventOptions}
          loading={eventsLoading}
        />
      )}
    />
  )
}

export default OpportunityAttributionEvent
