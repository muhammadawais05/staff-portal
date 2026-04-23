import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ResumeTalentApplicationDocument,
  ResumeTalentApplicationMutation
} from './resume-talent-application.staff.gql.types'

export const RESUME_TALENT_APPLICATION: typeof ResumeTalentApplicationDocument = gql`
  mutation ResumeTalentApplication($input: ResumeTalentApplicationInput!) {
    resumeTalentApplication(input: $input) {
      nextAction

      emailTemplate {
        id
      }

      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useResumeTalentApplication = ({
  onError,
  onCompleted
}: {
  onError: (error: Error) => void
  onCompleted?: (data: ResumeTalentApplicationMutation) => void
}) =>
  useMutation(RESUME_TALENT_APPLICATION, {
    onError,
    onCompleted
  })
