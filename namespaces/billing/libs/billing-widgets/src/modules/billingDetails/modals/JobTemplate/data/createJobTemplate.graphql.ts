import { gql } from '@apollo/client'

import { jobTemplateFragment } from '../../../../__fragments__/jobTemplateFragment.graphql'

export default gql`
  mutation CreateJobTemplate($input: CreateJobTemplateInput!) {
    createJobTemplate(input: $input) {
      clientMutationId
      success
      errors {
        ...UserErrorFragment
      }
      client {
        jobTemplate {
          ...JobTemplateFragment
        }
      }
    }
  }

  ${jobTemplateFragment}
`
