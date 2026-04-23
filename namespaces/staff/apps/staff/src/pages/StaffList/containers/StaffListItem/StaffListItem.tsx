import React from 'react'
import { Avatar, Container, Section } from '@toptal/picasso'
import {
  DetailedList,
  LinkWrapper,
  TypographyOverflowLink
} from '@staff-portal/ui'
import { Link } from '@staff-portal/navigation'
import { NO_VALUE } from '@staff-portal/config'
import {
  useUserDateFormatter,
  useUserDateTimeFormatter
} from '@staff-portal/current-user'
import { SkypeField, LastLoginField } from '@staff-portal/role-profile'
import { RolePhoneLink } from '@staff-portal/communication'
import { ContactType } from '@staff-portal/graphql/staff'
import { ProfileHeader } from '@staff-portal/facilities'

import { StaffListItemFragment } from '../../data/get-staffs-list/get-staffs-list.staff.gql.types'
import Teams from '../../../../components/Teams/Teams'
import StatusField from '../../../../components/StatusField/StatusField'
import StaffListItemActions from './components/StaffListItemActions/StaffListItemActions'

interface Props {
  staff: StaffListItemFragment
}

const StaffListItem = ({ staff }: Props) => {
  const userDateFormatter = useUserDateFormatter()
  const userDateTimeFormatter = useUserDateTimeFormatter()

  if (!staff) {
    return null
  }

  const {
    id: staffId,
    fullName,
    roleTitle,
    webResource,
    updatedAt,
    activatedAt,
    skype,
    phoneNumber,
    locationV2: location,
    ipLocationV2: ipLocation,
    cumulativeStatusV2: cumulativeStatus,
    currentSignInAt,
    currentSignInIp,
    timeZone,
    email,
    teams,
    photo,
    operations
  } = staff

  return (
    <Section
      variant='withHeaderBar'
      data-testid='staff-list-item'
      title={
        <LinkWrapper
          wrapWhen={Boolean(webResource.url)}
          href={webResource.url as string}
          data-testid='talent-link'
        >
          {fullName}
        </LinkWrapper>
      }
      actions={
        <StaffListItemActions
          staffId={staffId}
          fullName={fullName}
          operations={operations}
        />
      }
    >
      <Container>
        <Container bottom='small'>
          <ProfileHeader id={staffId}>
            <Avatar
              size='small'
              name={fullName}
              src={photo?.thumb || undefined}
            />
          </ProfileHeader>
        </Container>

        <DetailedList defaultValue={NO_VALUE} labelColumnWidth={10}>
          <DetailedList.Row>
            <DetailedList.Item
              label='Email'
              value={
                <TypographyOverflowLink>
                  <Link href={`mailto:${email}`}>{email}</Link>
                </TypographyOverflowLink>
              }
            />
            <DetailedList.Item label='Status'>
              {cumulativeStatus ? (
                <StatusField cumulativeStatus={cumulativeStatus} />
              ) : undefined}
            </DetailedList.Item>
          </DetailedList.Row>

          <DetailedList.Row>
            <DetailedList.Item label='Phone'>
              {phoneNumber ? (
                <RolePhoneLink
                  roleId={staffId}
                  destination={phoneNumber}
                  contactType={ContactType.PHONE}
                />
              ) : undefined}
            </DetailedList.Item>
            <DetailedList.Item label='Role' value={roleTitle} />
          </DetailedList.Row>

          <DetailedList.Row>
            <DetailedList.Item
              label='Skype'
              value={<SkypeField skypeId={skype} />}
            />
            <DetailedList.Item
              label='Approved'
              value={userDateFormatter(activatedAt)}
            />
          </DetailedList.Row>

          <DetailedList.Row>
            <DetailedList.Item
              label='Current Country'
              value={location?.country?.name}
            />
            <DetailedList.Item label='Last Login'>
              {ipLocation && timeZone && (
                <LastLoginField
                  dateTime={userDateTimeFormatter(currentSignInAt)}
                  ip={currentSignInIp}
                  ipLocation={ipLocation}
                />
              )}
            </DetailedList.Item>
          </DetailedList.Row>

          <DetailedList.Row>
            <DetailedList.Item label='Time Zone' value={timeZone?.name} />
            <DetailedList.Item
              label='Last Edited'
              value={userDateFormatter(updatedAt)}
            />
          </DetailedList.Row>

          <DetailedList.Row>
            <DetailedList.Item label='Teams'>
              {teams?.nodes.length ? (
                <Teams teams={teams} staffId={staffId} />
              ) : undefined}
            </DetailedList.Item>
          </DetailedList.Row>
        </DetailedList>
      </Container>
    </Section>
  )
}

export default StaffListItem
