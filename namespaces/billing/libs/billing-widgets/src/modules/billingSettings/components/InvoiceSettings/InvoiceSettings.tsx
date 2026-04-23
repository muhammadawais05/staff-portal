import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { isAuthorizationGqlError } from '@staff-portal/data-layer-service'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { useGetExperiments } from '@staff-portal/billing/src/data'
import { SectionWithDetailedListSkeleton } from '@staff-portal/ui'

import InvoiceSettingsDetailsTable from '../InvoiceSettingsDetailsTable'
import { useGetJob } from '../../data'
import { billingSettingsDataEvents } from '../../utils'

interface Props {
  jobId: string
}

const InvoiceSettings: FC<Props> = memo(({ jobId }) => {
  const {
    data,
    loading: jobLoading,
    initialLoading: jobInitialLoading,
    refetch,
    error
  } = useGetJob(jobId)
  // TODO: remove once poLinesExperiment has been released to production - https://toptal-core.atlassian.net/browse/BILL-2144
  const {
    data: experiments,
    loading: experimentsLoading,
    initialLoading: experimentsInitialLoading
  } = useGetExperiments()

  const { t: translate } = useTranslation('billingSettings')
  const poLinesEnabled = Boolean(experiments?.poLines?.enabled)
  const loading = experimentsLoading || jobLoading
  const initialLoading = experimentsInitialLoading || jobInitialLoading

  useRefetch(billingSettingsDataEvents, refetch)

  const canSeeInvoiceNote = !error?.graphQLErrors?.some(err =>
    isAuthorizationGqlError(err.extensions?.code)
  )

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <SectionWithDetailedListSkeleton
          title={translate('invoice.title')}
          labelColumnWidth={12}
          striped
          divided
          columns={1}
          items={4}
        />
      }
    >
      <InvoiceSettingsDetailsTable
        poLinesEnabled={poLinesEnabled}
        job={data}
        refetch={refetch}
        showInvoiceNote={canSeeInvoiceNote}
      />
    </ContentLoader>
  )
})

export default InvoiceSettings
