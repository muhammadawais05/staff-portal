import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const EMBEDDED_SIGNING_FRAGMENT = gql`
  fragment EmbeddedSigningFragment on Client {
    embeddedSigningEnabled
    operations {
      enableEmbeddedSigning {
        ...OperationFragment
      }
      disableEmbeddedSigning {
        ...OperationFragment
      }
    }
  }
  ${OPERATION_FRAGMENT}
`
