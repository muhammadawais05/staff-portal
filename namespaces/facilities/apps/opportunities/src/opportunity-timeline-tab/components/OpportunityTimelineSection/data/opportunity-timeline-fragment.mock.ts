import { encodeEntityId } from '@staff-portal/data-layer-service'

export const opportunityTimelineFragmentMock = {
  __typename: 'Opportunity',
  id: encodeEntityId('1', 'Opportunity'),
  enterprise: false,
  estimatedStartWorkDate: '2021-12-06',
  estimatedEndWorkDate: '2022-05-27',
  estimatedCloseDate: '2021-12-02',
  actualStartWorkDate: '2021-12-02',
  actualEndWorkDate: '2021-12-02',
  actualCloseDate: '2021-12-02'
} as const
