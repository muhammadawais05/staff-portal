import React from 'react'
import { JobStatus } from '@staff-portal/jobs'
import { camelCase } from 'lodash-es'
import { formatAmount } from '@toptal/picasso/utils'
import { InvoiceKind } from '@staff-portal/graphql/staff'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { formatDateFull } from '@staff-portal/billing/src/_lib/dateTime'
import i18n from '@staff-portal/billing/src/utils/i18n'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import CommercialDocumentStatus from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentStatus'
import InvoiceAmountWithColorAndTooltip from '@staff-portal/billing-widgets/src/modules/invoice/components/InvoiceAmountWithColorAndTooltip'

import { GetInvoiceDetailsTableQuery } from '../data/getInvoiceDetailsTable.graphql.types'
import { getInvoiceDuePeriodText } from '../../../utils'
import InvoiceUpdatePurchaseOrder from '../../InvoiceUpdatePurchaseOrder'

const baseStringKey = 'invoice:invoiceDetails'

// TODO: remove eslint complexity once poLinesExperiment has been released to production - https://toptal-core.atlassian.net/browse/BILL-2144
// eslint-disable-next-line complexity
const getDetailsTableItems = (
  invoice: Exclude<GetInvoiceDetailsTableQuery['node'], null | undefined>,
  poLinesEnabled = false
) => {
  const {
    cleanOutstandingAmount,
    consolidatedInvoice,
    createdOn,
    issueDate,
    dueDate,
    duePeriod,
    job,
    invoiceKind,
    originalAmount,
    subjectObject: subject,
    talent
  } = invoice
  const isConsolidatedInvoice = invoiceKind === InvoiceKind.CONSOLIDATED
  const isChildOfConsolidatedInvoice = !!consolidatedInvoice?.id
  const billingMethodName =
    subject?.preferredBillingOption?.billingMethod || 'unknown'
  const balanceData = { ...invoice, amount: cleanOutstandingAmount }
  const amountTitle = i18n.t(
    `${baseStringKey}.${
      isChildOfConsolidatedInvoice ? 'originalAmount' : 'amount'
    }`
  )
  const balanceTitle = i18n.t(
    `${baseStringKey}.${
      isChildOfConsolidatedInvoice ? 'consolidatedBalance' : 'balanceDue'
    }`
  )
  const isJobVisible = !isConsolidatedInvoice && !!job

  return [
    {
      label: i18n.t(`${baseStringKey}.invoiceFor`),
      value: (
        <WebResourceLinkWrapper
          webResource={subject?.webResource}
          weight='semibold'
          data-testid='InvoiceDetailsTableRow-invoiceFor-link'
          size='medium'
        />
      ),
      id: 'invoice'
    },
    {
      label: i18n.t(`${baseStringKey}.talent`),
      value: (
        <WebResourceLinkWrapper
          webResource={talent?.webResource}
          weight='semibold'
          data-testid='InvoiceDetailsTableRow-talent-link'
          size='medium'
        />
      ),
      hidden: !talent?.webResource.url,
      id: 'talent'
    },
    {
      label: i18n.t(`${baseStringKey}.engagement`),
      value: (
        <WebResourceLinkWrapper
          webResource={job?.webResource}
          weight='semibold'
          data-testid='InvoiceDetailsTableRow-engagement-link'
          size='medium'
        />
      ),
      // TODO: remove once poLinesExperiment has been released to production - https://toptal-core.atlassian.net/browse/BILL-2144
      hidden: !isJobVisible || poLinesEnabled,
      id: 'engagement'
    },
    {
      label: i18n.t(`${baseStringKey}.consolidatedInvoice`),
      value: (
        <WebResourceLinkWrapper
          webResource={consolidatedInvoice?.webResource}
          weight='semibold'
          data-testid='InvoiceDetailsTableRow-consolidatedInvoice-link'
          size='medium'
        />
      ),
      hidden: !consolidatedInvoice?.webResource?.url,
      id: 'consolidated'
    },
    {
      label: i18n.t(`${baseStringKey}.preferredBillingOption`),
      value: i18n.t(`paymentMethod:${camelCase(billingMethodName)}`),
      id: 'billing-option'
    },
    {
      label: amountTitle,
      value: formatAmount({ amount: originalAmount as string }),
      id: 'amount'
    },
    {
      label: balanceTitle,
      value: (
        <InvoiceAmountWithColorAndTooltip
          invoice={balanceData}
          weight='semibold'
          size='medium'
        />
      ),
      id: 'balance'
    },
    {
      label: i18n.t(`${baseStringKey}.status`),
      value: (
        <CommercialDocumentStatus
          data-testid='InvoiceDetailsTableRow-status-text'
          document={invoice}
          withDate
          size='medium'
        />
      ),
      id: 'status'
    },
    {
      label: i18n.t(`${baseStringKey}.jobStatus`),
      value: (
        <JobStatus
          // eslint-disable-next-line
          // @ts-ignore
          job={job}
          testId='InvoiceDetailsTableRow-jobStatus-text'
          size='medium'
        />
      ),
      hidden: !isJobVisible,
      id: 'job-status'
    },
    {
      label: i18n.t(`${baseStringKey}.purchaseOrder`),
      value: <InvoiceUpdatePurchaseOrder invoice={invoice} />,
      // TODO: remove once poLinesExperiment has been released to production - https://toptal-core.atlassian.net/browse/BILL-2144
      hidden: poLinesEnabled,
      id: 'purchase-order'
    },
    {
      label: i18n.t(`${baseStringKey}.createdOn`),
      value: createdOn ? formatDateFull(createdOn) : EMPTY_DATA,
      id: 'created'
    },
    {
      label: i18n.t(`${baseStringKey}.issueDate`),
      value: issueDate ? formatDateFull(issueDate) : EMPTY_DATA,
      id: 'issued'
    },
    {
      label: i18n.t(`${baseStringKey}.duePeriod`),
      value: getInvoiceDuePeriodText(duePeriod),
      id: 'due-period'
    },
    {
      label: i18n.t(`${baseStringKey}.dateDue`),
      value: dueDate ? formatDateFull(dueDate) : EMPTY_DATA,
      id: 'due-date'
    },
    {
      label: i18n.t(`${baseStringKey}.financeTeamMember`),
      value: subject?.financeTeamMember ? (
        <WebResourceLinkWrapper
          data-testid='InvoiceDetailsTableRow-financeTeamMember-link'
          defaultText={
            subject?.financeTeamMember?.webResource?.url
              ? subject?.financeTeamMember?.webResource?.text
              : i18n.t(`${baseStringKey}.unassigned`)
          }
          webResource={subject?.financeTeamMember?.webResource}
          weight='semibold'
          size='medium'
        />
      ) : (
        i18n.t(`${baseStringKey}.unassigned`)
      ),
      id: 'finance-member'
    }
  ]
}

export { getItemsAsPairs } from './getItemsAsPairs'

export default getDetailsTableItems
