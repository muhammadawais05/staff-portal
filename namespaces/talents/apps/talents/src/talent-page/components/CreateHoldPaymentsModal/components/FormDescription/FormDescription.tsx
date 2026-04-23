import React from 'react'
import { Container, Typography } from '@toptal/picasso'

import { FormDescriptionProps, TabType } from '../../types'

export const FormDescription = ({ currentTab }: FormDescriptionProps) => {
  if (currentTab === TabType.AUTOMATIC) {
    return (
      <Container top='small' bottom='small'>
        <Typography size='medium'>
          Put a hold on user's payments and specify when the hold should be
          lifted.
        </Typography>
      </Container>
    )
  }

  return (
    <Container top='small' bottom='small'>
      <Typography size='medium'>
        Put a hold on user's payments that should be lifted manually.
      </Typography>
    </Container>
  )
}
