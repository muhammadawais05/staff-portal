import React from 'react'
import { AnyObject } from '@toptal/picasso-forms'
import { ReferralBonus16 } from '@toptal/picasso'
import { Maybe, UpdateOpportunityInput } from '@staff-portal/graphql/staff'
import { EditableNumberInput, EditableField } from '@staff-portal/editable'
import { zeroOrGreaterOrEmpty } from '@staff-portal/validators'
import { amountCleanNumberValue } from '@staff-portal/filters'
import { NO_VALUE } from '@staff-portal/config'

import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'

interface Props {
  opportunityId: string
  disabled: boolean
  poAmount: Maybe<number> | undefined
  formattedPoAmount: Maybe<string> | undefined
  onChange: (key: keyof UpdateOpportunityInput, values: AnyObject) => void
}

const OpportunityDetailsPoAmount = ({
  opportunityId,
  disabled,
  poAmount,
  formattedPoAmount,
  onChange
}: Props) => (
  <EditableField<UpdateOpportunityInput, number>
    disabled={disabled}
    name='poAmount'
    multiline
    onChange={onChange}
    value={poAmount ?? undefined}
    queryValue={getOpportunityValueHook(opportunityId, 'poAmount')}
    viewer={formattedPoAmount || NO_VALUE}
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

export default OpportunityDetailsPoAmount
