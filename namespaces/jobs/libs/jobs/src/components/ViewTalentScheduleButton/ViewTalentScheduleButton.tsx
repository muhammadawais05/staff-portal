import React from 'react'
import { Calendar16, Container, Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { getBookingPath } from '@staff-portal/routes'

const TIME_INTERVIEW_QUESTION_SLUG = 'time_interview'

type Props = {
  bookingPageSlug?: string
  templateSlug?: string | null
}

const ViewTalentScheduleButton = ({ bookingPageSlug, templateSlug }: Props) => {
  if (!bookingPageSlug || templateSlug !== TIME_INTERVIEW_QUESTION_SLUG) {
    return null
  }

  return (
    <Container flex alignItems='center' top='small'>
      <Container flex alignItems='center' right='xsmall'>
        <Calendar16 />
      </Container>
      <Typography size='xsmall'>
        <Link
          href={getBookingPath(bookingPageSlug)}
          target='_blank'
          data-testid='booking-page'
        >
          View talent's schedule
        </Link>{' '}
        to double check interview availability
      </Typography>
    </Container>
  )
}

export default ViewTalentScheduleButton
