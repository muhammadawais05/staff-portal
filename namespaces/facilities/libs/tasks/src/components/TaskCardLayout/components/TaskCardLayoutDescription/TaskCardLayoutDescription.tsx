import { Container, ContainerProps, Typography } from '@toptal/picasso'
import React from 'react'

import * as S from './styles'

export interface TaskCardLayoutDescriptionProps extends ContainerProps {
  title: string
}

const TaskCardLayoutDescription = ({
  title,
  children,
  ...rest
}: TaskCardLayoutDescriptionProps) => {
  return (
    <Container direction='row' top='small' {...rest}>
      <Container css={S.taskCardLayoutDescriptionTitle}>
        <Typography size='medium' weight='semibold'>
          {title}
        </Typography>
      </Container>

      {children}
    </Container>
  )
}

export default TaskCardLayoutDescription
