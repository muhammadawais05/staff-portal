import { graphql, GraphQLSchema } from 'graphql'
import { CyHttpMessages } from 'cypress/types/net-stubbing'

const getGraphQLHandler = (getSchema: () => GraphQLSchema) => {
  return async (req: CyHttpMessages.IncomingHttpRequest) => {
    const schema = getSchema()

    if (!schema) {
      throw new Error(`schema is not ready yet for ${JSON.stringify(req.body)}`)
    }

    // if batching
    if (Array.isArray(req.body)) {
      return Promise.all(
        req.body.map(({ operationName, variables, query }) => {
          return graphql(schema, query, null, null, variables, operationName)
        })
      ).then(results => {
        return req.reply(results)
      })
    }

    // else default
    const { operationName, variables, query } = req.body

    return graphql(schema, query, null, null, variables, operationName).then(
      results => req.reply(results)
    )
  }
}

export default getGraphQLHandler
