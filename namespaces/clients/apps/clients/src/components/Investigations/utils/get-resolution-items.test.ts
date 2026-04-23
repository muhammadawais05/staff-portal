import { Investigation } from '@staff-portal/graphql/staff'

import { investigationsDataMock } from '../data/get-investigations.mock'
import { getResolutionItems } from './get-resolution-items'

const getInitialAskLabelText = {}
const getResolutionAmountLabelText = {}

jest.mock('./get-initial-ask-label', () => ({
  getInitialAskLabel: () => getInitialAskLabelText
}))
jest.mock('./get-resolution-amount-label', () => ({
  getResolutionAmountLabel: () => getResolutionAmountLabelText
}))

describe('getResolutionItems', () => {
  it('returns all items', () => {
    const resolution = investigationsDataMock.investigations.nodes[1]
      .resolution as Investigation['resolution']
    const [
      resolutionField,
      issueSource,
      settlementAgreementSent,
      lowValue,
      invoicesAdjusted,
      paymentResolutionType,
      initialRefund,
      refundProvided,
      netLoss,
      supportTicketLink,
      slackChannelLink,
      comment,
      talentAtFault,
      talentPaymentsImpacted,
      talentNotes
    ] = getResolutionItems(resolution)

    expect(resolutionField).toEqual(['Resolution', resolution?.resolution])
    expect(issueSource).toEqual(['Source of Issue', resolution?.issueSource])
    expect(settlementAgreementSent).toEqual([
      'Settlement Agreement Sent?',
      'No'
    ])
    expect(lowValue).toEqual(['Low value', 'No'])
    expect(invoicesAdjusted).toEqual(['Invoices adjusted', 'Yes'])
    expect(paymentResolutionType).toEqual(['Payment Resolution', 'Credit'])
    expect(initialRefund).toEqual([
      getInitialAskLabelText,
      resolution?.initialRefund
    ])
    expect(refundProvided).toEqual([
      getResolutionAmountLabelText,
      resolution?.refundProvided
    ])
    expect(netLoss).toEqual(['Net loss', resolution?.netLoss])
    expect(supportTicketLink).toEqual([
      'Support ticket link',
      resolution?.supportTicketLink
    ])
    expect(slackChannelLink).toEqual([
      'Slack channel link',
      resolution?.slackChannelLink
    ])
    expect(comment).toEqual(['Comment', resolution?.comment, { hasGap: true }])
    expect(talentAtFault).toEqual(['Talent at fault', 'No'])
    expect(talentPaymentsImpacted).toEqual(['Talent payments impacted', 'No'])
    expect(talentNotes).toEqual([
      'Talent notes',
      resolution?.talentNotes,
      { hasGap: true }
    ])
  })

  it('omits missing items', () => {
    const [resolutionField] = getResolutionItems({ resolution: 'resolution' })

    expect(resolutionField).toEqual(['Resolution', 'resolution'])
  })
})
