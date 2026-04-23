import React from 'react'
import ContentWrapper from '@staff-portal/page-wrapper'
import { Container, SkeletonLoader } from '@toptal/picasso'

import { PlaybookTemplateCardSkeletonLoader } from '..'

const PlaybookSkeletonLoader = () => (
  <ContentWrapper
    title={<SkeletonLoader.Typography />}
    browserTitle='Playbooks'
  >
    <Container data-testid='playbook-content-skeleton-loader'>
      {[...Array(3)].map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <PlaybookTemplateCardSkeletonLoader key={index} />
      ))}
    </Container>
  </ContentWrapper>
)

export default PlaybookSkeletonLoader
