import {
  GetJobTitleByEngagementDocument,
  GetJobTitleByEngagementQuery
} from '../../../data/getJobTitleByEngagement.graphql.types'

export const engagementQueryParamConfig = {
  query: GetJobTitleByEngagementDocument,
  entityType: 'Engagement',
  onDataReceived: (
    data: GetJobTitleByEngagementQuery | undefined,
    id: string
  ) => ({
    displayValue: data?.node?.job?.title || '',
    value: id
  })
}
