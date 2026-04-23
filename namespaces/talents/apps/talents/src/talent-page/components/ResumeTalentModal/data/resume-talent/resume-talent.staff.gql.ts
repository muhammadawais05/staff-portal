import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ResumeTalentDocument,
  ResumeTalentMutation
} from './resume-talent.staff.gql.types'

export const RESUME_TALENT: typeof ResumeTalentDocument = gql`
  mutation ResumeTalent($talentId: ID!, $comment: String!) {
    resumeTalent(input: { talentId: $talentId, comment: $comment }) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useResumeTalent = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: ResumeTalentMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(RESUME_TALENT, {
    onCompleted,
    onError
  })
