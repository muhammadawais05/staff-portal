import React from 'react'
import { Table } from '@toptal/picasso'

import { tableCols } from '../../config'

const Header = () => {
  return (
    <Table.Head>
      <Table.Row>
        {tableCols.map(({ title, props }) => (
          <Table.Cell key={title} css={props?.css}>
            {title}
          </Table.Cell>
        ))}
      </Table.Row>
    </Table.Head>
  )
}

export default Header
