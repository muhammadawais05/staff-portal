import { Container, Typography, ContainerProps } from '@toptal/picasso'
import React, { ReactNode } from 'react'
import { NO_VALUE } from '@staff-portal/config'

import * as S from './styles'

export interface Props extends Omit<ContainerProps, 'children'> {
  label: string
  value?: ReactNode
}

const InterviewContentItem = ({ label, value, ...props }: Props) => {
  return (
    <Container {...props}>
      <Typography size='xsmall' weight='semibold' color='dark-grey'>
        {label}
      </Typography>
      <Typography
        css={S.value}
        size='medium'
        color='black'
        data-testid='InterviewContentItem-value'
      >
        {value || NO_VALUE}
      </Typography>
    </Container>
  )
}

export default InterviewContentItem
