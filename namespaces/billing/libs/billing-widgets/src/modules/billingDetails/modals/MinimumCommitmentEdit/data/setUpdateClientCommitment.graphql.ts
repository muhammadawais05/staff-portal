import gql from 'graphql-tag'

export default gql`
  mutation SetUpdateClientCommitment($input: UpdateClientCommitmentInput!) {
    updateClientCommitment(input: $input) {
      success
      errors {
        key
        code
        message
      }
      client {
        id
        commitmentSettings {
          minimumHours
        }
      }
    }
  }
`
