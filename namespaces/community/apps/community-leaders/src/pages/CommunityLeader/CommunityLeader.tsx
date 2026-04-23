import React, { useState } from 'react'
import { Link, useParams } from '@staff-portal/navigation'
import { Avatar, Breadcrumbs, Container, Tabs, Tag } from '@toptal/picasso'
import { DEBOUNCE_LIMIT } from '@staff-portal/config'
import { RoutePath } from '@staff-portal/routes'
import { PersistentFormProvider } from '@staff-portal/forms'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import {
  useGetCommunityLeader,
  CommunityLeaderHeader,
  CommunityLeaderListSkeletonLoader,
  CommunityLeaderNotesTab,
  CommunityLeaderProfileTab,
  CommunityLeaderApplicationsHistory,
  CommunityLeaderSection,
  CommunityLeaderEvents,
  getCommunityLeaderRole
} from '@staff-portal/community-leaders'

type Tab = 'profile' | 'notes' | 'applications-history' | 'events'

// eslint-disable-next-line complexity
const CommunityLeader = () => {
  const [tab, setTab] = useState<Tab>('profile')
  const { id } = useParams<{ id: string }>()

  const {
    data: { communityLeader, basicLeaderInfo },
    loading
  } = useGetCommunityLeader({ id })

  const handleTabChange = (
    _: React.ChangeEvent<{}>,
    newValue: string | number | boolean
  ) => {
    setTab(newValue as Tab)
  }

  const role = getCommunityLeaderRole(communityLeader)

  const hasRoleFlags =
    !!role && !!role.roleFlags && role?.roleFlags.nodes.length !== 0

  return (
    <PersistentFormProvider debounceLimit={DEBOUNCE_LIMIT}>
      <Container top='medium'>
        <Breadcrumbs>
          <Breadcrumbs.Item
            as={Link}
            href={RoutePath.CommunityLeaders}
            active={false}
          >
            Community Leaders
          </Breadcrumbs.Item>
        </Breadcrumbs>
      </Container>
      <ContentWrapper title='Community Leader'>
        <Container top='large' bottom='large'>
          {loading && <CommunityLeaderListSkeletonLoader amount={1} />}
          {communityLeader && (
            <Container rounded>
              <CommunityLeaderSection
                header={
                  <CommunityLeaderHeader
                    communityLeader={communityLeader}
                    actions={null}
                  />
                }
                content={
                  <Container flex direction='column' padded='medium'>
                    <Container flex alignItems='center' bottom='small'>
                      <Container>
                        <Avatar
                          size='small'
                          name={basicLeaderInfo?.fullName}
                          src={role?.photo?.default || undefined}
                          testIds={{
                            wrapper: 'CommunityLeaderHeader-avatar'
                          }}
                        />
                      </Container>
                      {hasRoleFlags && (
                        <Container left='medium'>
                          <Tag.Group>
                            {role?.roleFlags?.nodes.map(({ flag }, index) => (
                              // eslint-disable-next-line react/no-array-index-key
                              <Tag key={index}>{flag.title}</Tag>
                            ))}
                          </Tag.Group>
                        </Container>
                      )}
                    </Container>
                    <Tabs value={tab} onChange={handleTabChange}>
                      <Tabs.Tab label='Profile' value='profile' />
                      <Tabs.Tab label='Notes' value='notes' />
                      <Tabs.Tab label='Events' value='events' />
                      <Tabs.Tab
                        label='Applications History'
                        value='applications-history'
                      />
                    </Tabs>
                    {tab === 'profile' && (
                      <CommunityLeaderProfileTab
                        communityLeaderId={id}
                        communityLeader={communityLeader}
                        communityLeaderBasicInfo={basicLeaderInfo}
                      />
                    )}
                    {tab === 'notes' && (
                      <CommunityLeaderNotesTab
                        communityLeaderId={id}
                        communityLeader={communityLeader}
                      />
                    )}
                    {tab === 'applications-history' && (
                      <Container top='large'>
                        <CommunityLeaderApplicationsHistory
                          communityLeaderId={id}
                        />
                      </Container>
                    )}
                    {tab === 'events' && (
                      <Container top='large'>
                        <CommunityLeaderEvents communityLeaderId={id} />
                      </Container>
                    )}
                  </Container>
                }
              />
            </Container>
          )}
        </Container>
      </ContentWrapper>
    </PersistentFormProvider>
  )
}

CommunityLeader.displayName = 'CommunityLeader'

export default CommunityLeader
