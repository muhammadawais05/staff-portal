import React, { useMemo, useState } from 'react'
import { Container, Typography, Tooltip } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { CompanyRepresentative } from '@staff-portal/graphql/staff'
import { useAnalytics } from '@staff-portal/monitoring-service'
import { JobStationSegmentEvents } from '@staff-portal/facilities'
import { useCallContactWithOperationCheck } from '@staff-portal/communication'

import JobListContactTooltipItem from '../JobListContactTooltipItem/JobListContactTooltipItem'

interface Props {
  contact: CompanyRepresentative
  contacts: CompanyRepresentative[] | undefined
  multiple?: boolean
}

const getPlusCounter = (
  contact: CompanyRepresentative,
  contacts: CompanyRepresentative[] | undefined
) => {
  if (!contacts) {
    return
  }

  return contacts.length - contacts.indexOf(contact) - 1
}

const JobListContactItem = ({ contact, contacts, multiple }: Props) => {
  const { track } = useAnalytics()

  const [contactToCall, setContactToCall] = useState<CompanyRepresentative>()
  const [tooltipOpen, setTooltipOpen] = useState<boolean>()
  const { loading, callContact } = useCallContactWithOperationCheck({
    roleId: contactToCall?.id,
    phoneContactId: contactToCall?.contacts.nodes[0].id
  })

  const openTooltip = () => setTooltipOpen(true)
  const closeTooltip = () => setTooltipOpen(false)
  const toggleTooltip = () => setTooltipOpen(open => !open)

  const onTooltipOpen = () => {
    track(JobStationSegmentEvents.JOBS_TABLE_LINK)
  }

  const onPhoneClick = (contactToPhone: CompanyRepresentative) => {
    setContactToCall(contactToPhone)
    callContact()
  }

  const counter = useMemo(
    () => getPlusCounter(contact, contacts),
    [contact, contacts]
  )

  return (
    <Container onMouseOver={openTooltip} onMouseOut={closeTooltip}>
      <Tooltip
        interactive
        open={tooltipOpen}
        onOpen={onTooltipOpen}
        content={
          <JobListContactTooltipItem
            contacts={contacts}
            onPhoneClick={onPhoneClick}
            phoneLinkDisabled={loading}
          />
        }
        placement='top'
      >
        <Container flex alignItems='center' onClick={toggleTooltip}>
          <Typography noWrap>
            <Link>{contact.webResource.text}</Link>
          </Typography>
          {multiple && counter && counter > 0 && <Link>, +{counter}</Link>}
        </Container>
      </Tooltip>
    </Container>
  )
}

export default JobListContactItem
