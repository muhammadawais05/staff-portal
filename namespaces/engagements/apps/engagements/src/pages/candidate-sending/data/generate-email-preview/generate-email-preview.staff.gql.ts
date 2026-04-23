import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation GenerateEmailPreview($attributes: NewEngagementWizardAttributes!) {
    generateEmailPreview(input: { attributes: $attributes }) {
      ...MutationResultFragment
      emailPreviewHtml
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
