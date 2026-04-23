/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { RoleItem_CompanyRepresentative_Fragment, RoleItem_Leader_Fragment, RoleItem_ReferralPartner_Fragment, RoleItem_Staff_Fragment, RoleItem_Talent_Fragment, RoleItem_TalentPartner_Fragment } from './roleFragment.graphql.types';
import { WebResourceFragment } from '../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { OperationItemFragment } from '../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { gql } from '@apollo/client';
import { RoleItemFragmentDoc } from './roleFragment.graphql.types';
import { WebResourceFragmentDoc } from '../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { OperationItemFragmentDoc } from '../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
export type NoteCommonFragment = { comment?: Types.Maybe<string>, createdAt: `${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}` | '', id: string, newSalesCall: boolean, checklistSalesCall: boolean, screeningCall: boolean, title: string, updatedAt: `${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}` | '', creator?: Types.Maybe<{ fullName: string, id: string, email: string, webResource: WebResourceFragment } | (
    { webResource: WebResourceFragment }
    & RoleItem_CompanyRepresentative_Fragment
  ) | (
    { webResource: WebResourceFragment }
    & RoleItem_Leader_Fragment
  ) | (
    { webResource: WebResourceFragment }
    & RoleItem_ReferralPartner_Fragment
  ) | (
    { webResource: WebResourceFragment }
    & RoleItem_Staff_Fragment
  ) | (
    { webResource: WebResourceFragment }
    & RoleItem_Talent_Fragment
  ) | (
    { webResource: WebResourceFragment }
    & RoleItem_TalentPartner_Fragment
  )>, operations: { removeNote: OperationItemFragment, removeNoteAttachment: OperationItemFragment, updateNote: OperationItemFragment } };

export const NoteCommonFragmentDoc = gql`
    fragment NoteCommon on Note {
  comment
  createdAt
  creator {
    ...RoleItem
    ... on Client {
      fullName
      id
      email
    }
    ... on WebResource {
      webResource {
        ...WebResourceFragment
      }
    }
  }
  id
  newSalesCall
  checklistSalesCall
  operations {
    removeNote {
      ...OperationItem
    }
    removeNoteAttachment {
      ...OperationItem
    }
    updateNote {
      ...OperationItem
    }
  }
  screeningCall
  title
  updatedAt
}
    ${RoleItemFragmentDoc}
${WebResourceFragmentDoc}
${OperationItemFragmentDoc}`;