import React from 'react'
import { Container, SkeletonLoader, Section } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'

const displayName = 'MemorandumsSkeleton'

const MemorandumsSkeleton = () => {
  const { t: translate } = useTranslation('memorandum')

  return (
    <>
      <Section title={translate('allocated.title')}>
        <Container bottom='medium' top='xsmall'>
          <SkeletonLoader.Typography rows={2} />
        </Container>
      </Section>
      <Section title={translate('associated.title')}>
        <Container bottom='medium' top='xsmall'>
          <SkeletonLoader.Typography rows={2} />
        </Container>
      </Section>
    </>
  )
}

MemorandumsSkeleton.displayName = displayName

export default MemorandumsSkeleton
