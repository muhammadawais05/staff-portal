import React from 'react'
import { Section, Container } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { DetailedListSkeleton, ContainerLoader } from '@staff-portal/ui'
import { CLIENT_UPDATED } from '@staff-portal/clients'

import { useGetInternalTeam } from './data/get-internal-team-data.staff.gql'
import InternalTeam from './components/InternalTeam'

const InternalTeamSection = ({ companyId }: { companyId: string }) => {
  const { data, initialLoading, loading, refetch } =
    useGetInternalTeam(companyId)

  // TODO: remove message listener, once the problem would be investigated
  // https://toptal-core.atlassian.net/browse/SPB-2852
  useMessageListener(
    [CLIENT_UPDATED],
    ({ companyId: id }) => companyId === id && refetch()
  )

  return (
    <Container top='medium'>
      <Section
        title='Internal Team'
        data-testid='internal-team-section'
        variant='withHeaderBar'
      >
        <ContainerLoader
          loading={loading}
          showSkeleton={initialLoading}
          skeletonComponent={
            <DetailedListSkeleton
              labelColumnWidth={10}
              columns={2}
              items={30}
            />
          }
        >
          {data && <InternalTeam data={data} />}
        </ContainerLoader>
      </Section>
    </Container>
  )
}

export default InternalTeamSection
