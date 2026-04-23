import React from 'react'
import { Link } from '@staff-portal/navigation'
import {
  TypographyOverflowLink,
  DetailedListItems,
  DetailedListRow
} from '@staff-portal/ui'
import { isOperationEnabled } from '@staff-portal/operations'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { NO_VALUE } from '@staff-portal/config'
import { formatAmount } from '@staff-portal/string'

import { OpportunityDetailsFragment } from '../data'
import OpportunityDetailsContract from '../components/OpportunityDetailsContract'
import OpportunityDetailsPoNumber from '../components/OpportunityDetailsPoNumber'
import OpportunityDetailsPoAmount from '../components/OpportunityDetailsPoAmount'
import OpportunityDetailsBudget from '../components/OpportunityDetailsBudget'
import OpportunityDetailsWorkType from '../components/OpportunityDetailsWorkType'
import OpportunityDetailsProbability from '../components/OpportunityDetailsProbability'
import OpportunityDetailsHighPriority from '../components/OpportunityDetailsHighPriority'
import OpportunityDetailsHighPriorityReason from '../components/OpportunityDetailsHighPriorityReason'
import { useOpportunityDetailsMutation } from './use-opportunity-details-mutation'
import OpportunityDetailsValue from '../components/OpportunityDetailsValue'

interface Props {
  opportunityDetails: OpportunityDetailsFragment
}

const EMPTY_ITEM = {} as DetailedListRow

// eslint-disable-next-line max-lines-per-function, max-statements, complexity
export const useOpportunityDetailItems = ({
  opportunityDetails
}: Props): DetailedListItems => {
  const {
    id: opportunityId,
    age,
    createdAt,
    client,
    committedRevenue,
    complete,
    completeOutcome,
    completeResult,
    completeReason,
    value: opportunityValue,
    probability,
    weightedValue,
    budget,
    poAmount,
    poNumber,
    workType,
    highPriority,
    highPriorityReason,
    salesforceUrl,
    salesforceId,
    enterprise,
    open: isOpen,
    operations: { updateOpportunity: updateOpportunityOperation = undefined }
  } = opportunityDetails
  const clientWebResource = client?.webResource
  const topLevelClientWebResource = client?.root?.webResource

  const updateOpportunityDisabled = !isOperationEnabled(
    updateOpportunityOperation
  )

  const { handleChange } = useOpportunityDetailsMutation(opportunityDetails)

  const formatDateTime = useUserDateFormatter()

  const salesforceField = {
    key: 'salesforceId',
    label: 'Salesforce Opportunity',
    value: salesforceUrl ? (
      <TypographyOverflowLink key='salesforceUrl'>
        <Link key='salesforceUrl' href={salesforceUrl}>
          {salesforceId}
        </Link>
      </TypographyOverflowLink>
    ) : (
      NO_VALUE
    )
  }

  const createdDateField = {
    key: 'createdAt',
    label: 'Created Date',
    value: formatDateTime(createdAt),
    colSpan: 2
  }

  const topLevelCompanyField = {
    key: 'topLevelCompany',
    label: 'Top-Level Company',
    value: topLevelClientWebResource?.url ? (
      <TypographyOverflowLink key='topLevelCompany'>
        <Link key='topLevelCompany' href={topLevelClientWebResource.url}>
          {topLevelClientWebResource.text}
        </Link>
      </TypographyOverflowLink>
    ) : (
      NO_VALUE
    )
  }

  const companyField = {
    key: 'company',
    label: 'Company',
    value: clientWebResource?.url ? (
      <TypographyOverflowLink key='company'>
        <Link key='company' href={clientWebResource.url}>
          {clientWebResource.text}
        </Link>
      </TypographyOverflowLink>
    ) : (
      NO_VALUE
    )
  }

  const committedRevenueField = {
    key: 'committedRevenue',
    label: 'Opportunity Committed Revenue',
    value: committedRevenue ? formatAmount(committedRevenue, 2) : NO_VALUE
  }

  const valueField = {
    key: 'value',
    label: 'Value',
    value: (
      <OpportunityDetailsValue
        opportunityId={opportunityId}
        disabled={updateOpportunityDisabled || !isOpen || !!salesforceUrl}
        value={opportunityValue}
        formattedValue={formatAmount(opportunityValue)}
        onChange={handleChange}
      />
    )
  }

  const weightedValueField = {
    key: 'weightedValue',
    label: 'Weighted Value',
    value: weightedValue ? formatAmount(weightedValue) : NO_VALUE
  }

  const completeOutcomeField = {
    key: 'completeOutcome',
    label: 'Completed Outcome',
    hidden: !complete,
    value: completeOutcome
  }

  const workTypeField = {
    key: 'workType',
    label: 'Work Type',
    value: (
      <OpportunityDetailsWorkType
        opportunityId={opportunityId}
        updateOpportunityDisabled={updateOpportunityDisabled}
        workType={workType}
        onChange={handleChange}
      />
    )
  }

  const ageField = {
    key: 'age',
    label: 'Age',
    value: `${age} days`
  }

  const probabilityField = {
    key: 'probability',
    label: 'Probability',
    value: (
      <OpportunityDetailsProbability
        opportunityId={opportunityId}
        disabled={updateOpportunityDisabled || !isOpen || !!salesforceUrl}
        probability={probability}
        onChange={handleChange}
      />
    )
  }

  const budgetField = {
    key: 'budget',
    label: 'Budget',
    value: (
      <OpportunityDetailsBudget
        opportunityId={opportunityId}
        disabled={updateOpportunityDisabled || !isOpen}
        budget={budget}
        formattedBudget={formatAmount(budget)}
        onChange={handleChange}
      />
    )
  }

  const poAmountField = {
    key: 'poAmount',
    label: 'PO Amount',
    value: (
      <OpportunityDetailsPoAmount
        opportunityId={opportunityId}
        disabled={updateOpportunityDisabled || !isOpen}
        poAmount={poAmount}
        formattedPoAmount={formatAmount(poAmount)}
        onChange={handleChange}
      />
    )
  }

  const poNumberField = {
    key: 'poNumber',
    label: 'PO Number',
    value: (
      <OpportunityDetailsPoNumber
        opportunityId={opportunityId}
        updateOpportunityDisabled={updateOpportunityDisabled}
        poNumber={poNumber}
        onChange={handleChange}
      />
    )
  }

  const completeReasonField = {
    key: 'completeReason',
    label: 'Completed Reason',
    hidden: !complete,
    value:
      (completeResult
        ? `${completeResult}: ${completeReason}`
        : completeReason) || NO_VALUE
  }

  const contractField = {
    key: 'contract',
    label: 'Contract',
    value: <OpportunityDetailsContract opportunity={opportunityDetails} />
  }

  const highPriorityField = {
    key: 'highPriority',
    label: 'High Priority',
    value: (
      <OpportunityDetailsHighPriority
        opportunityId={opportunityId}
        updateOpportunityDisabled={updateOpportunityDisabled || !!salesforceUrl}
        highPriority={highPriority}
        onChange={handleChange}
      />
    )
  }

  const highPriorityReasonField = {
    key: 'highPriorityReason',
    label: 'High Priority Reason',
    value: (
      <OpportunityDetailsHighPriorityReason
        opportunityId={opportunityId}
        updateOpportunityDisabled={updateOpportunityDisabled || !!salesforceUrl}
        highPriorityReason={highPriorityReason}
        onChange={handleChange}
      />
    )
  }

  if (enterprise) {
    return [
      salesforceField,
      createdDateField,
      topLevelCompanyField,
      committedRevenueField,
      valueField,
      weightedValueField,
      poAmountField,
      completeOutcomeField,
      contractField,
      highPriorityField,
      EMPTY_ITEM,
      ageField,
      companyField,
      EMPTY_ITEM,
      probabilityField,
      budgetField,
      poNumberField,
      completeReasonField,
      workTypeField,
      highPriorityReasonField
    ]
  }

  return [
    createdDateField,
    companyField,
    committedRevenueField,
    valueField,
    weightedValueField,
    completeOutcomeField,
    workTypeField,
    ageField,
    EMPTY_ITEM,
    EMPTY_ITEM,
    probabilityField,
    budgetField,
    completeReasonField
  ]
}
