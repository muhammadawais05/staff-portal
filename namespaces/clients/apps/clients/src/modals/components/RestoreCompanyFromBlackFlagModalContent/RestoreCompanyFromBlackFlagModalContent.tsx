import { useQuery } from '@staff-portal/data-layer-service'
import { ModalSuspender } from '@staff-portal/modals-service'
import { Container, Typography } from '@toptal/picasso'
import React from 'react'

import { GetRestoreCompanyFromBlackFlagModalDataDocument } from './data'
import * as S from './styles'

type Props = {
  companyId: string
}

const RestoreCompanyFromBlackFlagModalContent = ({ companyId }: Props) => {
  const { data, loading } = useQuery(
    GetRestoreCompanyFromBlackFlagModalDataDocument,
    {
      variables: { clientId: companyId }
    }
  )

  if (loading) {
    return <ModalSuspender />
  }

  return (
    <Container bottom='medium'>
      <Typography size='medium'>
        The company was marked with a Black Flag and the following comment:
      </Typography>
      <Typography size='medium' css={S.italicComment}>
        {data?.node?.previousBlackFlagComment}
      </Typography>

      <Container top='medium'>
        <Typography size='medium'>
          Are you sure you want to restore{' '}
          <Typography as='span' weight='semibold'>
            {data?.node?.fullName}
          </Typography>{' '}
          from Black Flag status and return it to{' '}
          <Typography as='span' weight='semibold'>
            {data?.node?.previousStatus}
          </Typography>{' '}
          status?
        </Typography>
      </Container>
    </Container>
  )
}

export default RestoreCompanyFromBlackFlagModalContent
