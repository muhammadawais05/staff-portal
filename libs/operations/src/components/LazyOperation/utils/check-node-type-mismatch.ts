import {
  GetLazyOperationQuery,
  GetLazyOperationVariables
} from '../data/get-lazy-operation'

const checkNodeTypeMismatch = (
  data: GetLazyOperationQuery,
  getLazyOperationVariables: GetLazyOperationVariables
) => {
  if (data.node && !data.node.operations) {
    const { nodeId, nodeType } = getLazyOperationVariables

    throw new Error(
      `Lazy Operation type mismatch: node ${nodeId} is not of type ${nodeType}`
    )
  }
}

export default checkNodeTypeMismatch
