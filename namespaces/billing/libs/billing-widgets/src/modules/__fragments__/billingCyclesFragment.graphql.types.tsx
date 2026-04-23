/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { CommitmentFragment } from './commitmentFragment.graphql.types';
import { gql } from '@apollo/client';
import { CommitmentFragmentDoc } from './commitmentFragment.graphql.types';
export type BillingCyclesItemFragment = { gid: string, kind: Types.BillingCycleKind, startDate: `${`${number}-${number}-${number}`}` | '', endDate: `${`${number}-${number}-${number}`}` | '', hours: string, chargedHours: string, extraHours: string, status: Types.BillingCycleStatus, actualCommitment: CommitmentFragment, originalCommitment: CommitmentFragment };

export const BillingCyclesItemFragmentDoc = gql`
    fragment BillingCyclesItemFragment on BillingCycle {
  gid
  kind
  startDate
  endDate
  hours
  chargedHours
  extraHours
  status
  actualCommitment {
    ...CommitmentFragment
  }
  originalCommitment {
    ...CommitmentFragment
  }
}
    ${CommitmentFragmentDoc}`;