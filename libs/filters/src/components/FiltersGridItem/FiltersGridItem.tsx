import React from 'react'
import { Grid } from '@toptal/picasso'
import { GridItemProps } from '@toptal/picasso/GridItem'

type Props = GridItemProps

const FiltersGridItem = ({ children, ...rest }: Props) => {
  return <Grid.Item {...rest}>{children}</Grid.Item>
}

export default FiltersGridItem
