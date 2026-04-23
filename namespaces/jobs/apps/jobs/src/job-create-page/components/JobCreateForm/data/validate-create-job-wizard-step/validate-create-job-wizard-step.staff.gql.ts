import { useCallback } from 'react'
import { gql, useApolloClient } from '@staff-portal/data-layer-service'
import {
  NewJobWizardAttributes,
  NewJobWizardStep,
  UserError
} from '@staff-portal/graphql/staff'

import { GetValidateCreateJobWizardStepDocument } from './validate-create-job-wizard-step.staff.gql.types'

export default gql`
  query GetValidateCreateJobWizardStep(
    $attributes: NewJobWizardAttributes!
    $step: NewJobWizardStep!
  ) {
    newJobWizard(attributes: $attributes, step: $step) {
      errors {
        key
        code
        message
      }
    }
  }
`

export const useValidateWizardStep = () => {
  const apolloClient = useApolloClient()

  const validateStep = useCallback(
    async (attributes: NewJobWizardAttributes, step: NewJobWizardStep) => {
      const { data } = await apolloClient.query({
        query: GetValidateCreateJobWizardStepDocument,
        variables: { attributes, step }
      })

      return {
        success: !data.newJobWizard?.errors.length,
        errors: (data.newJobWizard?.errors ?? []) as UserError[]
      }
    },
    [apolloClient]
  )

  return { validateStep }
}
