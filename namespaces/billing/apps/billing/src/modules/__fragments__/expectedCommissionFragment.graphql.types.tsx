/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import {
  RoleType_CompanyRepresentative_Fragment,
  RoleType_Leader_Fragment,
  RoleType_ReferralPartner_Fragment,
  RoleType_Staff_Fragment,
  RoleType_Talent_Fragment,
  RoleType_TalentPartner_Fragment
} from '../../../../../libs/billing/src/__fragments__/roleTypeFragment.graphql.types'
import {
  ExpectedCommissionSubjectFragment_Client_,
  ExpectedCommissionSubjectFragment_CompanyRepresentative_,
  ExpectedCommissionSubjectFragment_Leader_,
  ExpectedCommissionSubjectFragment_ReferralPartner_,
  ExpectedCommissionSubjectFragment_Staff_,
  ExpectedCommissionSubjectFragment_Talent_,
  ExpectedCommissionSubjectFragment_TalentPartner_
} from './expectedCommissionSubjectFragment.graphql.types'
import {
  ReasonClientFragment,
  ReasonEngagementFragment,
  ReasonRoleStepFragment,
  ReasonTalentFragment,
  ReasonTalentPartnerFragment
} from '../../../../../libs/billing-widgets/src/modules/__fragments__/reasonFragments.graphql.types'
import { WebResourceFragment } from '../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { RoleTypeFragmentDoc } from '../../../../../libs/billing/src/__fragments__/roleTypeFragment.graphql.types'
import { ExpectedCommissionSubjectFragmentDoc } from './expectedCommissionSubjectFragment.graphql.types'
import {
  ReasonClientFragmentDoc,
  ReasonEngagementFragmentDoc,
  ReasonRoleStepFragmentDoc,
  ReasonTalentFragmentDoc,
  ReasonTalentPartnerFragmentDoc
} from '../../../../../libs/billing-widgets/src/modules/__fragments__/reasonFragments.graphql.types'
import { WebResourceFragmentDoc } from '../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
export type ExpectedCommissionFragment = {
  id: string
  amount: string
  expectedDate: `${`${number}-${number}-${number}`}` | ''
  status: Types.ExpectedCommissionStatus
  kind: Types.ExpectedCommissionKind
  reason:
    | ({ __typename: 'Client' } & ExpectedCommissionReasonFragment_Client_)
    | ({
        __typename: 'Engagement'
      } & ExpectedCommissionReasonFragment_Engagement_)
    | ({ __typename: 'RoleStep' } & ExpectedCommissionReasonFragment_RoleStep_)
    | ({ __typename: 'Talent' } & ExpectedCommissionReasonFragment_Talent_)
    | ({
        __typename: 'TalentPartner'
      } & ExpectedCommissionReasonFragment_TalentPartner_)
  subject:
    | ExpectedCommissionSubjectFragment_Client_
    | (RoleType_CompanyRepresentative_Fragment &
        ExpectedCommissionSubjectFragment_CompanyRepresentative_)
    | (RoleType_Leader_Fragment & ExpectedCommissionSubjectFragment_Leader_)
    | (RoleType_ReferralPartner_Fragment &
        ExpectedCommissionSubjectFragment_ReferralPartner_)
    | (RoleType_Staff_Fragment & ExpectedCommissionSubjectFragment_Staff_)
    | (RoleType_Talent_Fragment & ExpectedCommissionSubjectFragment_Talent_)
    | (RoleType_TalentPartner_Fragment &
        ExpectedCommissionSubjectFragment_TalentPartner_)
}

export type ExpectedCommissionReasonFragment_Client_ = ReasonClientFragment

export type ExpectedCommissionReasonFragment_Engagement_ = {
  client?: Types.Maybe<{ id: string; webResource: WebResourceFragment }>
  job?: Types.Maybe<{ id: string; webResource: WebResourceFragment }>
  talent?: Types.Maybe<{ id: string; webResource: WebResourceFragment }>
} & ReasonEngagementFragment

export type ExpectedCommissionReasonFragment_RoleStep_ = ReasonRoleStepFragment

export type ExpectedCommissionReasonFragment_Talent_ = {
  sourcedByTalentAcquisitionTeam?: Types.Maybe<boolean>
  roleType: string
} & ReasonTalentFragment

export type ExpectedCommissionReasonFragment_TalentPartner_ = {
  roleType: string
} & ReasonTalentPartnerFragment

export type ExpectedCommissionReasonFragment =
  | ExpectedCommissionReasonFragment_Client_
  | ExpectedCommissionReasonFragment_Engagement_
  | ExpectedCommissionReasonFragment_RoleStep_
  | ExpectedCommissionReasonFragment_Talent_
  | ExpectedCommissionReasonFragment_TalentPartner_

export const ExpectedCommissionReasonFragmentDoc = gql`
  fragment ExpectedCommissionReasonFragment on ExpectedCommissionReason {
    ... on Client {
      ...ReasonClient
    }
    ... on Engagement {
      ...ReasonEngagement
      client {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      job {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      talent {
        id
        webResource {
          ...WebResourceFragment
        }
      }
    }
    ... on RoleStep {
      ...ReasonRoleStep
    }
    ... on Talent {
      ...ReasonTalent
      roleType: type
      sourcedByTalentAcquisitionTeam
    }
    ... on TalentPartner {
      ...ReasonTalentPartner
      roleType: type
    }
  }
  ${ReasonClientFragmentDoc}
  ${ReasonEngagementFragmentDoc}
  ${WebResourceFragmentDoc}
  ${ReasonRoleStepFragmentDoc}
  ${ReasonTalentFragmentDoc}
  ${ReasonTalentPartnerFragmentDoc}
`
export const ExpectedCommissionFragmentDoc = gql`
  fragment ExpectedCommissionFragment on ExpectedCommission {
    id
    amount
    expectedDate
    status
    reason {
      __typename
      ...ExpectedCommissionReasonFragment
    }
    subject {
      ...RoleType
      ...ExpectedCommissionSubjectFragment
    }
    kind
  }
  ${ExpectedCommissionReasonFragmentDoc}
  ${RoleTypeFragmentDoc}
  ${ExpectedCommissionSubjectFragmentDoc}
`
