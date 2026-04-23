import React from 'react'
import {
  EmptyState,
  Section,
  Amount,
  Archive16,
  Container,
  Table,
  Tooltip
} from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { isNotNullish } from '@staff-portal/utils'

import { useGetPurchaseOrderLinesDetails } from '../../../../data'
import PurchaseOrdersLinesTableHeader from '../../../../../../modules/purchaseOrder/components/PurchaseOrdersLinesTableHeader'
import Skeleton from './skeleton'
import * as S from './styles'

const displayName = 'PurchaseOrderLinesTable'

interface PurchaseOrderDetailsTableProps {
  purchaseOrderId: string
}

export const PurchaseOrderLinesTable = ({
  purchaseOrderId
}: PurchaseOrderDetailsTableProps) => {
  const { t: translate } = useTranslation('purchaseOrder')
  const { data, initialLoading, loading, refetch } =
    useGetPurchaseOrderLinesDetails(purchaseOrderId)

  useRefetch(ApolloContextEvents.purchaseOrderUpdate, refetch)

  return (
    <Section
      title={translate('purchaseOrderLines.title')}
      data-testid={displayName}
    >
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<Skeleton />}
      >
        {data?.purchaseOrderLines?.nodes?.length > 0 ? (
          <Table>
            <PurchaseOrdersLinesTableHeader />
            <Table.Body>
              {data?.purchaseOrderLines?.nodes?.map(
                (
                  {
                    archived,
                    id,
                    webResource,
                    invoicedAmount,
                    totalAmount,
                    draftedAmount
                  },
                  index
                ) => (
                  <Table.Row key={id} stripeEven={Boolean(index % 2)}>
                    <Table.Cell>
                      <Container flex>
                        <WebResourceLinkWrapper webResource={webResource} />
                        {archived && (
                          <Tooltip
                            content={translate('purchaseOrderLines.archived')}
                          >
                            <Container inline css={S.clickable}>
                              <Archive16 data-testid='archived' />
                            </Container>
                          </Tooltip>
                        )}
                      </Container>
                    </Table.Cell>
                    <Table.Cell data-testid='total-amount'>
                      {isNotNullish(totalAmount) ? (
                        <Amount amount={totalAmount} />
                      ) : (
                        EMPTY_DATA
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Amount amount={invoicedAmount ?? 0} />
                    </Table.Cell>
                    <Table.Cell>
                      <Amount amount={draftedAmount} />
                    </Table.Cell>
                  </Table.Row>
                )
              )}
            </Table.Body>
          </Table>
        ) : (
          <EmptyState.Collection data-testid={`${displayName}-empty`}>
            {translate('purchaseOrderLines.empty')}
          </EmptyState.Collection>
        )}
      </ContentLoader>
    </Section>
  )
}

PurchaseOrderLinesTable.displayName = displayName

export default PurchaseOrderLinesTable
