import { gql } from '@apollo/client'

export default gql`
  mutation ChangeRoleReferrer($input: ChangeRoleReferrerInput!) {
    changeRoleReferrer(input: $input) {
      roleOrClient {
        ... on Talent {
          id
          fullName
          referrer {
            ... on Role {
              id
            }
          }
          ... on WebResource {
            webResource {
              ...WebResourceFragment
            }
          }
        }
        ... on TalentPartner {
          id
          fullName
          referrer {
            ... on Role {
              id
            }
          }
          ... on WebResource {
            webResource {
              ...WebResourceFragment
            }
          }
        }
        ... on Client {
          id
          fullName
          ... on WebResource {
            webResource {
              ...WebResourceFragment
            }
          }
        }
      }
      notice
      success
      errors {
        key
        message
        code
      }
    }
  }
`
