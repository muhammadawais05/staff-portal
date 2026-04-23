import { Typography, Container } from '@toptal/picasso'
import React from 'react'

import { ProfilePortfolioItem } from '../../types'
import {
  ORIGINAL_IMAGE_HEIGHT,
  ORIGINAL_IMAGE_WIDTH
} from '../../constants/portfolioImage'
import ActionIcon from '../ActionIcon'
import * as S from './styles'

interface PortfolioItemProps {
  item: ProfilePortfolioItem
  variant?: Variant
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

type Variant =
  | 'preview'
  | 'default'
  | 'default-hovered'
  | 'highlighted'
  | 'highlighted-hovered'

const PortfolioItemTile = ({
  item,
  variant = 'preview',
  onClick: handleClick,
  onMouseEnter: handleMouseEnter,
  onMouseLeave: handleMouseLeave
}: PortfolioItemProps) => {
  const hasCoverImage = item.coverImage != null

  return (
    <Container
      css={[S.tile, hasCoverImage ? null : S.tileWithPlaceholder]}
      onClick={handleClick}
      className={variant}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Container forwardedAs='span' css={S.title(hasCoverImage)} className='item-title'>
        <Typography size='large' invert>
          {item.title}
        </Typography>
      </Container>

      {Boolean(handleClick) && variant !== 'preview' && (
        <Container forwardedAs='span' css={S.action}>
          <ActionIcon state={variant} />
        </Container>
      )}

      {item.coverImage ? (
        <img
          css={S.image}
          data-testid='coverImage'
          src={item.coverImage}
          width={ORIGINAL_IMAGE_WIDTH}
          height={ORIGINAL_IMAGE_HEIGHT}
        />
      ) : (
        <div css={S.imagePlaceholder} />
      )}
    </Container>
  )
}

export default PortfolioItemTile
