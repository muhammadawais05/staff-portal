import { gql, useGetNode } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { JOB_EDIT_FRAGMENT } from '@staff-portal/jobs'

import { GetJobEditDocument } from './get-job-edit.staff.gql.types'

export default gql`
  query GetJobEdit($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        ...JobEditFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
  ${JOB_EDIT_FRAGMENT}
`

export const useGetJobEdit = (jobId: string) =>
  useGetNode(GetJobEditDocument)({ jobId })
