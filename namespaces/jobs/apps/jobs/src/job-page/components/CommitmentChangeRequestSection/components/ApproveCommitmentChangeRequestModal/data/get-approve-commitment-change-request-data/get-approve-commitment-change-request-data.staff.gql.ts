import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { GetApproveCommitmentChangeRequestDataDocument } from './get-approve-commitment-change-request-data.staff.gql.types'

export default gql`
  query GetApproveCommitmentChangeRequestData($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        title
        pendingCommitmentChangeRequest {
          ...ApproveCommitmentChangeRequestDataFragment
        }
      }
    }
  }

  fragment ApproveCommitmentChangeRequestDataFragment on CommitmentChangeRequest {
    id
    changeDate
    originalCommitment
    newAvailability
    newExtraHoursEnabled
    engagement {
      ...ApproveCommitmentChangeRequestEngagementFragment
    }
  }

  fragment ApproveCommitmentChangeRequestEngagementFragment on Engagement {
    id
    companyFullTimeRate
    companyHourlyRate
    companyPartTimeRate
    talentFullTimeRate
    talentHourlyRate
    talentPartTimeRate
  }
`

export const useGetAproveCommitmentChangeRequestData = (jobId: string) =>
  useGetNode(GetApproveCommitmentChangeRequestDataDocument)({ jobId })
