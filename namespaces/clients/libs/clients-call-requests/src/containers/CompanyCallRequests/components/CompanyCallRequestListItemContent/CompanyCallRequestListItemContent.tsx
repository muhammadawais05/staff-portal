import React from 'react'
import { Tooltip, Typography, TypographyOverflow } from '@toptal/picasso'
import { toTitleCase } from '@toptal/picasso/utils'
import { NO_VALUE } from '@staff-portal/config'
import { ContactType } from '@staff-portal/graphql/staff'
import {
  DetailedList,
  LinkWrapper,
  TypographyOverflowLink
} from '@staff-portal/ui'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import { PhoneLink, SkypeLink } from '@staff-portal/communication'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'
import { findContact } from '@staff-portal/contacts'

import { CallRequestFragment } from '../../../../data/call-request-fragment'
import { getStatusColor } from '../../../../utils'

export interface Props {
  data: CallRequestFragment
}

// eslint-disable-next-line complexity
const CallRequestListItemContent = ({ data }: Props) => {
  const {
    createdAt,
    claimedAt,
    claimer,
    purpose,
    requestedStartTime,
    status,
    job,
    contacts,
    client,
    type,
    id
  } = data
  const formatDateTime = useUserDateTimeFormatter()

  const obscuredItems = [
    {
      label: 'Created at',
      value: createdAt && (
        <Tooltip content={getDateDistanceFromNow(createdAt)}>
          <Typography size='medium'>{formatDateTime(createdAt)}</Typography>
        </Tooltip>
      )
    },
    {
      label: 'Expected start time',
      value: requestedStartTime && (
        <Tooltip content={getDateDistanceFromNow(requestedStartTime)}>
          <Typography size='medium'>
            {formatDateTime(requestedStartTime)}
          </Typography>
        </Tooltip>
      )
    }
  ]

  if (!client) {
    return (
      // eslint-disable-next-line @toptal/davinci/no-deprecated-props
      <DetailedList
        columns={2}
        defaultValue={NO_VALUE}
        labelColumnWidth={10}
        items={obscuredItems}
      />
    )
  }

  const skype = findContact(contacts, ContactType.SKYPE)
  const phone = findContact(contacts, ContactType.PHONE)

  return (
    // eslint-disable-next-line @toptal/davinci/no-deprecated-props
    <DetailedList
      columns={2}
      defaultValue={NO_VALUE}
      labelColumnWidth={10}
      items={[
        obscuredItems[0],
        {
          label: 'Call type',
          value: toTitleCase(type)
        },
        {
          label: 'Call claimed at',
          value: claimedAt && formatDateTime(claimedAt)
        },
        {
          label: 'Phone',
          value: phone && client.contact && (
            <TypographyOverflowLink tooltipContent={phone.value}>
              <PhoneLink
                roleId={client.contact.id}
                phoneContactId={phone.id}
                contactSourceId={id}
                renderPhoneContact={() => (
                  <Typography size='medium' color='inherit'>
                    {phone.value}
                  </Typography>
                )}
              />
            </TypographyOverflowLink>
          )
        },
        {
          label: 'Purpose',
          value: toTitleCase(purpose)
        },
        obscuredItems[1],
        {
          label: 'Status',
          value: status && (
            <TypographyOverflow size='medium' color={getStatusColor(status)}>
              {toTitleCase(status)}
            </TypographyOverflow>
          )
        },
        {
          label: 'Call claimer',
          value: claimer && (
            <LinkWrapper
              wrapWhen={Boolean(claimer.webResource.url)}
              href={claimer.webResource.url as string}
            >
              <TypographyOverflow
                as='span'
                size='medium'
                color='inherit'
                weight='inherit'
              >
                {claimer.webResource.text}
              </TypographyOverflow>
            </LinkWrapper>
          )
        },
        {
          label: 'Skype',
          value: skype && <SkypeLink skypeId={skype.value} />
        },
        {
          label: 'Job',
          value: job && (
            <LinkWrapper
              wrapWhen={Boolean(job.webResource.url)}
              href={job.webResource.url as string}
            >
              <TypographyOverflow
                as='span'
                size='medium'
                color='inherit'
                weight='inherit'
              >
                {job.webResource.text}
              </TypographyOverflow>
            </LinkWrapper>
          ),
          hidden: !job
        }
      ]}
    />
  )
}

export default CallRequestListItemContent
