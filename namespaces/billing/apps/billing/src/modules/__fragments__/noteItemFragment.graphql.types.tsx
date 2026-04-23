/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { NoteCommonFragment } from '../../../../../libs/billing-widgets/src/modules/__fragments__/noteCommonFragment.graphql.types'
import { WebResourceFragment } from '../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { NoteCommonFragmentDoc } from '../../../../../libs/billing-widgets/src/modules/__fragments__/noteCommonFragment.graphql.types'
import { WebResourceFragmentDoc } from '../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
export type NoteItemFragment = {
  answers: {
    nodes: Array<{
      comment?: Types.Maybe<string>
      value?: Types.Maybe<Array<string>>
      question: { kind: Types.NoteQuestionKind; label: string }
    }>
  }
  attachment?: Types.Maybe<{
    identifier?: Types.Maybe<string>
    url: string
    webResource: WebResourceFragment
  }>
} & NoteCommonFragment

export const NoteItemFragmentDoc = gql`
  fragment NoteItem on Note {
    ...NoteCommon
    answers {
      nodes {
        comment
        question {
          kind
          label
        }
        value
      }
    }
    attachment {
      identifier
      url
      webResource {
        ...WebResourceFragment
      }
    }
  }
  ${NoteCommonFragmentDoc}
  ${WebResourceFragmentDoc}
`
