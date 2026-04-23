import { useQuery } from '@staff-portal/data-layer-service'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { Button } from '@toptal/picasso'
import { SectionWithDetailedListSkeleton } from '@staff-portal/ui'
import React from 'react'

import { GetTeamInfoDocument } from './data/get-team-info/get-team-info.staff.gql.types'
import { useGetTeamIdParam } from './services/use-get-team-id-param/use-get-team-id-param'
import TeamInformationSection from './containers/TeamInformationSection/TeamInformationSection'

const TeamProfile = () => {
  const { teamId } = useGetTeamIdParam()
  const { data, loading } = useQuery(GetTeamInfoDocument, {
    variables: {
      teamId
    }
  })

  const {
    name: teamName,
    manager,
    ability,
    coreTeam,
    roles,
    emailTracking,
    escalationPath
  } = data?.node || {}

  return (
    <ContentWrapper
      title={teamName}
      titleLoading={loading}
      actions={
        <Button variant='positive' size='small'>
          Add Members
        </Button>
      }
    >
      {loading ? (
        <SectionWithDetailedListSkeleton
          title='Team Info'
          labelColumnWidth={10}
          striped
          columns={2}
          items={7}
        />
      ) : (
        <TeamInformationSection
          manager={manager}
          roles={roles || { totalCount: 0 }}
          coreTeam={coreTeam}
          ability={ability}
          emailTracking={emailTracking}
          escalationPath={escalationPath}
        />
      )}
    </ContentWrapper>
  )
}

export default TeamProfile
