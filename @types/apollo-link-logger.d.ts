declare module 'apollo-link-logger' {
  // eslint-disable-next-line import/no-extraneous-dependencies, no-restricted-imports
  import { ApolloLink } from '@apollo/client'

  declare const apolloLogger: ApolloLink
  export default apolloLogger
}
