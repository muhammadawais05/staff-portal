import React from 'react'
import { ReferralBonus16 } from '@toptal/picasso'
import { AnyObject } from '@toptal/picasso-forms'
import { Maybe, UpdateOpportunityInput } from '@staff-portal/graphql/staff'
import { EditableNumberInput, EditableField } from '@staff-portal/editable'
import { positiveNumberOrEmpty } from '@staff-portal/validators'
import { amountCleanNumberValue } from '@staff-portal/filters'
import { NO_VALUE } from '@staff-portal/config'

import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'

interface Props {
  opportunityId: string
  disabled: boolean
  budget: Maybe<number> | undefined
  formattedBudget: Maybe<string> | undefined
  onChange: (key: keyof UpdateOpportunityInput, values: AnyObject) => void
}

const OpportunityDetailsBudget = ({
  opportunityId,
  disabled,
  budget,
  formattedBudget,
  onChange
}: Props) => (
  <EditableField<UpdateOpportunityInput, number>
    disabled={disabled}
    name='budget'
    multiline
    onChange={onChange}
    value={budget ?? undefined}
    queryValue={getOpportunityValueHook(opportunityId, 'budget')}
    viewer={formattedBudget || NO_VALUE}
    updateOnBlur
    editor={props => (
      <EditableNumberInput
        // type='text' passed for displaying dot as decimal separator
        // TODO: remove type='text' after https://toptal-core.atlassian.net/browse/FX-1703
        {...props}
        parse={amountCleanNumberValue}
        validate={positiveNumberOrEmpty}
        type='text'
        icon={<ReferralBonus16 />}
      />
    )}
  />
)

export default OpportunityDetailsBudget
