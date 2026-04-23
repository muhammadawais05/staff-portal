import React from 'react'
import { ReferralBonus16 } from '@toptal/picasso'
import { AnyObject } from '@toptal/picasso-forms'
import { Maybe, UpdateOpportunityInput } from '@staff-portal/graphql/staff'
import { EditableNumberInput, EditableField } from '@staff-portal/editable'
import { zeroOrGreaterOrEmpty } from '@staff-portal/validators'
import { amountCleanNumberValue } from '@staff-portal/filters'
import { NO_VALUE } from '@staff-portal/config'

import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'

interface Props {
  opportunityId: string
  disabled: boolean
  value: Maybe<number> | undefined
  formattedValue: Maybe<string> | undefined
  onChange: (key: keyof UpdateOpportunityInput, values: AnyObject) => void
}

const OpportunityDetailsValue = ({
  opportunityId,
  disabled,
  value,
  formattedValue,
  onChange
}: Props) => (
  <EditableField<UpdateOpportunityInput, number>
    disabled={disabled}
    name='value'
    multiline
    onChange={onChange}
    value={value ?? undefined}
    queryValue={getOpportunityValueHook(opportunityId, 'value')}
    viewer={formattedValue || NO_VALUE}
    updateOnBlur
    editor={props => (
      <EditableNumberInput
        // type='text' passed for displaying dot as decimal separator
        // TODO: remove type='text' after https://toptal-core.atlassian.net/browse/FX-1703
        {...props}
        parse={amountCleanNumberValue}
        validate={zeroOrGreaterOrEmpty}
        type='text'
        icon={<ReferralBonus16 />}
        hideControls
      />
    )}
  />
)

export default OpportunityDetailsValue
