/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { gql } from '@apollo/client';
export type CommitmentFragment = { availability: Types.CommitmentAvailability, availabilityHours: number, companyRate: string, talentRate: string, startDate: `${`${number}-${number}-${number}`}` | '' };

export const CommitmentFragmentDoc = gql`
    fragment CommitmentFragment on Commitment {
  availability
  availabilityHours
  companyRate
  talentRate
  startDate
}
    `;