/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type InvoicesListFiltersQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type InvoicesListFiltersQuery = {
  companyClientPartners: { nodes: Array<RolesFullNameAndId_Staff_Fragment> }
  companyClaimers: { nodes: Array<RolesFullNameAndId_Staff_Fragment> }
  companyFinanceTeamMembers: { nodes: Array<RolesFullNameAndId_Staff_Fragment> }
  companySmbProjectRelationshipManagers: {
    nodes: Array<RolesFullNameAndId_Staff_Fragment>
  }
  companySmbProjectSalesSpecialists: {
    nodes: Array<RolesFullNameAndId_Staff_Fragment>
  }
  companySmbAccountManagers: { nodes: Array<RolesFullNameAndId_Staff_Fragment> }
  opportunitySmbRelationshipManagers: {
    nodes: Array<RolesFullNameAndId_Staff_Fragment>
  }
  talentMatchers: { nodes: Array<RolesFullNameAndId_Staff_Fragment> }
  jobClaimers: { nodes: Array<RolesFullNameAndId_Staff_Fragment> }
}

export type RolesFullNameAndId_CompanyRepresentative_Fragment = {
  __typename: 'CompanyRepresentative'
  id: string
  fullName: string
}

export type RolesFullNameAndId_Leader_Fragment = {
  __typename: 'Leader'
  id: string
  fullName: string
}

export type RolesFullNameAndId_ReferralPartner_Fragment = {
  __typename: 'ReferralPartner'
  id: string
  fullName: string
}

export type RolesFullNameAndId_Staff_Fragment = {
  __typename: 'Staff'
  id: string
  fullName: string
}

export type RolesFullNameAndId_Talent_Fragment = {
  __typename: 'Talent'
  id: string
  fullName: string
}

export type RolesFullNameAndId_TalentPartner_Fragment = {
  __typename: 'TalentPartner'
  id: string
  fullName: string
}

export type RolesFullNameAndIdFragment =
  | RolesFullNameAndId_CompanyRepresentative_Fragment
  | RolesFullNameAndId_Leader_Fragment
  | RolesFullNameAndId_ReferralPartner_Fragment
  | RolesFullNameAndId_Staff_Fragment
  | RolesFullNameAndId_Talent_Fragment
  | RolesFullNameAndId_TalentPartner_Fragment

export const RolesFullNameAndIdFragmentDoc = gql`
  fragment RolesFullNameAndId on Role {
    __typename
    id
    fullName
  }
`
export const InvoicesListFiltersDocument = gql`
  query InvoicesListFilters {
    companyClientPartners: roles(filter: { scope: COMPANY_CLIENT_PARTNERS }) {
      nodes {
        ...RolesFullNameAndId
      }
    }
    companyClaimers: roles(filter: { scope: COMPANY_CLAIMERS }) {
      nodes {
        ...RolesFullNameAndId
      }
    }
    companyFinanceTeamMembers: roles(
      filter: { scope: COMPANY_FINANCE_TEAM_MEMBERS }
    ) {
      nodes {
        ...RolesFullNameAndId
      }
    }
    companySmbProjectRelationshipManagers: roles(
      filter: { scope: COMPANY_SMB_PROJECT_RELATIONSHIP_MANAGERS }
    ) {
      nodes {
        ...RolesFullNameAndId
      }
    }
    companySmbProjectSalesSpecialists: roles(
      filter: { scope: COMPANY_SMB_PROJECT_SALES_SPECIALISTS }
    ) {
      nodes {
        ...RolesFullNameAndId
      }
    }
    companySmbAccountManagers: roles(
      filter: { scope: OPPORTUNITY_SMB_ACCOUNT_MANAGERS }
    ) {
      nodes {
        ...RolesFullNameAndId
      }
    }
    opportunitySmbRelationshipManagers: roles(
      filter: { scope: OPPORTUNITY_SMB_RELATIONSHIP_MANAGERS }
    ) {
      nodes {
        ...RolesFullNameAndId
      }
    }
    talentMatchers: roles(filter: { scope: TALENT_MATCHERS }) {
      nodes {
        ...RolesFullNameAndId
      }
    }
    jobClaimers: roles(filter: { scope: JOB_CLAIMERS }) {
      nodes {
        ...RolesFullNameAndId
      }
    }
  }
  ${RolesFullNameAndIdFragmentDoc}
`

/**
 * __useInvoicesListFiltersQuery__
 *
 * To run a query within a React component, call `useInvoicesListFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoicesListFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoicesListFiltersQuery({
 *   variables: {
 *   },
 * });
 */
export function useInvoicesListFiltersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    InvoicesListFiltersQuery,
    InvoicesListFiltersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    InvoicesListFiltersQuery,
    InvoicesListFiltersQueryVariables
  >(InvoicesListFiltersDocument, options)
}
export function useInvoicesListFiltersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    InvoicesListFiltersQuery,
    InvoicesListFiltersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    InvoicesListFiltersQuery,
    InvoicesListFiltersQueryVariables
  >(InvoicesListFiltersDocument, options)
}
export type InvoicesListFiltersQueryHookResult = ReturnType<
  typeof useInvoicesListFiltersQuery
>
export type InvoicesListFiltersLazyQueryHookResult = ReturnType<
  typeof useInvoicesListFiltersLazyQuery
>
export type InvoicesListFiltersQueryResult = Apollo.QueryResult<
  InvoicesListFiltersQuery,
  InvoicesListFiltersQueryVariables
>
