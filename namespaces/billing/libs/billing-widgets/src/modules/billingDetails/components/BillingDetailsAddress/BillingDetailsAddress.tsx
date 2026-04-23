import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { DetailedList, SectionWithDetailedListSkeleton } from '@staff-portal/ui'
import { Section, Container } from '@toptal/picasso'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

import { useGetClientBillingDetailsQuery } from '../../data/getClientBillingDetails.graphql.types'
import BillingAddressItem from '../BillingAddressItem/BillingAddressItem'

interface Props {
  companyId: string
}

export const BillingDetailsAddress: FC<Props> = memo(({ companyId }) => {
  const { t: translate } = useTranslation(['billingDetails'])
  const { data, loading, initialLoading, refetch } =
    useGetClientBillingDetailsQuery({
      variables: { clientId: companyId }
    })

  useRefetch(ApolloContextEvents.billingAddressEdit, refetch)

  return (
    <Container top='medium'>
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <SectionWithDetailedListSkeleton
            title={translate('labels.billingAddress')}
            labelColumnWidth={12}
            striped
            columns={1}
            items={1}
          />
        }
      >
        <Section
          title={translate('billingDetails:labels.billingAddress')}
          variant='withHeaderBar'
        >
          <DetailedList striped labelColumnWidth={12}>
            <DetailedList.Row>
              <DetailedList.Item
                label={translate('billingDetails:labels.billingAddress')}
              >
                {data?.node && (
                  <BillingAddressItem
                    enableEdit
                    key='billingAddress'
                    client={data?.node}
                  />
                )}
              </DetailedList.Item>
            </DetailedList.Row>
          </DetailedList>
        </Section>
      </ContentLoader>
    </Container>
  )
})

export default BillingDetailsAddress
