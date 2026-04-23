import React from 'react'
import { useGetCallRequest } from '@staff-portal/clients-call-requests'

import CallRequestItemView from '../CallRequestItemView'
import CallRequestItemLoader from '../CallRequestItemLoader'
import { CallRequestModalName } from '../../../../enums'

interface Props {
  id: string
  modal: string
}

const CallRequestItem = ({ id, modal }: Props) => {
  const { data, loading } = useGetCallRequest(id)

  if (loading) {
    return <CallRequestItemLoader />
  }

  if (!data) {
    return null
  }

  return (
    <CallRequestItemView
      data={data}
      shouldShowClaimCallRequestModal={modal === CallRequestModalName.CLAIM}
    />
  )
}

export default CallRequestItem
