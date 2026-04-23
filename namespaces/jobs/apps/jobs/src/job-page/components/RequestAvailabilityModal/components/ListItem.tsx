import React from 'react'
import { Typography } from '@toptal/picasso'

interface ListItemProps {
  label: string
  value: number | string
}

const ListItem = ({ label, value }: ListItemProps) => (
  <>
    <Typography as='span' weight='semibold'>
      {label}:{' '}
    </Typography>
    {value}
    <br />
  </>
)

export default ListItem
