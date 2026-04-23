import React from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Container, SkeletonLoader } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'

const InvoiceDetailsTableSkeleton = () => {
  const { t: translate } = useTranslation('invoice')

  return (
    <Section title={translate('invoiceDetails.subtitle')}>
      {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
      <DetailedList
        striped
        labelColumnWidth={8}
        columns={2}
        items={[
          {
            label: translate('invoiceDetails.invoiceFor') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('invoiceDetails.talent') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('invoiceDetails.engagement') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('invoiceDetails.consolidatedInvoice') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('invoiceDetails.preferredBillingOption') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('invoiceDetails.amount') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('invoiceDetails.balanceDue') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('invoiceDetails.status') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('invoiceDetails.jobStatus') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('invoiceDetails.createdOn') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('invoiceDetails.issueDate') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('invoiceDetails.duePeriod') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('invoiceDetails.dateDue') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('invoiceDetails.purchaseOrder') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('invoiceDetails.financeTeamMember') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('invoiceDetails.unassigned') as string,
            value: <SkeletonLoader.Typography />
          }
        ]}
      />
      <Container bottom='medium' top='xsmall'>
        <SkeletonLoader.Typography rows={2} />
      </Container>
    </Section>
  )
}

export default {
  InvoiceDetailsTableSkeleton
}
