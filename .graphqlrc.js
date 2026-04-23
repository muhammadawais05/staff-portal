const config = {
  projects: {
    StaffGateway: {
      schema: [
        './tmp-graphql/gateway_schema.graphql',
        './libs/graphql/extensions_staff.graphql'
      ],
      include: '**/*.*(staff.){gql,graphql}.{ts,tsx}',
      exclude: '**/*.lens.{gql,graphql}.{ts,tsx}'
    },
    LENS: {
      schema: [
        './tmp-graphql/lens_schema.graphql',
        './libs/graphql/extensions_lens.graphql'
      ],
      include: '**/*.lens.{gql,graphql}.{ts,tsx}'
    }
  }
}

module.exports = config
