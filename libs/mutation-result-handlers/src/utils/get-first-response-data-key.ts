export const getFirstResponseDataKey = <TMutationResponse>(
  responseData: TMutationResponse
): keyof TMutationResponse | undefined => {
  const keys = Object.keys(responseData ?? {}) as (keyof TMutationResponse)[]

  if (keys.length > 1) {
    throw new Error(
      `Mutation response data contains more than one key (${JSON.stringify(
        keys
      )}). ` + 'Provide "mutationResult" option to specify key to extract'
    )
  }

  return keys[0]
}
