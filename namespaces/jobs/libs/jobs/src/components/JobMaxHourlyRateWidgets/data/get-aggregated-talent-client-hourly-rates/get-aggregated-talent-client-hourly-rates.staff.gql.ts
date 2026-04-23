import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetAggregatedTalentClientHourlyRatesDocument } from './get-aggregated-talent-client-hourly-rates.staff.gql.types'

export default gql`
  query GetAggregatedTalentClientHourlyRates(
    $verticalId: ID!
    $jobCommitment: EngagementCommitmentEnum!
    $requiredSkillIds: [ID!]!
  ) {
    rates1: aggregatedTalentClientHourlyRates(
      filter: {
        verticalId: $verticalId
        requiredSkillIds: $requiredSkillIds
        jobCommitment: $jobCommitment
        interval: 1
        min: 0
        max: 500
      }
    ) {
      nodes {
        from
        to
        count
      }
    }
    rates5: aggregatedTalentClientHourlyRates(
      filter: {
        verticalId: $verticalId
        requiredSkillIds: $requiredSkillIds
        jobCommitment: $jobCommitment
        interval: 5
        min: 0
        max: 500
      }
    ) {
      nodes {
        from
        to
        count
      }
    }
  }
`

export const useGetAggregatedTalentClientHourlyRates = ({
  verticalId,
  requiredSkillIds,
  jobCommitment,
  skip = false
}: {
  verticalId: string
  requiredSkillIds: string[]
  jobCommitment: EngagementCommitmentEnum
  skip?: boolean
}) => {
  const { data, error, loading, ...restOptions } = useQuery(
    GetAggregatedTalentClientHourlyRatesDocument,
    { variables: { verticalId, jobCommitment, requiredSkillIds }, skip }
  )

  return {
    data: {
      rates1: data?.rates1?.nodes,
      rates5: data?.rates5?.nodes
    },
    loading,
    error,
    ...restOptions
  }
}
