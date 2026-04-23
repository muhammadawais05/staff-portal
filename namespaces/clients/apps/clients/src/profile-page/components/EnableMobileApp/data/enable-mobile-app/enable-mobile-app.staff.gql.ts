import { useMutation, gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { EnableMobileAppDocument } from './enable-mobile-app.staff.gql.types'
import { MOBILE_APP_FRAGMENT } from '../../../../data/mobile-app-fragment'

export default gql`
  mutation EnableMobileApp($input: EnableMobileAppForClientInput!) {
    enableMobileAppForClient(input: $input) {
      client {
        id
        ...MobileAppFragment
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${MOBILE_APP_FRAGMENT}
`

export const useEnableMobileApp = () => useMutation(EnableMobileAppDocument)
