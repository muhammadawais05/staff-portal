import React from 'react'
import { Typography, TypographyOverflow } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useGetNode, BATCH_KEY } from '@staff-portal/data-layer-service'
import { ContactType } from '@staff-portal/graphql/staff'
import {
  DetailedList as DL,
  SubSection,
  TypographyOverflowLink
} from '@staff-portal/ui'
import { getTimeZoneFullText } from '@staff-portal/date-time-utils'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { NO_VALUE } from '@staff-portal/config'
import { PhoneLink } from '@staff-portal/communication'

import { JOB_GENERAL_DETAILS_BATCH_KEY } from '../../config'
import { GetJobClientContactsDocument } from './data/get-job-client-contacts.staff.gql.types'
import ContactsSkeleton from './ContactsSkeleton'
import EditContacts from './EditContacts'
import { LABEL_COLUMN_WIDTH } from '../../../../config'

interface Props {
  jobId: string
}

const ContactsSection = ({ jobId }: Props) => {
  const { data, loading, refetch } = useGetNode(GetJobClientContactsDocument)(
    { jobId },
    { context: { [BATCH_KEY]: JOB_GENERAL_DETAILS_BATCH_KEY } }
  )

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  if (loading && !data) {
    return <ContactsSkeleton />
  }

  const clientContact = data?.client.contact

  const primaryContact = clientContact?.contacts?.nodes.find(
    contact => contact.primary && contact.type === ContactType.PHONE
  )

  return (
    <SubSection title='Contact Information' data-testid='job-contacts-section'>
      <DL defaultValue={NO_VALUE} labelColumnWidth={LABEL_COLUMN_WIDTH}>
        <DL.Row>
          <DL.Item label='Primary Contact'>
            <Typography size='medium'>{clientContact?.fullName}</Typography>
          </DL.Item>
          <DL.Item label='Phone Number'>
            <TypographyOverflowLink
              as='div'
              tooltipContent={clientContact?.phoneNumber}
              data-testid='contacts-section-phone-number'
            >
              {clientContact && primaryContact && (
                <PhoneLink
                  roleId={clientContact?.id}
                  phoneContactId={primaryContact?.id}
                  renderPhoneContact={() => (
                    <Typography size='medium' color='inherit'>
                      {clientContact?.phoneNumber}
                    </Typography>
                  )}
                />
              )}
            </TypographyOverflowLink>
          </DL.Item>
        </DL.Row>
        <DL.Row>
          <DL.Item label='Email'>
            <Link href={`mailto:${clientContact?.email}`}>
              <TypographyOverflow
                size='medium'
                color='inherit'
                tooltipContent={clientContact?.email}
              >
                {clientContact?.email}
              </TypographyOverflow>
            </Link>
          </DL.Item>
          <DL.Item label='Time Zone'>
            <TypographyOverflow size='medium'>
              {getTimeZoneFullText(clientContact?.timeZone)}
            </TypographyOverflow>
          </DL.Item>
        </DL.Row>
        <DL.Row>
          <DL.Item label='Email'>
            {data?.client && (
              <EditContacts
                jobId={jobId}
                clientId={data?.client.id}
                contacts={data?.contacts?.edges}
                createOperation={data?.operations?.createJobContactFromJob}
              />
            )}
          </DL.Item>
        </DL.Row>
      </DL>
    </SubSection>
  )
}

export default ContactsSection
