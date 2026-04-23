import React, { FC, ReactNode } from 'react'
import { Container, SpacingType } from '@toptal/picasso'

import DetailedListItemComponent from './components/DetailedListItem'
import DetailedListRowComponent from './components/DetailedListRow'
import { DetailedListContext } from './DetailedListContext'
import {
  DetailedListItem,
  DetailedListItems,
  DetailedListValueViewOptions
} from './types'
import { generateDetailedListRows, wrapInTypography } from './utils'
import * as S from './styles'
import { filterHiddenRows } from './utils/filter-hidden-rows'

interface StaticProps {
  Row: typeof DetailedListRowComponent
  Item: typeof DetailedListItemComponent
}

/**
 *
 * @deprecated:
 * 1. 'string' values will be auto-wrapped by DetailedList itself (see DetailedListItemContent);
 * 2. most of custom components have own logic and own layout;
 * 3. you may also have some overlapping issues like that: https://toptal-core.atlassian.net/browse/SPB-2507
 * so this wrap is obsolete and bad. DON'T USE IT.
 */
export type ApplyListStyleFunction = (
  content: ReactNode
) => (options: DetailedListValueViewOptions) => ReactNode

interface PropsWithItems {
  children?: undefined
  /** Renders items into the desired row setup, reverse N render pattern, requirement that the items should be a flat array */
  columns?: number

  /**
   * @deprecated : use jsx method instead
   */
  items:
    | DetailedListItems
    | ((applyListStyle: ApplyListStyleFunction) => DetailedListItems)
}

interface PropsWithChildren {
  items?: undefined
  columns?: undefined
  children: ReactNode
}

const DEFAULT_LABEL_WIDTH = 8
const DEFAULT_PADDING = 'xsmall'
const DEFAULT_LEFT_PADDING = 'xsmall'
const DEFAULT_RIGHT_PADDING = 'xsmall'
const DEFAULT_SIZE = 'medium'
const DEFAULT_WEIGHT = 'semibold'

export interface DetailedListProps {
  striped?: boolean
  divided?: boolean
  /** Rem value, sets all Labels into the desired width */
  labelColumnWidth?: number
  leftItemSpacing?: SpacingType
  rightItemSpacing?: SpacingType
  typographySize?: DetailedListValueViewOptions['size']
  typographyWeight?: DetailedListValueViewOptions['weight']
  typographyColor?: DetailedListValueViewOptions['color']
  itemPadding?: SpacingType
  defaultValue?: string
  isFullWidthLabel?: boolean
  hasHalfWidthItems?: boolean
  'data-testid'?: string
  multilines?: boolean
  titleCaseLabels?: boolean
}

const getItemsArray = (
  applyListStyle: ApplyListStyleFunction,
  items: PropsWithItems['items'] = []
) => (typeof items === 'function' ? items(applyListStyle) : items)

const DetailedList: FC<
  DetailedListProps & (PropsWithItems | PropsWithChildren)
> &
  StaticProps = ({
  children,
  columns = 1,
  defaultValue = '',
  isFullWidthLabel = false,
  hasHalfWidthItems = false,
  itemPadding = DEFAULT_PADDING,
  items,
  labelColumnWidth = DEFAULT_LABEL_WIDTH,
  leftItemSpacing = DEFAULT_LEFT_PADDING,
  rightItemSpacing = DEFAULT_RIGHT_PADDING,
  striped = true,
  divided = true,
  typographyColor,
  typographySize = DEFAULT_SIZE,
  typographyWeight = DEFAULT_WEIGHT,
  'data-testid': dataTestId,
  multilines = false,
  titleCaseLabels = true
}) => {
  let content

  if (children) {
    content = children
  } else {
    const isAutoColumnRender = items && columns > 1
    const applyListStyle =
      (itemValue: ReactNode) => (options: DetailedListValueViewOptions) =>
        wrapInTypography(itemValue, options, defaultValue)
    const itemsArray = getItemsArray(applyListStyle, items)

    const filteredItems = (itemsArray as DetailedListItems).filter(
      item => Array.isArray(item) || !item?.hidden
    )

    const processedElements = isAutoColumnRender
      ? (generateDetailedListRows(
          filteredItems,
          columns
        ) as DetailedListItem[][])
      : (filteredItems as DetailedListItems)

    let numberOfRenderedItems = 0

    const processedElementsFiltered = filterHiddenRows(processedElements)

    content = (processedElementsFiltered as DetailedListItems).map(
      (item, index) => {
        const rowIsStriped = striped && Boolean(numberOfRenderedItems % 2)

        if (Array.isArray(item)) {
          numberOfRenderedItems++

          return (
            <DetailedListRowComponent
              divided={divided}
              striped={rowIsStriped}
              // Seems no unique id
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              {item.map(
                (rowItem, rowItemIndex) =>
                  rowItem && (
                    <DetailedListItemComponent
                      // Seems no unique id
                      // eslint-disable-next-line react/no-array-index-key
                      key={rowItemIndex}
                      multilines={multilines}
                      titleCaseLabels={titleCaseLabels}
                      {...rowItem}
                    />
                  )
              )}
            </DetailedListRowComponent>
          )
        }

        numberOfRenderedItems++

        return (
          <DetailedListRowComponent
            divided={divided}
            striped={rowIsStriped}
            // Seems no unique id
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          >
            <DetailedListItemComponent
              multilines={multilines}
              titleCaseLabels={titleCaseLabels}
              {...item}
            />
          </DetailedListRowComponent>
        )
      }
    )
  }

  return (
    <DetailedListContext.Provider
      value={{
        defaultValue,
        isFullWidthLabel,
        hasHalfWidthItems,
        itemPadding,
        labelColumnWidth,
        leftItemSpacing,
        rightItemSpacing,
        typographyColor,
        typographySize,
        typographyWeight,
        striped,
        divided
      }}
    >
      <Container data-testid={dataTestId} css={S.fixedTableDisplay}>
        {content}
      </Container>
    </DetailedListContext.Provider>
  )
}

DetailedList.Row = DetailedListRowComponent
DetailedList.Item = DetailedListItemComponent

export default DetailedList
