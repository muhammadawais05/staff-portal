import React, { FC, memo } from 'react'
import {
  Button,
  Plus16,
  EmptyState,
  Section,
  SectionProps
} from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import * as OperationsHelper from '@staff-portal/billing/src/_lib/helpers/operations'
import {
  ApolloContextEvents,
  ModalKey
} from '@staff-portal/billing/src/@types/types'
import { decodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import TableSkeleton from '@staff-portal/billing/src/components/TableSkeleton'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetExtraExpensesQuery } from '../../data/getExtraExpenses.graphql.types'
import Table from '../Table'
import * as S from './styles'

const displayName = 'ExtraExpenses'

interface Props {
  engagementId: string
  variant?: SectionProps['variant']
}

export const ExtraExpenses: FC<Props> = memo(
  ({ engagementId, variant = 'default' }) => {
    const id = decodeId({ id: engagementId, type: 'engagement' })
    const { t: translate } = useTranslation('extraExpenses')
    const { handleOnOpenModalWithUrlSearch } = useModals()
    const openAddExtraExpenseModal = () =>
      handleOnOpenModalWithUrlSearch(ModalKey.extraExpenseAdd, {
        engagementId: id.toString()
      })
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
          <Section title={translate('Table.title')} variant={variant}>
            <TableSkeleton row={3} column={9} />
          </Section>
        }
      >
        <Section
          variant={variant}
          title={translate('Table.title')}
          css={S.wrapper}
          actions={
            canCreateExtraExpenses && (
              <Button
                data-testid='extra-expenses-add'
                icon={<Plus16 />}
                onClick={openAddExtraExpenseModal}
                size='small'
              >
                {translate('AddModal.trigger')}
              </Button>
            )
          }
          data-testid={displayName}
        >
          {data?.extraExpenses?.nodes?.length ? (
            <Table data={data?.extraExpenses} />
          ) : (
            <EmptyState.Collection data-testid={`${displayName}-empty`}>
              {translate('Table.emptyTable')}
            </EmptyState.Collection>
          )}
        </Section>
      </ContentLoader>
    )
  }
)

ExtraExpenses.displayName = displayName

export default ExtraExpenses
