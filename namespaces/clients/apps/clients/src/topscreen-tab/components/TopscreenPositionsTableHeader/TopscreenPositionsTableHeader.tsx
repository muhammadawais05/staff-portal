import React from 'react'
import { Table } from '@toptal/picasso'

import * as S from './styles'

export const topscreenPositionsColumns = [
  {
    title: 'Name'
  },
  {
    title: 'Status',
    props: {
      css: S.status
    }
  },
  {
    title: 'Actions',
    props: {
      css: S.actions
    }
  }
]

const TopscreenPositionsTableHeader = () => {
  return (
    <Table.Head>
      <Table.Row>
        {topscreenPositionsColumns.map(item => (
          <Table.Cell {...item.props} key={item.title} css={item.props?.css}>
            {item.title}
          </Table.Cell>
        ))}
      </Table.Row>
    </Table.Head>
  )
}

export default TopscreenPositionsTableHeader
