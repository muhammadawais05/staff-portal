import React, { useState, ReactNode } from 'react'
import {
  Typography,
  Container,
  Switch,
  Section,
  Info16,
  Tooltip
} from '@toptal/picasso'

import { SkillPair } from '../../types'
import * as S from './styles'
import ItemSkeletonLoader from '../../components/ItemSkeletonLoader/ItemSkeletonLoader'
import { useGigsContext } from '../../contexts/gig-candidates-context'
import EmploymentItem from './components/EmploymentItem/EmploymentItem'
import ProjectItem from './components/ProjectItem/ProjectItem'
import { useGetCandidateProfile } from './data/get-candidate-profile/get-candidate-profile.staff.gql'

export interface Props {
  talentId: string
  talentSkills?: SkillPair[]
}

const ItemsList = ({
  title,
  emptyState,
  loading,
  items
}: {
  title: string
  emptyState: string
  loading: boolean
  items: ReactNode[]
}) => {
  if (loading) {
    return (
      <>
        <ItemSkeletonLoader />
        <ItemSkeletonLoader />
      </>
    )
  }

  return (
    <>
      <Container bottom='small'>
        <Typography variant='heading' size='small'>
          {title}
        </Typography>
      </Container>
      {items.length > 0 ? (
        items
      ) : (
        <Typography size='medium'>{emptyState}</Typography>
      )}
    </>
  )
}

const TalentProfileSection = ({ talentId, talentSkills }: Props) => {
  const [onlyMatchingSkills, setOnlyMatchingSkills] = useState(false)
  const { selectedSkills } = useGigsContext()

  const { data, loading } = useGetCandidateProfile({
    talentId
  })

  const employments = data?.profile?.employments.nodes
    ? data?.profile?.employments.nodes.filter(
        employment =>
          !onlyMatchingSkills ||
          employment.skills.nodes.find(skill =>
            selectedSkills?.find(
              selectedSkill => selectedSkill.name === skill.name
            )
          )
      )
    : []

  const projects = data?.profile?.portfolioItems.nodes
    ? data?.profile?.portfolioItems.nodes.filter(
        project =>
          !onlyMatchingSkills ||
          project.skills.nodes.find(skill =>
            selectedSkills?.find(
              selectedSkill => selectedSkill.name === skill.name
            )
          )
      )
    : []

  return (
    <Section
      title={
        <Container flex alignItems='center'>
          <Container right='xsmall'>
            <Typography weight='semibold' color='black'>
              Talent Profile Information
            </Typography>
          </Container>
          <Tooltip content='Provided by talent when joining the Toptal Network'>
            <Typography data-testid='talent-profile-icon'>
              <Info16 />
            </Typography>
          </Tooltip>
        </Container>
      }
      actions={
        <Container
          css={S.filter}
          flex
          onClick={() => setOnlyMatchingSkills(!onlyMatchingSkills)}
        >
          <Typography size='small' color='dark-grey'>
            Only matching searched skills
          </Typography>
          <Switch checked={onlyMatchingSkills} />
        </Container>
      }
    >
      <Container>
        <ItemsList
          title='Employments'
          emptyState='There are no employments to display'
          loading={loading}
          items={employments.map(employment => (
            <EmploymentItem
              employment={employment}
              key={employment.id}
              talentSkills={talentSkills}
            />
          ))}
        />
      </Container>
      <Container top='small'>
        <ItemsList
          title='Projects'
          emptyState='There are no projects to display'
          loading={loading}
          items={projects.map(project => (
            <ProjectItem
              project={project}
              key={project.id}
              talentSkills={talentSkills}
            />
          ))}
        />
      </Container>
    </Section>
  )
}

export default TalentProfileSection
