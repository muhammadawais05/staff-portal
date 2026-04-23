import { makeExecutableSchema } from '@graphql-tools/schema'
import { Resolvers } from '@staff-portal/graphql/staff'

import { staffSchemaMock } from '~integration/mocks/schemas/staff-schema-mock'

export default (schemaString: string) =>
  makeExecutableSchema({
    typeDefs: schemaString,
    resolvers: staffSchemaMock as Resolvers,
    inheritResolversFromInterfaces: true
  })
