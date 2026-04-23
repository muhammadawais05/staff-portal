import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  UpdateTalentApplicantSkillsDocument,
  UpdateTalentApplicantSkillsMutation
} from './update-talent-applicant-skills.staff.gql.types'

export const UPDATE_TALENT_APPLICANT_SKILLS: typeof UpdateTalentApplicantSkillsDocument = gql`
  mutation UpdateTalentApplicantSkills(
    $input: UpdateTalentApplicantSkillsInput!
  ) {
    updateTalentApplicantSkills(input: $input) {
      talent {
        id
        applicantSkills {
          nodes {
            id
            name
          }
        }
      }

      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateTalentApplicantSkills = ({
  onCompleted
}: {
  onCompleted?: (data: UpdateTalentApplicantSkillsMutation) => void
}) =>
  useMutation(UPDATE_TALENT_APPLICANT_SKILLS, {
    onCompleted
  })
