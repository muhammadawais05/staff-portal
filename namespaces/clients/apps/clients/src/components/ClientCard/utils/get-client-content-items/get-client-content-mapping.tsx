import React from 'react'
import { Link } from '@staff-portal/navigation'
import {
  DetailedListItem,
  LinkWrapper,
  TypographyOverflowLink
} from '@staff-portal/ui'
import {
  getTimeZoneFullText,
  parseAndFormatDate,
  parseAndFormatDateTime
} from '@staff-portal/date-time-utils'
import { titleize } from '@staff-portal/string'
import { SkypeLink } from '@staff-portal/communication'
import {
  ClientFragment,
  CompanyStatus,
  isEnterpriseBusiness,
  LeadProbabilityBucket,
  CompanyApplicantContactsFragment,
  ClientCardMatchers
} from '@staff-portal/clients'
import { Container, Typography } from '@toptal/picasso'
import {
  PhoneContactsViewer,
  AdditionalPhoneCategory,
  LinkOverflow
} from '@staff-portal/client-representatives'

import { ClientContentField } from '../../../../enums/client-content-field'

export const getClientContentMapping = (
  client: ClientFragment,
  timeZone?: string
): Record<ClientContentField, DetailedListItem> => {
  const {
    id,
    email,
    contact,
    claimer,
    leadPotential,
    scoreExplanation,
    country,
    pendingCallbackRequest,
    createdAt,
    updatedAt,
    approvedAt,
    claimableSince,
    timeZone: clientTimezone,
    parent,
    investigations,
    cumulativeStatus,
    salesAnalyst,
    matchers,
    businessType,
    billingPhone
  } = client

  const isParentVisible = isEnterpriseBusiness(businessType)

  return {
    [ClientContentField.PARENT]: {
      hidden: !isParentVisible,
      label: 'Parent',
      value: parent ? (
        <TypographyOverflowLink>
          <LinkWrapper
            wrapWhen={Boolean(parent.webResource.url)}
            href={parent.webResource.url as string}
            title={parent.webResource.text}
          >
            {parent.webResource.text}
          </LinkWrapper>
        </TypographyOverflowLink>
      ) : null
    },
    [ClientContentField.EMAIL]: {
      label: 'Email',
      value: email && (
        <LinkOverflow link={{ url: `mailto:${email}`, text: email }} />
      )
    },
    [ClientContentField.PHONE]: {
      label: 'Phone',
      value: (
        <Container flex direction='column' gap='xsmall'>
          {contact?.id && (
            <PhoneContactsViewer
              nodes={
                [
                  // eslint-disable-next-line no-unsafe-optional-chaining
                  ...contact?.contacts.nodes,
                  billingPhone && {
                    id: AdditionalPhoneCategory.BILLING,
                    primary: false,
                    phoneCategory: AdditionalPhoneCategory.BILLING,
                    value: billingPhone
                  }
                ].filter(
                  Boolean
                ) as CompanyApplicantContactsFragment['contacts']['nodes']
              }
              nodeData={{ companyRepresentativeId: contact.id, clientId: id }}
            />
          )}
        </Container>
      )
    },
    [ClientContentField.CONTACT_NAME]: {
      label: 'Contact name',
      value: contact?.fullName
    },
    [ClientContentField.COUNTRY]: {
      label: 'Country',
      value: country?.name
    },
    [ClientContentField.TIMEZONE]: {
      label: 'Time zone',
      value: getTimeZoneFullText(clientTimezone)
    },
    [ClientContentField.CALL_REQUEST_TYPE]: {
      label: 'Call Request Type',
      value:
        pendingCallbackRequest?.type && titleize(pendingCallbackRequest.type)
    },
    [ClientContentField.STATUS]: {
      label: 'Status',
      value: (
        <CompanyStatus
          cumulativeStatus={cumulativeStatus}
          investigations={investigations}
        />
      )
    },
    [ClientContentField.SKYPE]: {
      label: 'Skype',
      value: contact?.skype && <SkypeLink skypeId={contact.skype} />
    },
    [ClientContentField.EMPTY]: {
      label: '',
      value: ''
    },
    [ClientContentField.LEAD_BUCKET]: {
      label: 'Lead bucket',
      value: (
        <LeadProbabilityBucket
          bucket={leadPotential?.leadProbabilityBucket}
          scoreExplanation={scoreExplanation}
        />
      )
    },
    [ClientContentField.APPLIED]: {
      label: 'Applied',
      value: parseAndFormatDate(createdAt, { timeZone })
    },
    [ClientContentField.CLAIMABLE_SINCE]: {
      label: 'Claimable since',
      value:
        claimableSince && parseAndFormatDateTime(claimableSince, { timeZone })
    },
    [ClientContentField.CALL_SCHEDULED_AT]: {
      label: 'Call Scheduled At',
      value:
        pendingCallbackRequest?.requestedStartTime &&
        parseAndFormatDateTime(pendingCallbackRequest.requestedStartTime, {
          timeZone
        })
    },
    [ClientContentField.APPROVED]: {
      label: 'Approved',
      value: parseAndFormatDate(approvedAt, { timeZone })
    },
    [ClientContentField.LAST_LOGIN]: {
      label: 'Last login',
      value:
        contact?.lastLogin &&
        parseAndFormatDateTime(contact?.lastLogin, { timeZone })
    },
    [ClientContentField.MATCHERS]: {
      label: 'Matchers',
      value: <ClientCardMatchers matchers={matchers?.edges} />
    },
    [ClientContentField.LAST_EDITED]: {
      label: 'Last edited',
      value: updatedAt && parseAndFormatDateTime(updatedAt, { timeZone })
    },
    [ClientContentField.SALES_ANALYST]: {
      label: 'Sales analyst',
      value: salesAnalyst?.fullName
    },
    [ClientContentField.CLAIMER]: {
      label: 'Claimer',
      value: claimer && (
        <Typography size='medium'>
          {claimer.webResource.url ? (
            <Link
              href={claimer.webResource.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              {claimer.fullName}
            </Link>
          ) : (
            claimer.fullName
          )}
        </Typography>
      )
    }
  }
}
