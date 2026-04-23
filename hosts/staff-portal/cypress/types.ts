import {} from 'styled-components/cssprop'

import { ResolversTypes as StaffResolversTypes } from '@staff-portal/graphql/staff'
import { ResolversTypes as LensResolversTypes } from '@staff-portal/graphql/lens'

export type StaffPortalMocks = {
  staffMocks?: Partial<StaffResolversTypes>
  lensMocks?: Partial<LensResolversTypes>
}

export type ArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => unknown
  ? A
  : never

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SubjectlessCommand<T extends (...args: any) => Cypress.Chainable> =
  T extends (subject: infer _I, ...args: infer P) => infer R
    ? (...args: P) => R
    : never

export type WithTypename<T> = T & { __typename: string }

export type FakeCall = (
  path: string,
  options?: RequestInit | undefined
) => Promise<Response>

type OperationFunctionValue = (args: {
  query: string
  variables: { [key: string]: unknown }
}) => object

export type OperationValue = object | OperationFunctionValue

export type RequestOperation = {
  operationName: string
  query: string
  variables: { [key: string]: unknown }
}
