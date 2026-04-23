import { Typography, Table, Container } from '@toptal/picasso'
import { Calendar16, StarSolid16 } from '@toptal/picasso/Icon'
import React from 'react'
import { capitalize } from '@toptal/picasso/utils'

import * as S from './styles'

export type Props = {
  title: string
}

export const STARRED_GROUP_NAME = 'Starred'

const TaskGroupHeader = ({ title }: Props) => {
  return (
    <Table.Row css={S.groupHeader}>
      <Table.Cell colSpan={8}>
        <Container flex alignItems='center'>
          <Container right='xsmall'>
            {title === STARRED_GROUP_NAME ? <StarSolid16 /> : <Calendar16 />}
          </Container>

          <Typography size='xsmall' weight='semibold'>
            {capitalize(title)}
          </Typography>
        </Container>
      </Table.Cell>
    </Table.Row>
  )
}

export default TaskGroupHeader
