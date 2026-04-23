import React from 'react'
import { Section, Avatar, Container } from '@toptal/picasso'
import { ContainerLoader, DetailedListSkeleton } from '@staff-portal/ui'
import { AddRoleFlagButton } from '@staff-portal/role-flags'
import { ProfileHeader } from '@staff-portal/facilities'
import { RepresentativeFragment } from '@staff-portal/client-representatives'

import ProfileDetails from './components/ProfileDetails/ProfileDetails'
import ProfileHeaderSkeleton from './components/ProfileHeaderSkeleton/ProfileHeaderSkeleton'

type Props = {
  representative?: RepresentativeFragment
  loading: boolean
  initialLoading: boolean
}

const ProfileSection = ({ loading, initialLoading, representative }: Props) => {
  const actions = representative ? (
    <Container flex>
      <AddRoleFlagButton
        roleId={representative.id}
        fullName={representative.fullName}
        operation={representative.operations.addRoleFlag}
      />
    </Container>
  ) : null

  return (
    <Section title='Contact Profile' variant='withHeaderBar' actions={actions}>
      <ContainerLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <>
            <ProfileHeaderSkeleton />
            <Container top='medium'>
              <DetailedListSkeleton
                labelColumnWidth={12}
                columns={1}
                items={15}
                data-testid='profile-section-loader'
              />
            </Container>
          </>
        }
      >
        {representative && (
          <>
            <ProfileHeader id={representative?.id}>
              <Avatar
                size='small'
                name={representative.fullName}
                src={representative.photo?.small || ''}
              />
            </ProfileHeader>

            <Container top='medium'>
              <ProfileDetails representative={representative} />
            </Container>
          </>
        )}
      </ContainerLoader>
    </Section>
  )
}

export default ProfileSection
