import React, { useEffect, useRef } from 'react'
import { Redirect, useLocation, useParams } from '@staff-portal/navigation'
import ContentWrapper from '@staff-portal/page-wrapper'
import { hasAuthorizationError } from '@staff-portal/data-layer-service'
import { getDashboardPath } from '@staff-portal/routes'
import { Container } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import { PLAYBOOK_TEMPLATE_UPDATED } from './messages'
import { useGetPlaybook } from './data/get-playbook.staff.gql'
import PlaybookTemplateCard from './components/PlaybookTemplateCard/PlaybookTemplateCard'
import { PlaybookSkeletonLoader } from './components'

const Playbook = () => {
  const { identifier: playbookIdentifier } = useParams<{ identifier: string }>()

  const { data, error, refetch, loading } = useGetPlaybook(playbookIdentifier)

  useMessageListener(PLAYBOOK_TEMPLATE_UPDATED, () => refetch())

  const scrollPlaybookRef = useRef<HTMLDivElement>(null)
  const { hash } = useLocation()

  useEffect(() => {
    const scrollElement = scrollPlaybookRef.current

    if (scrollElement) {
      scrollElement.scrollIntoView({ block: 'end', behavior: 'smooth' })
    }
  }, [data, hash])

  if (hasAuthorizationError(error, 'playbook')) {
    return <Redirect to={getDashboardPath()} />
  }

  if (!data && loading) {
    return <PlaybookSkeletonLoader />
  }

  return (
    <ContentWrapper title={`${data?.label} Playbook`}>
      <Container data-testid='playbook-content-wrapper-page'>
        {data?.templates?.nodes.map(item => (
          <PlaybookTemplateCard
            playbookTemplate={item}
            key={item.identifier}
            ref={hash === `#${item.identifier}` ? scrollPlaybookRef : null}
          />
        ))}
      </Container>
    </ContentWrapper>
  )
}

export default Playbook
