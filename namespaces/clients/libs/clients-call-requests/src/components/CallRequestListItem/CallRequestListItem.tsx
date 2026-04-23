import React from 'react'
import { Container } from '@toptal/picasso'

import { CallRequestFragment } from '../../data/call-request-fragment'
import CallRequestListItemHeader from './components/CallRequestListItemHeader'
import CallRequestListItemContent from './components/CallRequestListItemContent'
import CallRequestListItemActions from '../CallRequestListItemActions'

export interface Props {
  data: CallRequestFragment
}

const CallRequestListItem = ({ data }: Props) => {
  const isObscure = data.obscureLead

  return (
    <Container data-testid='call-request-container'>
      <Container flex justifyContent='space-between' bottom='medium'>
        <CallRequestListItemHeader data={data} />
        <CallRequestListItemActions data={data} />
      </Container>
      <CallRequestListItemContent data={data} obscure={isObscure} />
    </Container>
  )
}

export default CallRequestListItem
