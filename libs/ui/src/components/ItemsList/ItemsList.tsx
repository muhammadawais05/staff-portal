import React, { ReactNode, memo } from 'react'
import { Typography, Container, Loader, ContainerProps } from '@toptal/picasso'

import ListItemContainer from '../ListItemContainer'
import * as S from './styles'

interface ItemsProps<T> {
  data: T[] | undefined
  renderItem: (item: T, index: number) => ReactNode
  getItemKey: (item: T) => string
  itemWithoutSection?: boolean
  containerVariant?: ContainerProps['variant']
}

const Items = <T,>({
  data,
  getItemKey,
  renderItem,
  itemWithoutSection,
  containerVariant
}: ItemsProps<T>) => (
  <>
    {(data ?? []).map((item, index) => (
      <ListItemContainer
        key={getItemKey(item)}
        itemWithoutSection={itemWithoutSection}
        variant={containerVariant}
      >
        {renderItem(item, index)}
      </ListItemContainer>
    ))}
  </>
)

const MemoizedItems = memo(Items) as typeof Items

export interface Props<T> {
  data: T[] | undefined
  renderItem: (item: T, index: number) => ReactNode
  getItemKey: (item: T) => string
  notFoundMessage?: ReactNode
  loading?: boolean
  itemWithoutSection?: boolean
  containerVariant?: ContainerProps['variant']
}

const ItemsList = <T,>({
  data,
  renderItem,
  notFoundMessage = 'Not Found',
  loading = false,
  getItemKey,
  itemWithoutSection,
  containerVariant
}: Props<T>) => {
  const containerCss = [S.container, loading ? S.disabledContainer : undefined]

  if (!data?.length) {
    if (typeof notFoundMessage !== 'string') {
      return (
        <Container css={containerCss}>
          {loading ? <Loader css={S.loadingIndicator} /> : notFoundMessage}
        </Container>
      )
    }

    return (
      <Container padded='large' css={containerCss}>
        <Typography align='center' variant='heading'>
          {notFoundMessage}
        </Typography>
        {loading && <Loader css={S.emptyListLoadingIndicator} />}
      </Container>
    )
  }

  return (
    <Container css={containerCss}>
      <MemoizedItems<T>
        data={data}
        getItemKey={getItemKey}
        renderItem={renderItem}
        itemWithoutSection={itemWithoutSection}
        containerVariant={containerVariant}
      />
      {loading && <Loader css={S.loadingIndicator} />}
    </Container>
  )
}

export default ItemsList
