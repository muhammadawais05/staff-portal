import React from 'react'
import { Maybe } from '@staff-portal/graphql/staff'
import { StatusMessageNotification } from '@staff-portal/ui'

interface Props {
  salesforceId: Maybe<string> | undefined
}

export const OpportunitySalesforceConnectionPopup = ({
  salesforceId
}: Props) => {
  if (!salesforceId) {
    return null
  }

  return (
    <StatusMessageNotification variant='yellow'>
      This opportunity was created in Salesforce. Certain fields cannot be
      edited in the platform and should be edited using Salesforce.
    </StatusMessageNotification>
  )
}

export default OpportunitySalesforceConnectionPopup
