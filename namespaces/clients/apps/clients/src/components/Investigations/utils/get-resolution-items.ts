import { Investigation } from '@staff-portal/graphql/staff'

import { getInitialAskLabel } from './get-initial-ask-label'
import { getResolutionAmountLabel } from './get-resolution-amount-label'

const getYesOrNo = (condition?: boolean | null) =>
  typeof condition === 'boolean' ? (condition ? 'Yes' : 'No') : condition

type Value = string | undefined | null
type Options = { hasGap: boolean }

export const getResolutionItems = (data: Investigation['resolution']) => {
  const {
    resolution,
    issueSource,
    settlementAgreementSent,
    invoicesAdjusted,
    initialRefund,
    refundProvided,
    netLoss,
    supportTicketLink,
    slackChannelLink,
    comment,
    talentAtFault,
    talentPaymentsImpacted,
    talentNotes,
    lowValue,
    paymentResolutionType
  } = data || {}

  return [
    ['Resolution', resolution],
    ['Source of Issue', issueSource],
    ['Settlement Agreement Sent?', getYesOrNo(settlementAgreementSent)],
    ['Low value', getYesOrNo(lowValue)],
    ['Invoices adjusted', getYesOrNo(invoicesAdjusted)],
    ['Payment Resolution', paymentResolutionType],
    [
      paymentResolutionType ? getInitialAskLabel(paymentResolutionType) : '',
      initialRefund
    ],
    [
      paymentResolutionType
        ? getResolutionAmountLabel(paymentResolutionType)
        : '',
      refundProvided
    ],
    ['Net loss', netLoss],
    ['Support ticket link', supportTicketLink],
    ['Slack channel link', slackChannelLink],
    ['Comment', comment, { hasGap: true }],
    ['Talent at fault', getYesOrNo(talentAtFault)],
    ['Talent payments impacted', getYesOrNo(talentPaymentsImpacted)],
    ['Talent notes', talentNotes, { hasGap: true }]
  ].filter(([, value]) => value !== null && value !== undefined) as (
    | [string, Value]
    | [string, Value, Options]
  )[]
}
