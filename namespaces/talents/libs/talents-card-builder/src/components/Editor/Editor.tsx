import { Container } from '@toptal/picasso'
import React from 'react'

import { ProfileContent } from '../../types'
import { getSectionTitle } from '../../constants'
import CertificationListField from '../CertificationListField'
import EducationListField from '../EducationListField'
import EmploymentListField from '../EmploymentListField'
import ExperienceListField from '../ExperienceListField'
import PortfolioListField from '../PortfolioListField'
import TagListField from '../TagListField'

export type EditorContentProps = {
  talentId: string
  fullName: string
  roleType: string | null
  content: ProfileContent
}

const SKILLS_MAX_LIMIT = 15
const SKILLS_MAX_LIMIT_WARNING = `You cannot add more than ${SKILLS_MAX_LIMIT} skills.`

const Editor = React.memo(
  ({ fullName, content, roleType, talentId }: EditorContentProps) => {
    const skills = content.skills.map(skill => {
      return { id: skill.id, name: skill.skill.name }
    })

    const industries = content.industries.map(industry => {
      return { id: industry.industry.id, name: industry.industry.name }
    })

    return (
      <Container data-testid='talentCardEditor'>
        <TagListField
          name='highlights.skills'
          data={skills}
          testId='skillItem'
          title='Skills'
          maxLimit={SKILLS_MAX_LIMIT}
          maxLimitWarning={SKILLS_MAX_LIMIT_WARNING}
        />
        <TagListField
          name='highlights.industries'
          data={industries}
          testId='industryItem'
          title='Industries'
        />
        <EmploymentListField
          name='highlights.items'
          data={content.employments}
        />
        <ExperienceListField
          name='highlights.items'
          title={getSectionTitle('experience', roleType)}
          experiences={content.experience}
          approvedMentor={content.mentorship}
          talentId={talentId}
          fullName={fullName}
          publications={content.publications}
        />
        <PortfolioListField
          name='highlights.portfolio'
          title={getSectionTitle('portfolio', roleType)}
          data={content.portfolio}
        />
        <EducationListField name='highlights.items' data={content.educations} />
        <CertificationListField
          name='highlights.items'
          data={content.certifications}
        />
      </Container>
    )
  }
)

export default Editor
