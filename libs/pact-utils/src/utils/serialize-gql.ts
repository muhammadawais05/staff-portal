import { DocumentNode } from '@staff-portal/data-layer-service'
import { print } from 'graphql/language/printer'

import { getApolloClientCache } from './get-apollo-client-cache'

export const serializeGQL = (query: DocumentNode) =>
  print(getApolloClientCache().transformDocument(query))
