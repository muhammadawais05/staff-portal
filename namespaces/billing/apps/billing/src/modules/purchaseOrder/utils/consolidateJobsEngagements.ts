import { JobEngagementListItem } from '../../job/components/JobsList/JobsList'
import { GetJobListItemFragment } from '../../job/components/data/getJobListItemFragment.graphql.types'
import { GetEngagementListItemFragment } from '../../job/components/data/getEngagementListItemFragment.graphql.types'

export const consolidateJobsEngagements = (
  jobs: GetJobListItemFragment[],
  engagements: GetEngagementListItemFragment[],
  key: 'purchaseOrder' | 'purchaseOrderLine' = 'purchaseOrder'
) => {
  const consolidatedItems = [] as JobEngagementListItem[]

  jobs
    .filter(
      job =>
        !job.engagements?.nodes?.length ||
        !job.engagements?.nodes?.some(
          engagement => engagement[key]?.id === job[key]?.id
        )
    )
    .forEach(job =>
      consolidatedItems.push({ job, showJob: true, showEngagement: false })
    )

  engagements.forEach(engagement =>
    consolidatedItems.push({
      job: {
        ...engagement.job,
        engagements: { totalCount: 1, nodes: [engagement] }
      } as GetJobListItemFragment,
      showJob: engagement?.job?.[key]?.id === engagement[key]?.id,
      showEngagement: true
    })
  )

  return consolidatedItems
}
