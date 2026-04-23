import React, { useState } from 'react'
import { DescriptionFormatter } from '@staff-portal/ui'
import { Button, Container, Typography } from '@toptal/picasso'

import { DEFAULT_TEXT_LENGTH_LIMIT } from '../../../../config'

interface Props {
  text: string
}
const JobDescriptionField = ({ text }: Props) => {
  const [showMore, setShowMore] = useState(false)
  const shouldShowMore = text.length > DEFAULT_TEXT_LENGTH_LIMIT

  const description =
    shouldShowMore && !showMore
      ? `${text.slice(0, DEFAULT_TEXT_LENGTH_LIMIT)}...`
      : text

  return (
    <>
      <Typography as='div' size='medium'>
        <DescriptionFormatter text={description} />
      </Typography>

      {shouldShowMore && !showMore && (
        <Container top='small'>
          <Button.Action onClick={() => setShowMore(true)}>
            Show More
          </Button.Action>
        </Container>
      )}
    </>
  )
}

export default JobDescriptionField
