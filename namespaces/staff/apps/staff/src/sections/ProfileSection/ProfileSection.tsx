import React from 'react'
import { Section, Avatar, Container } from '@toptal/picasso'
import { ContainerLoader, DetailedListSkeleton } from '@staff-portal/ui'
import { AddRoleFlagButton } from '@staff-portal/role-flags'
import { ProfileHeader } from '@staff-portal/facilities'

import { AccountOverview } from './components'
import { useStaffContext } from '../../context/StaffContext'

type Props = {
  loading: boolean
  initialLoading: boolean
}

const ProfileSection = ({ loading, initialLoading }: Props) => {
  const { staffProfile } = useStaffContext()

  return (<Section
    title='Account Overview'
    variant='withHeaderBar'
    actions={
      staffProfile && (
        <AddRoleFlagButton
          roleId={staffProfile.id}
          fullName={staffProfile.fullName}
          operation={staffProfile.operations.addRoleFlag}
        />
      )
    }
  >
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <DetailedListSkeleton
          labelColumnWidth={12}
          columns={1}
          items={15}
          data-testid='profile-section-loader'
        />
      }
    >
      {staffProfile && (
        <Container>
          <Container bottom='small'>
            <ProfileHeader id={staffProfile.id}>
              <Avatar
                size='small'
                name={staffProfile.fullName}
                src={staffProfile.photo?.default || undefined}
              />
            </ProfileHeader>
          </Container>
          <AccountOverview />
        </Container>
      )}
    </ContainerLoader>
  </Section>
  )
}

export default ProfileSection
