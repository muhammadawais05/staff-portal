import { Bullet16, Container, Typography } from '@toptal/picasso'
import React, { PropsWithChildren } from 'react'

import { getHighlightDateInterval } from '../../utils/get-highlight-date-interval/get-highlight-date-interval'

interface Props {
  title: string
  startDate?: string | number | null
  endDate?: string | number | null
  description?: string | null
}

const HighlightItemPreview = ({
  title,
  startDate,
  endDate,
  description,
  children
}: PropsWithChildren<Props>) => {
  const interval = getHighlightDateInterval(startDate, endDate)

  return (
    <Container flex bottom='xsmall'>
      <Container as='span' inline right='xsmall'>
        <Bullet16 color='dark-grey' />
      </Container>

      <Container>
        <Typography size='medium' weight='semibold'>
          {title}
          {interval && (
            <>
              {' '}
              <Typography
                as='span'
                size='medium'
                color='dark-grey'
                data-testid='highlight-item-preview-interval'
              >
                {interval}
              </Typography>
            </>
          )}
        </Typography>

        {description && (
          <Container
            top='xsmall'
            data-testid='highlight-item-preview-description'
          >
            <Typography size='medium' color='dark-grey'>
              {description}
            </Typography>
          </Container>
        )}

        {children}
      </Container>
    </Container>
  )
}

export default HighlightItemPreview
