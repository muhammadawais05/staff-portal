import React, { useMemo } from 'react'
import { OpportunityTabUrlHash } from '@staff-portal/routes'

import { OpportunityDetailsTab } from '../../../../opportunity-details-tab'
import { OpportunityTimelineTab } from '../../../../opportunity-timeline-tab'
import { OpportunityAttributionTab } from '../../../../opportunity-attribution-tab'

export const useGetOpportunityTabs = (opportunityId: string) =>
  useMemo(
    () => [
      {
        label: 'Details',
        node: <OpportunityDetailsTab opportunityId={opportunityId} />,
        tabHash: OpportunityTabUrlHash.DETAILS
      },
      {
        label: 'Timeline',
        node: <OpportunityTimelineTab opportunityId={opportunityId} />,
        tabHash: OpportunityTabUrlHash.TIMELINE
      },
      {
        label: 'Contacts',
        node: <>Contacts</>,
        tabHash: OpportunityTabUrlHash.CONTACTS
      },
      {
        label: 'Attribution',
        node: <OpportunityAttributionTab opportunityId={opportunityId} />,
        tabHash: OpportunityTabUrlHash.ATTRIBUTION
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [opportunityId]
  )
