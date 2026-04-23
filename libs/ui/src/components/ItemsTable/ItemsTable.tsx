import React, { ReactNode, memo } from 'react'
import { Container, Table, TableProps } from '@toptal/picasso'

import * as S from './styles'

export interface Props<T> {
  data: T[]
  renderHeader?: () => ReactNode
  renderRow: (item: T, index: number) => ReactNode
  disabled?: boolean
  'aria-labelledby'?: string
  variant?: TableProps['variant']
}

const ItemsTable = <T,>({
  data,
  renderHeader,
  renderRow,
  disabled,
  variant = 'striped',
  'aria-labelledby': ariaLabelledBy
}: Props<T>) => (
  <Container data-testid='items-table' css={[disabled && S.disabled]}>
    <Table aria-labelledby={ariaLabelledBy} variant={variant}>
      {renderHeader && <Table.Head>{renderHeader()}</Table.Head>}
      <Table.Body>{data.map(renderRow)}</Table.Body>
    </Table>
  </Container>
)

export default memo(ItemsTable) as typeof ItemsTable
