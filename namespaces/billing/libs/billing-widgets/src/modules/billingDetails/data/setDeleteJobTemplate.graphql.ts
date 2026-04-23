import gql from 'graphql-tag'

export default gql`
  mutation SetDeleteJobTemplate($input: DeleteJobTemplateInput!) {
    deleteJobTemplate(input: $input) {
      clientMutationId
      success
      errors {
        message
        code
        key
      }
    }
  }
`
