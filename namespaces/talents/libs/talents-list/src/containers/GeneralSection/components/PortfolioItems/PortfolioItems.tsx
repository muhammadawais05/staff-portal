import React, { useMemo, useState } from 'react'
import { Container, Image, Tooltip } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { TalentPortfolioModal } from '@staff-portal/talents'

import * as S from './styles'
import { useGetTalentItemPortfolioItems } from './data/get-talent-item-portfolio-items/get-talent-item-portfolio-items.staff.gql'

interface Props {
  talentName: string
  talentId: string
}

const PortfolioItems = ({ talentName, talentId }: Props) => {
  const [selectedItem, setSelectedItem] = useState('')
  const { showModal } = useModal(TalentPortfolioModal, {
    startProjectId: selectedItem,
    talentName,
    talentId
  })
  const { data: portfolioItems } = useGetTalentItemPortfolioItems({ talentId })

  const portfolioItemsList = useMemo(
    () => portfolioItems?.slice(0, 5),
    [portfolioItems]
  )

  if (!portfolioItems?.length) {
    return null
  }

  const handleClick = (id: string) => {
    setSelectedItem(id)
    showModal()
  }

  return (
    <Container flex>
      {portfolioItemsList?.map(
        ({ id, title, coverPhoto }, index, array) =>
          coverPhoto && (
            <Tooltip content={title} key={id}>
              <Container css={S.imageContainer}>
                <Image
                  key={id}
                  alt={title}
                  src={coverPhoto?.thumbUrl || ''}
                  css={[S.image, index === array.length - 1 && S.lastImage]}
                  onClick={() => handleClick(id)}
                  data-testid='portfolio-image-general-section'
                />
              </Container>
            </Tooltip>
          )
      )}
    </Container>
  )
}

export default PortfolioItems
