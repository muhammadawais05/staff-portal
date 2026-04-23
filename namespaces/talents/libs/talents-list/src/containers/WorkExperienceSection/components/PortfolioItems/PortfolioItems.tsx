import React, { useState } from 'react'
import { Container, Grid } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Talent } from '@staff-portal/graphql/staff'
import {
  Vertical,
  TalentPortfolioModal,
  TalentWorkExperiencePortfolioItemFragment
} from '@staff-portal/talents'

import PortfolioItemWithImage from '../PortfolioItemWithImage/PortfolioItemWithImage'
import PortfolioItem from '../PortfolioItem/PortfolioItem'

interface Props {
  portfolioItems?: TalentWorkExperiencePortfolioItemFragment[]
  loading?: boolean
  talentType: Talent['type']
  talentName: string
  talentId: string
}

const PortfolioItems = ({
  portfolioItems,
  talentType,
  talentName,
  talentId
}: Props) => {
  const [selectedItem, setSelectedItem] =
    useState<TalentWorkExperiencePortfolioItemFragment>()
  const { showModal } = useModal(TalentPortfolioModal, {
    startProjectId: selectedItem?.id,
    talentName,
    talentId
  })

  if (!portfolioItems) {
    return null
  }

  const talentRole = talentType
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase() as Vertical
  const hasTalentDesignerRole = talentRole === Vertical.DESIGNER
  const hasTalentFinanceExpertRole = talentRole === Vertical.FINANCE_EXPERT

  const handleClick = (item: TalentWorkExperiencePortfolioItemFragment) => {
    setSelectedItem(item)
    showModal()
  }

  if (hasTalentDesignerRole || hasTalentFinanceExpertRole) {
    return (
      <Container>
        <Grid wrap='wrap'>
          {portfolioItems.map(item => (
            <PortfolioItemWithImage
              item={item}
              hasTalentDesignerRole={hasTalentDesignerRole}
              key={item.id}
              onClick={() => handleClick(item)}
            />
          ))}
        </Grid>
      </Container>
    )
  }

  return (
    <Container>
      {portfolioItems.map(item => (
        <PortfolioItem item={item} key={item.id} />
      ))}
    </Container>
  )
}

export default PortfolioItems
