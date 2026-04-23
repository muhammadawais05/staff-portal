import React, { FC, memo, ComponentProps, useMemo } from 'react'
import { SkeletonLoader } from '@toptal/picasso'

import DL, { generateDetailedListRows } from '../DetailedList'
import * as S from './styles'

export interface Props {
  items?: number
  columns?: ComponentProps<typeof DL>['columns']
  labelColumnWidth?: ComponentProps<typeof DL>['labelColumnWidth']
  hasHalfWidthItems?: ComponentProps<typeof DL>['hasHalfWidthItems']
  striped?: ComponentProps<typeof DL>['striped']
  divided?: ComponentProps<typeof DL>['divided']
  title?: string
  'data-testid'?: string
}

const DetailedListSkeleton: FC<Props> = memo(
  ({
    items = 3,
    columns = 2,
    labelColumnWidth = 9,
    hasHalfWidthItems,
    striped = true,
    divided = true,
    'data-testid': dataTestId
  }) => {
    const rows = useMemo(
      () => generateDetailedListRows([...new Array(items)], columns),
      [items, columns]
    )

    return (
      <DL
        data-testid={dataTestId}
        striped={striped}
        divided={divided}
        labelColumnWidth={labelColumnWidth}
        hasHalfWidthItems={hasHalfWidthItems}
      >
        {rows.map((rowItems, rowIndex) => (
          <DL.Row
            // eslint-disable-next-line react/no-array-index-key
            key={`skeleton-row-${rowIndex}`}
          >
            {rowItems.map((_, itemIndex) => (
              <DL.Item
                // eslint-disable-next-line react/no-array-index-key
                key={itemIndex}
                label={<SkeletonLoader.Typography css={S.valueHeight} />}
              >
                <SkeletonLoader.Typography css={S.valueHeight} />
              </DL.Item>
            ))}
          </DL.Row>
        ))}
      </DL>
    )
  }
)

export default DetailedListSkeleton
