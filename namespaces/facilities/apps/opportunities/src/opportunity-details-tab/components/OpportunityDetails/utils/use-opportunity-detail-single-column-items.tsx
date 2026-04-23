import React from 'react'
import { isOperationEnabled } from '@staff-portal/operations'

import { OpportunityDetailsFragment } from '../data'
import OpportunityDetailsName from '../components/OpportunityDetailsName'
import OpportunityDetailsDescription from '../components/OpportunityDetailsDescription'
import { useOpportunityDetailsMutation } from './use-opportunity-details-mutation'

interface Props {
  opportunityDetails: OpportunityDetailsFragment
}

export const useOpportunityDetailSingleColumnItems = ({
  opportunityDetails
}: Props) => {
  const {
    id: opportunityId,
    name,
    description,
    salesforceUrl,
    operations: { updateOpportunity: updateOpportunityOperation = undefined }
  } = opportunityDetails

  const updateOpportunityDisabled = !isOperationEnabled(
    updateOpportunityOperation
  )

  const { handleChange } = useOpportunityDetailsMutation(opportunityDetails)

  return [
    {
      key: 'name',
      label: 'Name',
      value: (
        <OpportunityDetailsName
          opportunityId={opportunityId}
          updateOpportunityDisabled={
            updateOpportunityDisabled || !!salesforceUrl
          }
          name={name}
          onChange={handleChange}
        />
      )
    },
    {
      key: 'description',
      label: 'Description',
      value: (
        <OpportunityDetailsDescription
          opportunityId={opportunityId}
          updateOpportunityDisabled={
            updateOpportunityDisabled || !!salesforceUrl
          }
          description={description}
          onChange={handleChange}
        />
      )
    }
  ]
}
