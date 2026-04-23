import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { TALENT_WORKLOAD_FRAGMENT } from '../../../../data'
import {
  UpdateTalentAllocatedHoursDocument,
  UpdateTalentAllocatedHoursMutation
} from './update-talent-allocated-hours.staff.gql.types'

export default gql`
  mutation UpdateTalentAllocatedHours($talentId: ID!, $allocatedHours: Int!) {
    updateTalentAllocatedHours(
      input: { talentId: $talentId, allocatedHours: $allocatedHours }
    ) {
      ...MutationResultFragment
      talent {
        id
        ...TalentWorkloadFragment
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${TALENT_WORKLOAD_FRAGMENT}
`

export const useUpdateTalentAllocatedHours = ({
  onCompleted
}: {
  onCompleted?: (data: UpdateTalentAllocatedHoursMutation) => void
}) =>
  useMutation(UpdateTalentAllocatedHoursDocument, {
    onCompleted
  })
