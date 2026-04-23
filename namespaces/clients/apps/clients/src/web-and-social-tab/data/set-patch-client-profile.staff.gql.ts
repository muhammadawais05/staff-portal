import { gql } from '@staff-portal/data-layer-service'

import { GET_IN_DEPTH_COMPANY_RESEARCH_CLIENT } from './get-in-depth-company-research-client-fragment.staff.gql'

export default gql`
  mutation SetPatchClientProfile($input: PatchClientProfileInput!) {
    patchClientProfile(input: $input) {
      client {
        ...GetInDepthCompanyResearchClient
      }
      success
      errors {
        code
        key
        message
      }
    }
  }

  ${GET_IN_DEPTH_COMPANY_RESEARCH_CLIENT}
`
