import React, { useMemo } from 'react'
import { NO_VALUE } from '@staff-portal/config'

import { DraftJobFragment } from '../../DraftJobSection/data/draft-job-fragment'
import TagGroup from '../TagGroup'

const DraftJobContentSkills = ({
  draftJob
}: {
  draftJob: DraftJobFragment
}) => {
  const {
    vertical: { talentType },
    verticals: { edges: verticals }
  } = draftJob

  const skills = useMemo(
    () =>
      verticals
        .find(edge => edge.node.talentType === talentType)
        ?.skillSets.nodes.map(({ skillName }) => ({ skillName })),
    [verticals, talentType]
  )

  if (!skills?.length) {
    return <>{NO_VALUE}</>
  }

  return <TagGroup items={skills} data-testid='skill-pill-link' />
}

export default DraftJobContentSkills
