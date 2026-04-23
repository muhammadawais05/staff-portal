import { useMemo } from 'react'
import { Engagement, EngagementState } from '@staff-portal/graphql/staff'
import { gql, useQuery } from '@staff-portal/data-layer-service'
import { TALENT_PARTNER_FRAGMENT } from '@staff-portal/talents'
import { ENGAGEMENT_DETAILED_STATUS_FRAGMENT } from '@staff-portal/engagements'

import { GetJobTalentsDocument } from './get-job-talents.staff.gql.types'

export default gql`
  query GetJobTalents($jobId: ID!, $filter: JobEngagementFilter!) {
    node(id: $jobId) {
      ... on Job {
        id
        engagements(filter: $filter) {
          nodes {
            id
            talentHourlyRate
            companyHourlyRate
            ...EngagementDetailedStatusFragment

            talent {
              id
              fullName
              type
              profile {
                id
                website
              }
              photo {
                icon
              }
              contacts(filter: { type: COMMUNITY_SLACK }) {
                nodes {
                  id
                  webResource {
                    text
                    url
                  }
                }
              }
              webResource {
                text
                url
              }
              ...TalentPartnerFragment
            }
          }
        }
      }
    }
  }

  ${TALENT_PARTNER_FRAGMENT}
  ${ENGAGEMENT_DETAILED_STATUS_FRAGMENT}
`

export const useGetJobTalents = ({
  jobId,
  onlyHiredTalents
}: {
  jobId: string
  onlyHiredTalents: boolean
}) => {
  const { data, ...rest } = useQuery(GetJobTalentsDocument, {
    variables: {
      jobId,
      filter: onlyHiredTalents ? { state: EngagementState.CURRENT } : {}
    }
  })

  const metadata = useMemo(() => {
    if (!data?.node) {
      return
    }

    const {
      node: { engagements }
    } = data

    return engagements?.nodes as Engagement[]
  }, [data])

  return { data: metadata, ...rest }
}
