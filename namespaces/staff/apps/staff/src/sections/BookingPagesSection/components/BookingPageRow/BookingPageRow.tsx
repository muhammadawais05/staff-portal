import React from 'react'
import { DetailedList, WebResourceLink } from '@staff-portal/ui'
import { Container, Typography } from '@toptal/picasso'

type Props = {
  code: string
  flags?: string | null
  webResource: { text: string; url?: string | null }
}

const BookingPageRow = ({ code, flags, webResource }: Props) => (
  <DetailedList.Row key={code}>
    <DetailedList.Item hideLabel>
      <Container flex>
        <WebResourceLink link={webResource} />
        {flags && (
          <>
            <Container left='xsmall' right='xsmall'>
              <Typography>-</Typography>
            </Container>
            <Typography data-testid='booking-page-item-flags'>
              {flags}
            </Typography>
          </>
        )}
      </Container>
    </DetailedList.Item>
  </DetailedList.Row>
)

export default BookingPageRow
