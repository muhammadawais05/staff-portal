import React from 'react'
import { Tooltip, Typography, TypographyOverflow } from '@toptal/picasso'
import { capitalize } from '@toptal/picasso/utils'
import { NO_VALUE } from '@staff-portal/config'
import { Maybe } from '@staff-portal/graphql/staff'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import {
  DetailedList,
  DetailedListValueViewOptions,
  LinkWrapper
} from '@staff-portal/ui'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'

import { CallRequestFragment } from '../../../../data/call-request-fragment'
import { getStatusColor } from '../../../../utils'

type Formatter = (input: string) => string

const getPlainTextField = (value?: Maybe<string>) => value || null
const getCapitalizedTextField = (value?: Maybe<string>) =>
  value ? capitalize(value) : NO_VALUE
const getDateField = (formatter: Formatter, value?: Maybe<string>) =>
  (value && formatter(value)) || NO_VALUE

const getDatetimeField = (
  label: string,
  formatter: Formatter,
  value?: Maybe<string>
) => ({
  label,
  value: ({ size, color, weight }: DetailedListValueViewOptions) =>
    value ? (
      <Tooltip content={getDateDistanceFromNow(value)} placement='top'>
        <Typography size={size} weight={weight} color={color}>
          {formatter(value)}
        </Typography>
      </Tooltip>
    ) : (
      NO_VALUE
    )
})

const getLink = ({ url, text }: { url?: string | null; text: string }) => (
  <LinkWrapper wrapWhen={Boolean(url)} href={url as string}>
    <TypographyOverflow as='span' color='inherit' weight='inherit'>
      {text}
    </TypographyOverflow>
  </LinkWrapper>
)

export interface Props {
  data: CallRequestFragment
  obscure: boolean
}
const CallRequestListItemContent = ({ data, obscure }: Props) => {
  const {
    createdAt,
    claimedAt,
    claimer,
    client,
    purpose,
    requestedStartTime,
    status,
    job,
    type
  } = data
  const formatDateTime = useUserDateTimeFormatter()
  const getObscureFields = () => [
    getDatetimeField('Created at', formatDateTime, createdAt),
    getDatetimeField('Expected start time', formatDateTime, requestedStartTime)
  ]
  const getRegularFields = () => [
    [
      {
        label: 'Call type',
        value: getCapitalizedTextField(type)
      },
      {
        label: 'Status',
        value: ({ size, weight }: DetailedListValueViewOptions) => (
          <TypographyOverflow
            size={size}
            weight={weight}
            color={getStatusColor(obscure ? null : status)}
            data-testid='call-request-status'
          >
            {getCapitalizedTextField(obscure ? null : status)}
          </TypographyOverflow>
        )
      }
    ],
    [
      {
        label: 'Call claimer',
        value: obscure
          ? null
          : claimer &&
            getLink({
              url: claimer.webResource.url,
              text: claimer.webResource.text
            })
      },
      {
        label: 'Company',
        value: obscure
          ? null
          : client &&
            getLink({
              url: client.webResource.url,
              text: client.fullName
            })
      }
    ],
    [
      {
        label: 'Company country',
        value: getPlainTextField(obscure ? null : client?.country?.name)
      },
      {
        label: 'Company time zone',
        value: getPlainTextField(obscure ? null : client?.timeZone?.name)
      }
    ],
    [
      {
        label: 'Company applied at',
        value: getDateField(formatDateTime, obscure ? null : client?.createdAt)
      },
      {
        label: 'Purpose',
        value: getPlainTextField(obscure ? null : purpose)
      }
    ],
    [
      {
        label: 'Job',
        value: obscure
          ? null
          : job &&
            getLink({
              url: job.webResource.url,
              text: job.webResource.text
            }),
        hidden: obscure || !job
      },
      {
        label: 'Call claimed at',
        value: getDateField(formatDateTime, obscure ? null : claimedAt),
        hidden: obscure || !claimedAt
      }
    ]
  ]

  const items = [getObscureFields(), ...(obscure ? [] : getRegularFields())]

  return (
    // eslint-disable-next-line @toptal/davinci/no-deprecated-props
    <DetailedList defaultValue={NO_VALUE} labelColumnWidth={11} items={items} />
  )
}

export default CallRequestListItemContent
