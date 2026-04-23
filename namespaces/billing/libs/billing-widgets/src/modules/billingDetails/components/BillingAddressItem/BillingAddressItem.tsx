import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { ModalKey } from '@staff-portal/billing/src/@types/types'

import { GetClientBillingDetailsQuery } from '../../data/getClientBillingDetails.graphql.types'

const displayName = 'BillingAddressItem'

interface Props {
  enableEdit?: boolean
  client: Exclude<GetClientBillingDetailsQuery['node'], null | undefined>
}

export const BillingAddressItem: FC<Props> = memo(
  ({
    enableEdit = false,
    client: {
      billingAddress,
      billingName,
      billingCity,
      billingZip,
      billingState,
      billingCountry,
      id,
      operations: { updateClientBillingAddress }
    }
  }) => {
    const { t: translate } = useTranslation('common')
    const { handleOnOpenModal } = useModals()
    const handleEditBillingAddress = () => {
      handleOnOpenModal(ModalKey.billingAddressEdit, { nodeId: id })
    }
    const billingAddressConcatenated: string = [
      billingName,
      billingAddress,
      billingCity,
      billingState,
      billingCountry?.name,
      billingZip
    ]
      .filter(Boolean)
      .join(', ')

    return (
      <Container key='billingAddress' flex justifyContent='space-between'>
        <Typography size='medium' data-testid='BillingAddressItem-label'>
          {billingAddressConcatenated || EMPTY_DATA}
        </Typography>
        {enableEdit && (
          <OperationWrapper operation={updateClientBillingAddress}>
            <Button
              variant='secondary'
              data-testid={`${displayName}-billing-address-edit`}
              onClick={handleEditBillingAddress}
              size='small'
            >
              {translate('actions.edit')}
            </Button>
          </OperationWrapper>
        )}
      </Container>
    )
  }
)

BillingAddressItem.displayName = displayName

export default BillingAddressItem
