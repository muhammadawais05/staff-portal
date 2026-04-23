import React, { memo, ReactNode, ReactElement } from 'react'
import { Table, Container } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { ErrorViewLayout } from '@staff-portal/error-handling'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'

import * as S from './styles'
import Skeleton from '../Skeleton'
import PaymentGroupPaymentsTableHeader from '../../../paymentGroup/components/PaymentGroupPaymentsTableHeader'

const displayName = 'ListTable'

interface Props {
  header: ReactNode
  body: ReactNode
  emptyMessage?: ReactElement | string
  emptyIcon?: ReactNode
  loading?: boolean
  initialLoading?: boolean
  fixedHeight?: string
  fixedWidth?: boolean
  top?: number
  bottom?: number
  rowsCount?: number
  columnsCount?: number
  skeletonComponent?: ReactElement
}

const ListTable = memo<Props>(
  ({
    fixedHeight = undefined,
    fixedWidth = true,
    top = 1.5,
    bottom = 2,
    rowsCount = 25,
    columnsCount = 6,
    body,
    header,
    emptyMessage,
    emptyIcon,
    loading = false,
    initialLoading = false,
    skeletonComponent = (
      <Skeleton.ListContent
        header={<PaymentGroupPaymentsTableHeader />}
        rowsCount={rowsCount}
        columnsCount={columnsCount}
      />
    )
  }: Props) => {
    const { t: translate } = useTranslation('common')

    if (!loading && (!body || (Array.isArray(body) && !body.length))) {
      if (typeof emptyMessage === 'string' || !emptyMessage) {
        return (
          <Container
            top={top}
            css={S.container(fixedHeight)}
            data-testid={`${displayName}-empty`}
          >
            <ErrorViewLayout
              icon={emptyIcon}
              header=''
              subHeader={emptyMessage || translate('table.empty.message')}
            ></ErrorViewLayout>
          </Container>
        )
      }

      return emptyMessage
    }

    return (
      <Container
        top={top}
        bottom={bottom}
        css={S.container(fixedHeight)}
        data-testid={`${displayName}-container`}
      >
        <ContentLoader
          loading={loading}
          showSkeleton={initialLoading}
          skeletonComponent={skeletonComponent}
        >
          <Table css={S.table(fixedWidth)}>
            {header}
            {body}
          </Table>
        </ContentLoader>
      </Container>
    )
  }
)

ListTable.displayName = displayName

export default ListTable
