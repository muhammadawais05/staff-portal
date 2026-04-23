import React, { useMemo } from 'react'
import { NO_VALUE } from '@staff-portal/config'

import { DraftJobFragment } from '../../DraftJobSection/data/draft-job-fragment'
import TagGroup from '../TagGroup'

const DraftJobContentIndustries = ({
  draftJob
}: {
  draftJob: DraftJobFragment
}) => {
  const { industries } = draftJob

  const tagItems = useMemo(
    () => industries?.nodes.map(({ name }) => ({ skillName: name })),
    [industries]
  )

  if (!tagItems?.length) {
    return <>{NO_VALUE}</>
  }

  return <TagGroup items={tagItems} data-testid='industry-pill-link' />
}

export default DraftJobContentIndustries
