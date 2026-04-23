import { DetailedList as DL } from '@staff-portal/ui'
import { getTimeZoneFullText } from '@staff-portal/date-time-utils'
import React from 'react'
import { Link } from '@staff-portal/navigation'
import { PhoneLink } from '@staff-portal/communication'
import { SkypeField } from '@staff-portal/role-profile'
import {
  TalentAvatar,
  WorkingStatusField,
  TalentCurrentInterviews
} from '@staff-portal/talents'
import { Container, Section, Typography } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'

import { GetTalentCandidateDataQuery } from '../../data/get-talent-candidate-data'
import SectionHeaderLink from '../SectionHeaderLink/SectionHeaderLink'

interface Props {
  talent: NonNullable<GetTalentCandidateDataQuery['staffNode']>
}

const getPhoneLink = (
  talentId: string,
  phoneContacts: NonNullable<
    GetTalentCandidateDataQuery['staffNode']
  >['phoneContacts']
) => {
  const primaryPhoneContact = phoneContacts.nodes.find(
    contact => contact.primary
  )

  return (
    primaryPhoneContact && (
      <PhoneLink
        roleId={talentId}
        phoneContactId={primaryPhoneContact.id}
        renderPhoneContact={() => (
          <Typography size='medium' color='inherit'>
            {primaryPhoneContact.value}
          </Typography>
        )}
      />
    )
  )
}

const TalentDetails = ({ talent }: Props) => {
  return (
    <Section
      variant='withHeaderBar'
      title={
        <SectionHeaderLink
          text={talent.fullName}
          newTab={talent.profileLink?.newTab}
          url={talent.profileLink?.url}
        />
      }
      data-testid='talent-details'
    >
      <Container bottom='small' data-testid='new-engagement-talent-badge'>
        <TalentAvatar
          fullName={talent.fullName}
          photo={talent.photo?.default}
          avatarSize='small'
          badgeSize='large'
        />
      </Container>

      <DL defaultValue={NO_VALUE} labelColumnWidth={10}>
        <DL.Row>
          <DL.Item
            label='Email'
            value={<Link href={`mailto:${talent.email}`}>{talent.email}</Link>}
          />
        </DL.Row>

        <DL.Row>
          <DL.Item
            label='Toptal Email'
            value={
              <Link href={`mailto:${talent.toptalEmail}`}>
                {talent.toptalEmail}
              </Link>
            }
          />
        </DL.Row>

        <DL.Row>
          <DL.Item
            label='Phone'
            value={getPhoneLink(talent.id, talent.phoneContacts)}
          />
        </DL.Row>

        {talent?.skype && (
          <DL.Row>
            <DL.Item
              label='Skype'
              value={
                <SkypeField
                  skypeId={talent.skype}
                  additionalSkypeIds={talent.additionalSkypeIds?.nodes}
                />
              }
            />
          </DL.Row>
        )}

        <DL.Row>
          <DL.Item
            label='Current country'
            value={talent?.locationV2?.country?.name}
          />
        </DL.Row>

        <DL.Row>
          <DL.Item label='Current city' value={talent?.cityDescription} />
        </DL.Row>

        <DL.Row>
          <DL.Item
            label='Time Zone'
            value={getTimeZoneFullText(talent?.timeZone)}
          />
        </DL.Row>

        <DL.Item label='Working Status'>
          <WorkingStatusField
            workingNumber={talent.engagements.counters.workingNumber}
          />
        </DL.Item>

        <DL.Row>
          <DL.Item label='Current Interviews'>
            {talent.currentInterviews && (
              <TalentCurrentInterviews
                talentId={talent.id}
                talentType={talent.type}
                data={talent.currentInterviews}
              />
            )}
          </DL.Item>
        </DL.Row>
      </DL>
    </Section>
  )
}

export default TalentDetails
