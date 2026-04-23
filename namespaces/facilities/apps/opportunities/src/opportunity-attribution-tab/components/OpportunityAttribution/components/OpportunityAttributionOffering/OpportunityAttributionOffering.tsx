import React from 'react'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { Maybe, UpdateOpportunityInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'
import useOpportunityOfferingOptions from '../../utils/use-opportunity-offering-options'

interface Props {
  opportunityId: string
  updateOpportunityDisabled: boolean
  offering: Maybe<string> | undefined
  onChange: (key: keyof UpdateOpportunityInput, values: AnyObject) => void
}

const OpportunityAttributionOffering = ({
  opportunityId,
  updateOpportunityDisabled,
  offering,
  onChange
}: Props) => {
  const { opportunityOfferingOptions, loading: offeringsLoading } =
    useOpportunityOfferingOptions()

  return (
    <EditableField<UpdateOpportunityInput>
      disabled={updateOpportunityDisabled}
      name='offering'
      multiline
      onChange={onChange}
      value={offering?.toString() ?? undefined}
      queryValue={getOpportunityValueHook(opportunityId, 'offering')}
      viewer={offering?.toString() || NO_VALUE}
      updateOnBlur
      editor={props => (
        <Form.Select
          {...props}
          autoFocus
          size='small'
          width='full'
          enableReset
          options={opportunityOfferingOptions}
          loading={offeringsLoading}
        />
      )}
    />
  )
}

export default OpportunityAttributionOffering
