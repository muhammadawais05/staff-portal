import { Container, ContainerProps, TypographyProps } from '@toptal/picasso'
import React, { useMemo } from 'react'
import {
  DetailedListItems,
  DetailedList,
  DetailedListRow
} from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'

export interface TaskCardLayoutContentProps
  extends Omit<ContainerProps, 'children'> {
  items: DetailedListItems
  oneColumn?: boolean
  typographySize?: TypographyProps['size']
  labelColumnWidth?: number
}

const TaskCardLayoutContent = ({
  items,
  oneColumn = false,
  typographySize = 'xsmall',
  labelColumnWidth,
  ...rest
}: TaskCardLayoutContentProps) => {
  const [itemList] = useMemo(() => {
    if (oneColumn) {
      return [items]
    }

    const firstColumn = [...items]
    const secondColumn = firstColumn.splice(-1 * Math.floor(items.length / 2))

    const twoColumnsList = [...Array(Math.ceil(items.length / 2))].map(
      (_, index) => [firstColumn[index], secondColumn[index]] as DetailedListRow
    )

    return [twoColumnsList]
  }, [oneColumn, items])

  return (
    <Container {...rest}>
      {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
      <DetailedList
        labelColumnWidth={labelColumnWidth || 6.5}
        leftItemSpacing={0}
        rightItemSpacing={0}
        itemPadding='xsmall'
        typographySize={typographySize}
        defaultValue={NO_VALUE}
        items={itemList}
      />
    </Container>
  )
}

export default TaskCardLayoutContent
