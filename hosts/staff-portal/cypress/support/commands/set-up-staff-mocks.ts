/* global cy */
import { addMocksToSchema } from '@graphql-tools/mock'
import { GraphQLSchema } from 'graphql'
import { addResolversToSchema } from '@graphql-tools/schema'
import { mergeResolvers } from '@graphql-tools/merge'
import { Resolvers as StaffResolvers } from '@staff-portal/graphql/staff'

import { getGraphQLHandler } from '~integration/utils'
import { staffSchemaMock } from '~integration/mocks/schemas/staff-schema-mock'
import { GATEWAY_SCHEMA_PATH } from '~integration/config'

const GATEWAY_PATH = `${GATEWAY_SCHEMA_PATH}*`

const scalarsMock = {
  Date: () => '2020-03-27T14:37:43.000Z',
  ISO8601DateTime: () => '2020-03-27T14:37:43.000Z',
  BigDecimal: () => 123456,
  GID: () => 'abcd',
  Time: () => '2020-03-27T14:37:43.000Z'
}

export const setUpStaffMocks = (schema: GraphQLSchema) => {
  let mockedStaffSchema = addMocksToSchema({
    schema,
    resolvers: staffSchemaMock,
    mocks: scalarsMock
  })

  cy.wrap({
    addResolversToSchema(newMocks: StaffResolvers) {
      mockedStaffSchema = addResolversToSchema({
        schema: mockedStaffSchema,
        resolvers: newMocks,
        updateResolversInPlace: true
      })
    },
    resetStaffMocks(newMocks: StaffResolvers = {}) {
      mockedStaffSchema = addMocksToSchema({
        schema,
        resolvers: mergeResolvers([staffSchemaMock, newMocks])
      })
    }
  }).as('staffSchema')

  cy.intercept(
    GATEWAY_PATH,
    getGraphQLHandler(() => mockedStaffSchema)
  )
}
