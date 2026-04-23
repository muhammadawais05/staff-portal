import React, { memo } from 'react'
import { Container, EmptyState } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { NO_VALUE } from '@staff-portal/config'
import { getTimeZoneFullText } from '@staff-portal/date-time-utils'
import { DetailedList } from '@staff-portal/ui'
import { ApplicationInfoField, getRoleTypeText } from '@staff-portal/facilities'
import {
  useUserDateFormatter,
  useUserDateTimeFormatter
} from '@staff-portal/current-user'
import { OFACStatusField } from '@staff-portal/ofac-compliance'
import {
  AccountField,
  LastLoginField,
  OtherRolesField,
  PhoneField,
  SkypeField,
  SlackField,
  SpokenLanguagesField
} from '@staff-portal/role-profile'

import { TalentCommunityLeaderField } from '../TalentCommunityLeaderField'
import { useGetStaffGeneralData } from '../../data/get-staff-general-data/get-staff-general-data.staff.gql'
import { CommunityLeaderData, CommunityLeaderBasicInfo } from '../../types'
import CommunityLeaderProfileSkeletonLoader from './CommunityLeaderProfileSkeletonLoader'
import { getCommunityLeaderRole } from '../../services/get-community-leader-role'
import CommunityLeaderUpdateField from '../CommunityLeaderUpdateField'

interface Props {
  communityLeaderId: string
  communityLeader: CommunityLeaderData
  communityLeaderBasicInfo: CommunityLeaderBasicInfo
}

const StaffTab = ({
  communityLeaderId,
  communityLeader,
  communityLeaderBasicInfo
}: Props) => {
  const { data: staff, loading } = useGetStaffGeneralData({
    id: communityLeaderId
  })

  const userDateFormatter = useUserDateFormatter()
  const userDateTimeFormatter = useUserDateTimeFormatter()

  if (loading) {
    return <CommunityLeaderProfileSkeletonLoader />
  }

  if (!staff) {
    return (
      <Container top='large'>
        <EmptyState.Collection>
          Could not get community leader profile
        </EmptyState.Collection>
      </Container>
    )
  }

  const {
    id,
    type,
    email,
    fullName,

    slackContacts,
    phoneContacts,
    skypeContacts,

    locationV2,
    cityDescription,
    timeZone,
    citizenship,

    activatedAt,

    currentSignInAt,
    currentSignInIp,
    ipLocation,
    ofacStatus,
    visualComplianceStatus,
    otherRoles,

    languages,

    unallocatedMemorandum,
    applicationInfo
  } = staff

  const role = getCommunityLeaderRole(communityLeader)

  return (
    <Container top='small'>
      {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
      <DetailedList
        defaultValue={NO_VALUE}
        labelColumnWidth={11}
        // eslint-disable-next-line complexity, max-lines-per-function
        items={applyListStyle => [
          {
            label: 'Profile type',
            value: applyListStyle(
              <Link href={role?.webResource.url ?? ''}>
                {getRoleTypeText(type)}
              </Link>
            )
          },
          {
            label: 'Email',
            value: applyListStyle(<Link href={`mailto:${email}`}>{email}</Link>)
          },
          {
            label: 'Slack',
            value: applyListStyle(<SlackField slackContacts={slackContacts} />)
          },
          {
            label: 'Phone',
            value: applyListStyle(
              <PhoneField roleId={id} phoneContacts={phoneContacts} />
            )
          },
          {
            label: 'Skype',
            value:
              skypeContacts.nodes[0]?.value &&
              applyListStyle(
                <SkypeField skypeId={skypeContacts.nodes[0]?.value} />
              )
          },
          {
            label: 'Other roles',
            value: <OtherRolesField otherRoles={otherRoles?.nodes} />,
            hidden: otherRoles?.nodes.length === 0
          },
          {
            label: 'Community Leader',
            value: (
              <TalentCommunityLeaderField
                communityLeaderData={communityLeader}
                communityLeaderBasicInfo={communityLeaderBasicInfo}
                id={communityLeaderId}
                name={fullName}
                viewMode='staff'
              />
            ),
            hidden: !communityLeader
          },
          {
            label: 'Community Leader Type',
            value: (
              <CommunityLeaderUpdateField
                communityLeaderData={communityLeader}
              />
            ),

            hidden: !communityLeader?.node
          },
          {
            label: 'Community Leader Requested At',
            value: userDateFormatter(
              communityLeader?.application?.createdAt ??
                communityLeader?.node?.requestedAt
            ),
            hidden: !communityLeader
          },
          {
            label: 'Comments About Application',
            value: communityLeader?.application?.performerComment,
            hidden: !communityLeader?.application?.performerComment
          },
          {
            label: 'Twitter',
            value: undefined
          },
          { label: 'Current country', value: locationV2?.countryName },
          { label: 'Current city', value: cityDescription },
          { label: 'Time zone', value: getTimeZoneFullText(timeZone) },
          { label: 'Citizenship', value: citizenship?.name },
          {
            label: 'Approved',
            value: activatedAt ? userDateFormatter(activatedAt) : null
          },
          {
            label: 'Last login',
            value:
              ipLocation &&
              applyListStyle(
                <LastLoginField
                  dateTime={userDateTimeFormatter(currentSignInAt)}
                  ip={currentSignInIp}
                  ipLocation={ipLocation}
                />
              )
          },

          {
            label: 'Origin',
            value: applicationInfo?.webResource.url
              ? applyListStyle(<ApplicationInfoField entityId={id} />)
              : null
          },
          {
            label: 'Spoken languages',
            value: applyListStyle(
              <SpokenLanguagesField languages={languages?.nodes || []} />
            )
          },
          {
            label: 'Account',
            value: applyListStyle(
              <AccountField unallocatedMemorandum={unallocatedMemorandum} />
            )
          },
          {
            label: 'OFAC status',
            value: (
              <OFACStatusField
                ofacStatus={ofacStatus}
                visualComplianceStatus={visualComplianceStatus}
              />
            )
          }
        ]}
      />
    </Container>
  )
}

export default memo(StaffTab)
