import React from 'react'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { Maybe, UpdateOpportunityInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'
import useOpportunityMarketingCampaignOptions from '../../utils/use-opportunity-marketing-campaign-options'

interface Props {
  opportunityId: string
  updateOpportunityDisabled: boolean
  marketingCampaign: Maybe<string> | undefined
  onChange: (key: keyof UpdateOpportunityInput, values: AnyObject) => void
}

const OpportunityAttributionMarketingCampaign = ({
  opportunityId,
  updateOpportunityDisabled,
  marketingCampaign,
  onChange
}: Props) => {
  const {
    opportunityMarketingCampaignOptions,
    loading: marketingCampaignsLoading
  } = useOpportunityMarketingCampaignOptions()

  return (
    <EditableField<UpdateOpportunityInput>
      disabled={updateOpportunityDisabled}
      name='marketingCampaign'
      multiline
      onChange={onChange}
      value={marketingCampaign?.toString() ?? undefined}
      queryValue={getOpportunityValueHook(opportunityId, 'marketingCampaign')}
      viewer={marketingCampaign?.toString() || NO_VALUE}
      updateOnBlur
      editor={props => (
        <Form.Select
          {...props}
          autoFocus
          size='small'
          width='full'
          enableReset
          options={opportunityMarketingCampaignOptions}
          loading={marketingCampaignsLoading}
        />
      )}
    />
  )
}

export default OpportunityAttributionMarketingCampaign
