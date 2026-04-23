import { gql } from '@apollo/client'

import { jobTemplateFragment } from '../../../../__fragments__/jobTemplateFragment.graphql'

export default gql`
  mutation UpdateJobTemplate($input: UpdateJobTemplateInput!) {
    updateJobTemplate(input: $input) {
      clientMutationId
      success
      errors {
        ...UserErrorFragment
      }
      jobTemplate {
        ...JobTemplateFragment
      }
    }
  }

  ${jobTemplateFragment}
`
