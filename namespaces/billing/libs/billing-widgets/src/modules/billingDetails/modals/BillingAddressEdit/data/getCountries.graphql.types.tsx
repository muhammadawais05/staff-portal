/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetCountriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCountriesQuery = { countries: { nodes: Array<{ id: string, name: string }> } };


export const GetCountriesDocument = gql`
    query GetCountries {
  countries {
    nodes {
      id
      name
    }
  }
}
    `;

/**
 * __useGetCountriesQuery__
 *
 * To run a query within a React component, call `useGetCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCountriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCountriesQuery, GetCountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCountriesQuery, GetCountriesQueryVariables>(GetCountriesDocument, options);
      }
export function useGetCountriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCountriesQuery, GetCountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCountriesQuery, GetCountriesQueryVariables>(GetCountriesDocument, options);
        }
export type GetCountriesQueryHookResult = ReturnType<typeof useGetCountriesQuery>;
export type GetCountriesLazyQueryHookResult = ReturnType<typeof useGetCountriesLazyQuery>;
export type GetCountriesQueryResult = Apollo.QueryResult<GetCountriesQuery, GetCountriesQueryVariables>;