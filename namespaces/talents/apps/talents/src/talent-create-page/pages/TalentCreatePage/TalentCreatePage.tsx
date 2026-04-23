import React, { useMemo } from 'react'
import { Section } from '@toptal/picasso'
import { Redirect, useQueryParams } from '@staff-portal/navigation'
import ContentWrapper from '@staff-portal/page-wrapper'
import { isOperationEnabled } from '@staff-portal/operations'
import { getDashboardPath } from '@staff-portal/routes'

import {
  TalentCreateFormSkeletonLoader,
  TalentCreateForm
} from '../../components'
import { useGetVerticalOperations, useGetViewerPermits } from './data'
import { getTalentTypeTitle } from '../../services'
import { TalentTypes } from '../../constants'

const TalentCreatePage = () => {
  const [{ _talent, topscreen_position }] = useQueryParams({
    _talent: 'string',
    topscreen_position: 'string'
  })

  const talentType = getTalentTypeTitle(_talent)
  const { verticals, loading: areVerticalOperationsLoading } =
    useGetVerticalOperations()
  const { permits, loading: arePermitsLoading } = useGetViewerPermits()

  const vertical = useMemo(
    () => verticals?.find(({ name }) => name === talentType),
    [talentType, verticals]
  )

  const verticalOperation = useMemo(() => {
    const operations = vertical?.operations

    return vertical?.name === TalentTypes.TOP_SCREEN
      ? operations?.createTopscreenTalent
      : operations?.createCommonTalent
  }, [vertical?.name, vertical?.operations])

  const loading = areVerticalOperationsLoading || arePermitsLoading

  if (!loading && !isOperationEnabled(verticalOperation)) {
    return <Redirect to={getDashboardPath()} />
  }

  const title = vertical ? `Add ${vertical.name}` : undefined

  return (
    <ContentWrapper title={title} browserTitle={title}>
      <Section variant='bordered'>
        {!loading && vertical ? (
          <TalentCreateForm
            verticalId={vertical.id}
            talentType={vertical.name}
            topScreenPosition={topscreen_position}
            permits={permits}
          />
        ) : (
          <TalentCreateFormSkeletonLoader />
        )}
      </Section>
    </ContentWrapper>
  )
}

export default TalentCreatePage
