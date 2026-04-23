import React from 'react'
import { DetailedListItem } from '@staff-portal/ui'
import { isOperationEnabled } from '@staff-portal/operations'

import { OpportunityAttributionFragment } from '../data'
import OpportunityAttributionEvent from '../components/OpportunityAttributionEvent'
import OpportunityAttributionMarketingCampaign from '../components/OpportunityAttributionMarketingCampaign'
import OpportunityAttributionOffering from '../components/OpportunityAttributionOffering'
import OpportunityAttributionPartner from '../components/OpportunityAttributionPartner'
import OpportunityAttributionSource from '../components/OpportunityAttributionSource'
import { useOpportunityAttributionMutation } from './use-opportunity-attribution-mutation'

const EMPTY_ITEM = {} as DetailedListItem

interface Props {
  opportunityAttribution: OpportunityAttributionFragment
}

// eslint-disable-next-line max-lines-per-function, max-statements, complexity
export const useOpportunityAttributionItems = ({
  opportunityAttribution
}: Props): DetailedListItem[] => {
  const {
    id: opportunityId,
    partner,
    offering,
    source,
    event,
    marketingCampaign,
    operations: { updateOpportunity: updateOpportunityOperation = undefined }
  } = opportunityAttribution

  const updateOpportunityDisabled = !isOperationEnabled(
    updateOpportunityOperation
  )

  const { handleChange } = useOpportunityAttributionMutation(
    opportunityAttribution
  )

  const partnerField = {
    key: 'partner',
    label: 'Partner',
    value: (
      <OpportunityAttributionPartner
        opportunityId={opportunityId}
        updateOpportunityDisabled={updateOpportunityDisabled}
        partner={partner}
        onChange={handleChange}
      />
    )
  }

  const offeringField = {
    key: 'offering',
    label: 'Offering',
    value: (
      <OpportunityAttributionOffering
        opportunityId={opportunityId}
        updateOpportunityDisabled={updateOpportunityDisabled}
        offering={offering}
        onChange={handleChange}
      />
    )
  }

  const sourceField = {
    key: 'source',
    label: 'Source',
    value: (
      <OpportunityAttributionSource
        opportunityId={opportunityId}
        updateOpportunityDisabled={updateOpportunityDisabled}
        source={source}
        onChange={handleChange}
      />
    )
  }

  const eventField = {
    key: 'event',
    label: 'Event',
    value: (
      <OpportunityAttributionEvent
        opportunityId={opportunityId}
        updateOpportunityDisabled={updateOpportunityDisabled}
        event={event}
        onChange={handleChange}
      />
    )
  }

  const marketingCampaignField = {
    key: 'marketingCampaign',
    label: 'Marketing Campaign',
    value: (
      <OpportunityAttributionMarketingCampaign
        opportunityId={opportunityId}
        updateOpportunityDisabled={updateOpportunityDisabled}
        marketingCampaign={marketingCampaign}
        onChange={handleChange}
      />
    )
  }

  return [
    partnerField,
    offeringField,
    sourceField,
    eventField,
    marketingCampaignField,
    EMPTY_ITEM
  ]
}
