import { useCallback } from 'react'
import { gql, useMutation } from '@staff-portal/data-layer-service'
import { NewJobWizardAttributes } from '@staff-portal/graphql/staff'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { SubmitNewJobWizardDocument } from './create-job.staff.gql.types'

export default gql`
  mutation SubmitNewJobWizard($input: SubmitNewJobWizardInput!) {
    submitNewJobWizard(input: $input) {
      ...MutationResultFragment

      job {
        id
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useSubmitNewJobWizard = ({
  onError
}: {
  onError?: (error: Error) => void
}) => {
  const [createJob] = useMutation(SubmitNewJobWizardDocument, {
    onError
  })

  const submitNewJobWizard = useCallback(
    async (attributes: NewJobWizardAttributes) => {
      const { data } = await createJob({
        variables: {
          input: { attributes }
        }
      })

      return data
    },
    [createJob]
  )

  return {
    submitNewJobWizard
  }
}
