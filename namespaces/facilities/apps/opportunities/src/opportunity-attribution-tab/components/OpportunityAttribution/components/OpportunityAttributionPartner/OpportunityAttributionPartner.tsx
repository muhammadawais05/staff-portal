import React from 'react'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { Maybe, UpdateOpportunityInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'
import useOpportunityPartnerOptions from '../../utils/use-opportunity-partner-options'

interface Props {
  opportunityId: string
  updateOpportunityDisabled: boolean
  partner: Maybe<string> | undefined
  onChange: (key: keyof UpdateOpportunityInput, values: AnyObject) => void
}

const OpportunityAttributionPartner = ({
  opportunityId,
  updateOpportunityDisabled,
  partner,
  onChange
}: Props) => {
  const { opportunityPartnerOptions, loading: partnersLoading } =
    useOpportunityPartnerOptions()

  return (
    <EditableField<UpdateOpportunityInput>
      disabled={updateOpportunityDisabled}
      name='partner'
      multiline
      onChange={onChange}
      value={partner?.toString() ?? undefined}
      queryValue={getOpportunityValueHook(opportunityId, 'partner')}
      viewer={partner?.toString() || NO_VALUE}
      updateOnBlur
      editor={props => (
        <Form.Select
          {...props}
          autoFocus
          size='small'
          width='full'
          enableReset
          options={opportunityPartnerOptions}
          loading={partnersLoading}
        />
      )}
    />
  )
}

export default OpportunityAttributionPartner
