import React from 'react'
import { useTranslation } from 'react-i18next'
import { EmptyState, Section } from '@toptal/picasso'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import TableSkeleton from '@staff-portal/billing/src/components/TableSkeleton'
import * as OperationsHelper from '@staff-portal/billing/src/_lib/helpers/operations'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import { decodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import InlineSection from '@staff-portal/billing/src/components/InlineSection'

import ExtraExpensesAddInlineForm from '../ExtraExpensesAddInlineForm/ExtraExpensesAddInlineForm'
import Table from '../../../extraExpenses/components/Table/Table'
import { useGetExtraExpensesQuery } from '../../../extraExpenses/data/getExtraExpenses.graphql.types'

type Props = {
  engagementId: string
}

const displayName = 'BillingSettingsExtraExpenses'

const ExtraExpensesList = ({ engagementId }: Props) => {
  const id = decodeId({ id: engagementId, type: 'engagement' })
  const { t: translate } = useTranslation('extraExpenses')

  const { data, loading, refetch, initialLoading } = useGetNode(
    useGetExtraExpensesQuery
  )({
    id: engagementId
  })
  const canCreateExtraExpenses = OperationsHelper.isOperationEnabled({
    key: 'createExtraExpenses',
    operations: data?.extraExpenses?.operations
  })

  useRefetch(ApolloContextEvents.extraExpensesCreate, refetch)

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <Section variant='withHeaderBar' title={translate('Table.title')}>
          <TableSkeleton row={3} column={9} />
        </Section>
      }
    >
      <InlineSection
        showRevealButton={canCreateExtraExpenses}
        revealText={translate('AddModal.submit')}
        headerTitle={translate('Table.title')}
        data-testid={displayName}
        formElement={({ isOpenForm, onCloseForm }) => (
          <ExtraExpensesAddInlineForm
            isOpenInlineForm={isOpenForm}
            onCloseForm={onCloseForm}
            engagementId={id.toString()}
          />
        )}
      >
        {data?.extraExpenses?.nodes?.length ? (
          <Table data={data?.extraExpenses} />
        ) : (
          <EmptyState.Collection data-testid={`${displayName}-empty`}>
            {translate('Table.emptyTable')}
          </EmptyState.Collection>
        )}
      </InlineSection>
    </ContentLoader>
  )
}

ExtraExpensesList.displayName = displayName

export default ExtraExpensesList
