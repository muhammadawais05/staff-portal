import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { CompanyRepresentative } from '@staff-portal/graphql/staff'
import { getTimeZoneText } from '@staff-portal/date-time-utils'

interface Props {
  contacts: CompanyRepresentative[] | undefined
  onPhoneClick: (contact: CompanyRepresentative) => void
  phoneLinkDisabled: boolean
}

const JobListContactTooltipItem = ({
  contacts,
  onPhoneClick,
  phoneLinkDisabled
}: Props) => (
  <Container
    left='xsmall'
    top='xsmall'
    bottom='xsmall'
    right='xsmall'
    data-testid='job-contacts-tooltip'
  >
    {contacts?.map((item: CompanyRepresentative, pos: number) => (
      <Container
        key={item.id}
        bottom={pos !== contacts.length - 1 ? 'medium' : 0}
      >
        <Container>
          <Typography weight='semibold' size='large'>
            {item.fullName}
          </Typography>
        </Container>
        <Container>
          <Link disabled={phoneLinkDisabled} onClick={() => onPhoneClick(item)}>
            {item.contacts?.nodes[0]?.value || ''}
          </Link>
        </Container>
        <Container>
          <Link href={`mailto:${item.email}`}>{item.email}</Link>
        </Container>
        <Container>
          {item.communicationTrackingLink?.url && (
            <Link href={item.communicationTrackingLink.url} target='_blank'>
              {item.communicationTrackingLink.text}
            </Link>
          )}
        </Container>
        <Container>
          <Typography>{getTimeZoneText(item.timeZone)}</Typography>
        </Container>
      </Container>
    ))}
  </Container>
)

export default JobListContactTooltipItem
