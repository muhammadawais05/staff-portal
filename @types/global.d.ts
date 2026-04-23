import { Scalars } from '@staff-portal/graphql/staff'

declare module '*.graphql' {
  import { DocumentNode } from '@apollo/client'
  const Schema: DocumentNode

  export = Schema
}

declare global {
  interface Date {
    toISOString(): Scalars['Time']
  }
}
