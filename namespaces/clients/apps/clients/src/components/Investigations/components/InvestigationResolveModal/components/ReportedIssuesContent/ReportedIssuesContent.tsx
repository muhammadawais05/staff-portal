import React, { useMemo } from 'react'
import { Form, useField } from '@toptal/picasso-forms'
import { CurrencyInput } from '@staff-portal/forms'
import { stringListToOptions } from '@staff-portal/string'

import {
  getInitialAskLabel,
  getResolutionAmountLabel
} from '../../../../utils'
import { ISSUE_SOURCES } from '../../config'

const ReportedIssuesContent = () => {
  const {
    input: { value: paymentResolutionType }
  } = useField('paymentResolutionType')
  const issueSourcesOptions = useMemo(
    () => stringListToOptions(ISSUE_SOURCES),
    []
  )

  return (
    <>
      <Form.Select
        name='issueSource'
        label='Source of Issue'
        width='full'
        options={issueSourcesOptions}
        data-testid='InvestigationResolveModal-issueSource'
        required
      />
      <Form.Checkbox
        name='settlementAgreementSent'
        label='Settlement Agreement Sent?'
        width='full'
        data-testid='InvestigationResolveModal-settlementAgreementSent'
      />
      <Form.Checkbox
        name='lowValue'
        label='Low value'
        width='full'
        data-testid='InvestigationResolveModal-lowValue'
      />
      <Form.Checkbox
        name='invoicesAdjusted'
        label='Invoices adjusted'
        width='full'
        data-testid='InvestigationResolveModal-invoicesAdjusted'
      />
      <Form.Checkbox
        name='talentAtFault'
        label='Talent at fault'
        width='full'
        data-testid='InvestigationResolveModal-talentAtFault'
      />
      <Form.Checkbox
        name='talentPaymentsImpacted'
        label='Talent payments impacted'
        width='full'
        data-testid='InvestigationResolveModal-talentPaymentsImpacted'
      />
      <Form.RadioGroup
        name='paymentResolutionType'
        label='Payment Resolution'
        required
        horizontal
      >
        {/**
         * TODO: Replace with enum values
         * https://toptal-core.atlassian.net/browse/SPB-3117
         */}
        <Form.Radio label='Refund' value='Refund' />
        <Form.Radio label='Credit' value='Credit' />
        <Form.Radio label='Void' value='Void' />
      </Form.RadioGroup>
      <CurrencyInput
        name='initialRefund'
        label={getInitialAskLabel(paymentResolutionType)}
        width='full'
        allowDecimals
        data-testid='InvestigationResolveModal-initialRefund'
        required
      />
      <CurrencyInput
        name='refundProvided'
        label={getResolutionAmountLabel(paymentResolutionType)}
        width='full'
        allowDecimals
        data-testid='InvestigationResolveModal-refundProvided'
        required
      />
      <CurrencyInput
        name='netLoss'
        label='Net loss'
        width='full'
        allowDecimals
        data-testid='InvestigationResolveModal-netLoss'
      />
      <Form.Input
        name='supportTicketLink'
        label='Support ticket link'
        width='full'
        data-testid='InvestigationResolveModal-supportTicketLink'
      />
      <Form.Input
        name='slackChannelLink'
        label='Slack channel link'
        width='full'
        data-testid='InvestigationResolveModal-slackChannelLink'
      />
      <Form.Input
        name='talentNotes'
        label='Talent notes'
        width='full'
        rows={4}
        data-testid='InvestigationResolveModal-talentNotes'
        multiline
      />
    </>
  )
}

export default ReportedIssuesContent
