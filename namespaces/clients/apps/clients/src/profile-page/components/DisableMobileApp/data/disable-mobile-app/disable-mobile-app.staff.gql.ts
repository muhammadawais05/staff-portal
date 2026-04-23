import { useMutation, gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { DisableMobileAppDocument } from './disable-mobile-app.staff.gql.types'
import { MOBILE_APP_FRAGMENT } from '../../../../data/mobile-app-fragment'

export default gql`
  mutation DisableMobileApp($input: DisableMobileAppForClientInput!) {
    disableMobileAppForClient(input: $input) {
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

export const useDisableMobileApp = () => useMutation(DisableMobileAppDocument)
