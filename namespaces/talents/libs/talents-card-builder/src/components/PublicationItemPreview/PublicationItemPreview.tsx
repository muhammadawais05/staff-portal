import { Image } from '@toptal/picasso'
import React from 'react'

import { ProfilePublication } from '../../types'
import GraduateCap from '../../assets/images/graduate-cap.svg'
import CommunityExperienceItem from '../CommunityExperienceItem'

interface PublicationItemProps {
  item: ProfilePublication
}

const PublicationItemPreview = ({ item }: PublicationItemProps) => {
  return (
    <CommunityExperienceItem
      icon={<Image alt='Graduation cap icon' src={GraduateCap} />}
      topText={`${item.title} (Publication)`}
      bottomText={item.url}
    />
  )
}

export default PublicationItemPreview
