import { Operation } from '@staff-portal/graphql/staff'

import { isOperationHidden } from '../gql-operation'

interface Operations {
  [key: string]: Operation
}

const checkIfAllOperationsAreHidden = (operations: Operations): boolean =>
  Object.values(operations)
    // It's a workaround as __typename can be present as an operation field
    .filter(operation => Boolean(operation.callable))
    .every(operation => isOperationHidden(operation))

export default checkIfAllOperationsAreHidden
