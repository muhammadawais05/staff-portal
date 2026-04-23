import React from 'react'
import {
  queryStringToObject,
  useLocation,
  useParams
} from '@staff-portal/navigation'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { ContentWrapper } from '@staff-portal/page-wrapper'

import CallRequestItem from './components/CallRequestItem'

type QueryParams = {
  modal?: string
}

const CallRequest = () => {
  const { id } = useParams<{ id: string }>()
  const encodedId = encodeEntityId(id, 'CallbackRequest')

  const { search } = useLocation()
  const queryParams: QueryParams = queryStringToObject(search)
  const { modal = '' } = queryParams

  return (
    <ContentWrapper title='Call Request'>
      <CallRequestItem id={encodedId} modal={modal} />
    </ContentWrapper>
  )
}

export default CallRequest
