import React, { FC, memo, useRef } from 'react'
import { Section, Container } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { Notes } from '@staff-portal/notes'
import { ClientCumulativeStatus } from '@staff-portal/graphql/staff'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

import LogBillingInformationButton from '../LogBillingInformationButton'
import { useGetClientBillingInformationNotesQuery } from '../../data/getClientBillingInformationNotes.graphql.types'
import BillingInformationNotesSkeleton from './BillingInformationNotesSkeleton'

const displayName = 'BillingInformationNotes'

interface Props {
  companyId: string
}

const BillingInformationNotes: FC<Props> = memo(({ companyId }) => {
  const formContainerRef = useRef<HTMLDivElement>(null)
  const { t: translate } = useTranslation('billingInformationNotes')
  const {
    data: {
      billingInformationNotes,
      cumulativeStatus,
      fullName,
      operations
    } = {},
    loading,
    initialLoading,
    refetch
  } = useGetNode(useGetClientBillingInformationNotesQuery)({
    clientId: companyId
  })
  // TODO: https://toptal-core.atlassian.net/browse/BILL-1440
  // Bad type provided by codegen `Maybe` is not T | undefined rather than T | null
  const { nodes: notes = [] } = billingInformationNotes || {}

  const logButtonVariant =
    cumulativeStatus === ClientCumulativeStatus.APPLIED
      ? 'positive'
      : 'secondary'

  useRefetch(
    [
      ApolloContextEvents.billingInformationNoteCreate,
      ApolloContextEvents.billingInformationNoteEdit
    ],
    refetch
  )

  return (
    <Container top='medium'>
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<BillingInformationNotesSkeleton />}
      >
        <Section
          title={translate('title')}
          variant='withHeaderBar'
          actions={
            <OperationWrapper
              operation={operations?.logClientBillingInformation}
            >
              <LogBillingInformationButton
                clientId={companyId}
                clientName={fullName}
                formContainer={formContainerRef}
                variant={logButtonVariant}
              >
                {translate('actions.logBillingInfo')}
              </LogBillingInformationButton>
            </OperationWrapper>
          }
        >
          <div ref={formContainerRef} />
          <Notes
            commentRequired={false}
            editSubmitText={translate('actions.saveAsNewVersion')}
            notes={notes}
            notFoundMessage={translate('empty')}
            onUpdate={refetch}
            refetchNotes={refetch}
          />
        </Section>
      </ContentLoader>
    </Container>
  )
})

BillingInformationNotes.displayName = displayName

export default BillingInformationNotes
