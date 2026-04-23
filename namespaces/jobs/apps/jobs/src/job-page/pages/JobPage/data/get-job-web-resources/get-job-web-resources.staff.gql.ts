import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { GetJobWebResourceDocument } from './get-job-web-resources.staff.gql.types'

export const GET_JOB_WEB_RESOURCE = gql`
  query GetJobWebResource($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        webResource {
          url
        }
      }
    }
  }
`

export const useGetJobWebResource = (jobId: string) =>
  useGetNode(GetJobWebResourceDocument)({ jobId })
