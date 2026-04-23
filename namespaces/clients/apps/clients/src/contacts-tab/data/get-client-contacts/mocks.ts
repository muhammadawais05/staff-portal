import {
  ClientRepresentativeFilter as RepresentativeFilter,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { OperationType } from '@staff-portal/operations'
import { RepresentativeFragment } from '@staff-portal/client-representatives'
import { createRepresentativeFragmentMock as mockRep } from '@staff-portal/client-representatives/src/mocks'

import {
  GetClientContactsQuery,
  GetClientContactsDocument
} from './get-client-contacts.staff.gql.types'

const createGetClientContactsQueryMock = (
  clientId = 'mock-id',
  partialRepresentatives?: Partial<RepresentativeFragment>[],
  hasChildren = false,
  operations: { [name: string]: OperationType } = {}
  // eslint-disable-next-line max-params
): GetClientContactsQuery => {
  const reps =
    partialRepresentatives?.map((rep, index) =>
      mockRep(
        index.toString(),
        {
          ...rep,
          timeZone: {
            __typename: 'TimeZone',
            name: '(UTC+03:00) Europe/Moscow',
            value: 'Europe/Moscow'
          }
        },
        clientId
      )
    ) || []

  return {
    node: {
      id: clientId,

      children: hasChildren
        ? { totalCount: 2, __typename: 'ClientChildrenConnection' }
        : null,

      operations: {
        createCompanyRepresentative: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },

        ...operations,
        ...{ __typename: 'ClientOperations' }
      },

      representatives: {
        nodes: [...reps],
        totalCount: reps.length,
        __typename: 'ClientRepresentativesConnection'
      },
      __typename: 'Client'
    }
  }
}

const defaultPagination = {
  offset: 0,
  limit: 25
}

const defaultFilter = {
  showDescendants: false
}

const createGetClientContactsMock = (
  {
    clientId = 'mock-id',
    operations = {},
    hasChildren = false,
    pagination = defaultPagination
  } = {},
  partialRepresentatives?: Partial<RepresentativeFragment>[],
  filter: RepresentativeFilter = defaultFilter
) => ({
  request: {
    query: GetClientContactsDocument,
    variables: { clientId, pagination, filter }
  },
  result: {
    data: createGetClientContactsQueryMock(
      clientId,
      partialRepresentatives,
      hasChildren,
      operations
    )
  }
})

const createGetClientContactsFailedMock = (
  clientId = 'mock-id',
  errorMessage?: string
): MockedResponse => ({
  request: {
    query: GetClientContactsDocument,
    variables: { clientId, pagination: defaultPagination }
  },
  error: new Error(errorMessage)
})

export { createGetClientContactsMock, createGetClientContactsFailedMock }
