import { Trans } from 'react-i18next'
import { camelCase } from 'lodash-es'
import React, { FC, memo } from 'react'
import { Typography } from '@toptal/picasso'
import { Engagement, InvoiceKind } from '@staff-portal/graphql/staff'
import { formatDateRange } from '@staff-portal/billing/src/_lib/dateTime'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import { InvoiceListItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/invoiceListItemFragment.graphql.types'

const displayName = 'InvoiceShortDescription'

interface Props {
  invoice: Pick<
    InvoiceListItemFragment,
    | 'talent'
    | 'job'
    | 'subjectObject'
    | 'originalBillingCycle'
    | 'range'
    | 'reason'
    | 'invoiceKind'
    | 'unconsolidated'
  >
}

interface GetLocalKey
  extends Pick<
    InvoiceListItemFragment,
    'job' | 'invoiceKind' | 'unconsolidated'
  > {
  placementFeesCount?: number
}

const getLocaleKey = ({
  invoiceKind,
  unconsolidated,
  job,
  placementFeesCount
}: GetLocalKey) => {
  const defaultKey = camelCase(invoiceKind)

  switch (invoiceKind) {
    case InvoiceKind.COMPANY_DEPOSIT: {
      return job ? 'companyDepositJob' : defaultKey
    }
    case InvoiceKind.PLACEMENT_FEE: {
      return placementFeesCount === 1
        ? 'placementFeeSingle'
        : 'placementFeeFraction'
    }
    case InvoiceKind.CONSOLIDATED: {
      return unconsolidated ? 'unconsolidated' : defaultKey
    }
    default:
      return camelCase(invoiceKind)
  }
}

const InvoiceShortDescription: FC<Props> = memo<Props>(
  ({
    invoice: {
      originalBillingCycle,
      talent,
      job,
      subjectObject,
      invoiceKind,
      unconsolidated,
      range,
      reason
    }
  }) => {
    const placementFeesCount = (reason as Engagement)?.placementFees?.totalCount
    const i18nKey = getLocaleKey({
      invoiceKind,
      unconsolidated,
      job,
      placementFeesCount
    })

    const shortDuration =
      originalBillingCycle?.startDate && originalBillingCycle?.endDate
        ? formatDateRange({
            end: originalBillingCycle.endDate,
            start: originalBillingCycle.startDate
          })
        : ''
    const dateRange =
      range?.till && range?.from
        ? formatDateRange({
            end: range?.till,
            start: range?.from
          })
        : ''

    const TalentComponent = (
      <WebResourceLinkWrapper
        data-testid={`${displayName}-talent`}
        inline
        key='talent'
        webResource={talent?.webResource}
      />
    )

    const JobComponent = (
      <WebResourceLinkWrapper
        data-testid={`${displayName}-job`}
        inline
        key='job'
        webResource={job?.webResource}
      />
    )
    const CompanyComponent = (
      <WebResourceLinkWrapper
        data-testid={`${displayName}-company`}
        inline
        key='company'
        webResource={subjectObject?.webResource}
      />
    )

    return (
      <Typography as='span' data-testid={`${displayName}-description`}>
        <Trans
          i18nKey={`invoice:shortDescription.${i18nKey}`}
          values={{
            company: subjectObject?.webResource?.text,
            dateRange,
            job: job?.webResource?.text,
            placementFeesCount,
            shortDuration,
            talent: talent?.webResource?.text
          }}
          components={[TalentComponent, JobComponent, CompanyComponent]}
        />
      </Typography>
    )
  }
)

InvoiceShortDescription.displayName = displayName

export default InvoiceShortDescription
