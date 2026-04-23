import { Container } from '@toptal/picasso'
import React from 'react'

import { PreviewProfileContent } from '../../types'
import TagListPreview from '../../components/TagListPreview'
import { getSectionTitle } from '../../constants'
import PortfolioListPreview from '../PortfolioListPreview'
import HighlightsPreview from '../HighlightsPreview/HighlightsPreview'

interface PreviewProps {
  fullName: string
  roleType: string | null
  sortable?: boolean
  values: PreviewProfileContent
}

const Preview = ({
  fullName,
  roleType,
  sortable = true,
  values
}: PreviewProps) => {
  const skills = values.skills.map(skill => {
    return {
      id: skill.id,
      name: skill.skill.name,
      experience: skill.experience
    }
  })

  const industries = values.industries.map(industry => {
    return { id: industry.industry.id, name: industry.industry.name }
  })

  return (
    <Container data-testid='talentCardPreview'>
      <TagListPreview
        title='Skills'
        data={skills}
        sortable={sortable}
        sortableKey='skills'
        testId='skillItemPreview'
      />
      <TagListPreview
        testId='industryItemPreview'
        title='Industries'
        sortable={sortable}
        sortableKey='industries'
        data={industries}
      />

      <HighlightsPreview
        fullName={fullName}
        highlights={values.highlights}
        sortable={sortable}
      />

      <PortfolioListPreview
        title={getSectionTitle('portfolio', roleType)}
        sortable={sortable}
        data={values.portfolio}
      />
    </Container>
  )
}

export default Preview
