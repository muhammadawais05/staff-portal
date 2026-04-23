import { Container, SkeletonLoader } from '@toptal/picasso'
import React from 'react'

const EmailPreviewContentLoader = () => {
  return (
    <>
      <SkeletonLoader.Header />
      <SkeletonLoader.Typography rows={4} />
      <Container flex direction='column'>
        <SkeletonLoader.Header />
        <SkeletonLoader.Header />
      </Container>
    </>
  )
}

export default EmailPreviewContentLoader
