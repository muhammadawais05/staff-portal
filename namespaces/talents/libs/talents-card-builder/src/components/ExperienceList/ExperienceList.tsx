import { Section } from '@toptal/picasso'
import React, { useCallback } from 'react'

import {
  ExperienceSelectionItem,
  ProfileExperience,
  ProfilePublication
} from '../../types'
import ExperienceItem from '../ExperienceItem'
import MentorProgramItem from '../MentorProgramItem'
import PublicationItem from '../PublicationItem'

export interface ExperienceListProps {
  value: ExperienceSelectionItem[]
  experiences: ProfileExperience[]
  title: string
  talentId: string
  approvedMentor: boolean
  fullName: string
  publications: ProfilePublication[]
  toggleItem: (item: ExperienceSelectionItem) => void
}

const ExperienceList = ({
  title,
  value,
  toggleItem,
  experiences,
  fullName,
  approvedMentor,
  publications,
  talentId
}: ExperienceListProps) => {
  const toggleExperienceItem = useCallback(
    (id: string) => toggleItem({ type: 'portfolio', id }),
    [toggleItem]
  )

  const toggleMentorship = useCallback(
    () => toggleItem({ type: 'mentorship', id: talentId }),
    [talentId, toggleItem]
  )

  const togglePublication = useCallback(
    (id: string) => {
      const publication = publications.find(pub => pub.id === id)

      if (publication) {
        toggleItem({ type: 'publication', id })
      }
    },
    [publications, toggleItem]
  )

  if (
    experiences.length === 0 &&
    !approvedMentor &&
    publications.length === 0
  ) {
    return null
  }

  const selectedPortfolio = value
    .filter(item => item.type === ('portfolio' as const))
    .map(item => item.id)
  const selectedPublications = value
    .filter(item => item.type === ('publication' as const))
    .map(item => item.id)
  const mentorship =
    value.filter(item => item.type === ('mentorship' as const)).length > 0

  return (
    <Section title={title}>
      {experiences.map(item => (
        <ExperienceItem
          key={item.id}
          item={item}
          highlighted={selectedPortfolio.includes(item.id)}
          toggle={toggleExperienceItem}
        />
      ))}
      {approvedMentor && (
        <MentorProgramItem
          fullName={fullName}
          highlighted={mentorship}
          toggle={toggleMentorship}
        />
      )}
      {publications.map(item => (
        <PublicationItem
          key={item.id}
          item={item}
          highlighted={selectedPublications.includes(item.id)}
          toggle={togglePublication}
        />
      ))}
    </Section>
  )
}

export default ExperienceList
