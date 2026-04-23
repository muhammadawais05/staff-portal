import React from 'react'
import { Container, Avatar, Typography } from '@toptal/picasso'

interface BasicInfoProps {
  photo?: string | null
  fullName: string
  location?: string | null
}

const BasicInfo = ({ photo, fullName, location }: BasicInfoProps) => (
  <Container flex alignItems='center'>
    <Avatar size='small' name={fullName} src={photo ?? undefined} />

    <Container left='small' direction='column'>
      <Typography variant='heading' weight='semibold'>
        {fullName}
      </Typography>
      <Typography>{location}</Typography>
    </Container>
  </Container>
)

export default BasicInfo
