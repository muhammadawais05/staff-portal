import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { GetJobProjectDocument } from './get-job-project.staff.gql.types'

export default gql`
  query GetJobProject($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        projectType
        projectTeamInvolved
        projectSpecCompleteness
      }
    }
  }
`

export const useGetJobProject = (jobId: string) =>
  useGetNode(GetJobProjectDocument)({ jobId })
