import React from 'react'
import { Container, Typography, TypographyOverflow } from '@toptal/picasso'
import {
  CompanyRepresentativeCumulativeStatus as CumulativeStatus,
  Link,
  Maybe
} from '@staff-portal/graphql/staff'
import {
  DEFAULT_FULL_DATE_FORMAT,
  getTimeZoneFullText,
  TimeZoneFragment
} from '@staff-portal/date-time-utils'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { NO_VALUE } from '@staff-portal/config'
import { WebResourceLink } from '@staff-portal/ui'

import {
  RepresentativeContactFragment as Contact,
  RepresentativeFragment as Representative
} from '../../data'
import LinkOverflow from './LinkOverflow'
import TooltipWithIcon from './TooltipWithIcon'
import LoginStatus from './LoginStatus'

export const Email = ({ emails }: { emails: Contact[] }) => {
  const email = emails[0]?.value

  return email ? (
    <LinkOverflow link={{ url: `mailto:${email}`, text: email }} />
  ) : (
    <Typography size='medium'>{NO_VALUE}</Typography>
  )
}

const Status = ({status}: {status?: Maybe<CumulativeStatus>}) => (
  <>
    {status ? (
      <LoginStatus status={status} />
    ) : (
      <Typography size='medium'>{NO_VALUE}</Typography>
    )}
  </>
)

const ClientAndEmploymentStatus = ({
  link,
  noLongerPartOfCompany
}: {
  link: Link
  noLongerPartOfCompany?: Maybe<boolean>
}) => (
  <>
    {link ? (
      <LinkOverflow link={link} />
    ) : (
      <Typography size='medium'>{NO_VALUE}</Typography>
    )}

    {noLongerPartOfCompany && (
      <Container top='xsmall'>
        <TypographyOverflow size='medium'>
          Contact no longer with the company
        </TypographyOverflow>
      </Container>
    )}
  </>
)

const LastLogin = ({
  currentSignInAt,
  currentSignInIp,
  ipLocation
}: Pick<
  Representative,
  'currentSignInAt' | 'currentSignInIp' | 'ipLocation'
>) => {
  const userDateFormatter = useUserDateFormatter()

  if (!currentSignInAt) {
    return null
  }

  const location = [ipLocation?.cityName, ipLocation?.countryName]
    .filter(Boolean)
    .join(', ')

  const tooltip = (
    <>
      <Container inline css={{ whiteSpace: 'nowrap' }}>
        IP: <b>{currentSignInIp}</b>
      </Container>
      <br />
      Location: {location ? <b>{location}</b> : NO_VALUE}
    </>
  )

  return (
    <TooltipWithIcon tooltip={tooltip}>
      {userDateFormatter(currentSignInAt, DEFAULT_FULL_DATE_FORMAT)}
    </TooltipWithIcon>
  )
}

const LONG_MONTH_FORMAT = 'MMMM d, yyyy' as const

const TimeZone = ({ timeZone }: { timeZone?: Maybe<TimeZoneFragment> }) =>
  timeZone?.name ? (
    <TypographyOverflow size='medium'>
      {getTimeZoneFullText(timeZone)}
    </TypographyOverflow>
  ) : null

const TimeZonedDate = ({ date }: { date?: Maybe<string> }) => {
  const userDateFormatter = useUserDateFormatter()

  if (!date) {
    return null
  }

  return <>{userDateFormatter(date, LONG_MONTH_FORMAT)}</>
}

const CallRecording = ({ accepted }: { accepted?: Maybe<boolean> }) => (
  <TypographyOverflow size='medium' color={accepted ? 'green' : 'red'}>
    {accepted ? 'Permitted' : 'Not Permitted'}
  </TypographyOverflow>
)

const NPSScore = ({
  promotion,
  url
}: {
  promotion?: Maybe<{
    score?: Maybe<number>
    updatedAt?: Maybe<string>
  }>
  url?: Maybe<string>
}) => {
  const userDateFormatter = useUserDateFormatter()

  // if promotion is there - url also is
  if (!promotion || !promotion.score || !promotion.updatedAt) {
    return null
  }
  const { score, updatedAt } = promotion

  const date = userDateFormatter(updatedAt, LONG_MONTH_FORMAT)
  const text = `${score} (${date})`

  return <WebResourceLink link={{ url, text }} />
}

export {
  CallRecording,
  ClientAndEmploymentStatus,
  Status,
  LastLogin,
  TimeZone,
  NPSScore,
  TimeZonedDate
}
