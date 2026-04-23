import React from 'react'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { Maybe, UpdateOpportunityInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'
import useOpportunitySourceOptions from '../../utils/use-opportunity-source-options'

interface Props {
  opportunityId: string
  updateOpportunityDisabled: boolean
  source: Maybe<string> | undefined
  onChange: (key: keyof UpdateOpportunityInput, values: AnyObject) => void
}

const OpportunityAttributionSource = ({
  opportunityId,
  updateOpportunityDisabled,
  source,
  onChange
}: Props) => {
  const { opportunitySourceOptions, loading: sourcesLoading } =
    useOpportunitySourceOptions()

  return (
    <EditableField<UpdateOpportunityInput>
      disabled={updateOpportunityDisabled}
      name='source'
      multiline
      onChange={onChange}
      value={source?.toString() ?? undefined}
      queryValue={getOpportunityValueHook(opportunityId, 'source')}
      viewer={source?.toString() || NO_VALUE}
      updateOnBlur
      editor={props => (
        <Form.Select
          {...props}
          autoFocus
          size='small'
          width='full'
          enableReset
          options={opportunitySourceOptions}
          loading={sourcesLoading}
        />
      )}
    />
  )
}

export default OpportunityAttributionSource
