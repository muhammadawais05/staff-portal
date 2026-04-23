import React from 'react'
import { Container, Typography, EmptyState } from '@toptal/picasso'

import { FALLBACK_CLIENT_NAME } from '../../config'
import CallRequestListItemActions from '../../components/CallRequestListItemActions'
import CompanyCallRequestListItemContent from './components/CompanyCallRequestListItemContent'
import * as S from './styles'
import { CallRequestFragment } from '../../data/call-request-fragment'

interface Props {
  callbackRequests: CallRequestFragment[]
}

const NO_RESULTS_MESSAGE = 'Currently there are no call requests.'

const CompanyCallRequests = ({ callbackRequests }: Props) => {
  if (!callbackRequests.length) {
    return (
      <EmptyState.Collection data-testid='CompanyCallRequests-empty-message'>
        {NO_RESULTS_MESSAGE}
      </EmptyState.Collection>
    )
  }

  return (
    <Container
      top='xsmall'
      bottom='medium'
      data-testid='CompanyCallRequests-container'
    >
      {callbackRequests.map(data => (
        <Container
          top='medium'
          bottom='medium'
          key={data.id}
          css={S.itemWrapper}
        >
          <Container flex justifyContent='space-between'>
            <Typography
              variant='heading'
              size='small'
              data-testid='CompanyCallRequests-item-name'
            >
              {data.name || FALLBACK_CLIENT_NAME}
            </Typography>
            <CallRequestListItemActions data={data} />
          </Container>
          <Container top='small'>
            <CompanyCallRequestListItemContent data={data} />
          </Container>
        </Container>
      ))}
    </Container>
  )
}

export default CompanyCallRequests
