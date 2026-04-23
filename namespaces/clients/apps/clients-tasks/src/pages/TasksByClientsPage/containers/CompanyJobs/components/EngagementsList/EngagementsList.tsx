import React from 'react'

import EngagementListItem from '../EngagementsListItem/EngagementListItem'
import { ClientJobEngagementFragment } from '../../data/get-client-jobs.staff.gql.types'

interface Props {
  engagements: ClientJobEngagementFragment[]
}

const EngagementsList = ({ engagements }: Props) => (
  <>
    {engagements.map(engagement => (
      <EngagementListItem key={engagement.id} engagement={engagement} />
    ))}
  </>
)

export default EngagementsList
