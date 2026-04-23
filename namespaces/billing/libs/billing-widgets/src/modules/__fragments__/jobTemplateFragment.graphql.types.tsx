/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { OperationItemFragment } from '../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { gql } from '@apollo/client';
import { OperationItemFragmentDoc } from '../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
export type JobTemplateFragment = { billCycle?: Types.Maybe<Types.BillCycle>, billDay?: Types.Maybe<Types.WeekDay>, commitment?: Types.Maybe<Types.JobCommitment>, id: string, operations: { updateJobTemplate: OperationItemFragment, deleteJobTemplate: OperationItemFragment } };

export const JobTemplateFragmentDoc = gql`
    fragment JobTemplateFragment on JobTemplate {
  billCycle
  billDay
  commitment
  id
  operations {
    updateJobTemplate {
      ...OperationItem
    }
    deleteJobTemplate {
      ...OperationItem
    }
  }
}
    ${OperationItemFragmentDoc}`;