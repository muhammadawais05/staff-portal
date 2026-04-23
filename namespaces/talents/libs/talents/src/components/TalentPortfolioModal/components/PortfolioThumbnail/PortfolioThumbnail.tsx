import React from 'react'
import { Container } from '@toptal/picasso'
import {
  TalentPortfolioFileImage,
  TalentPortfolioFilePdf
} from '@staff-portal/graphql/staff'
import { ImageWithLoader } from '@staff-portal/ui'

import * as S from './styles'
import { isPdf } from '../../utils'
import DocumentThumbnail from '../DocumentThumbnail'

export type File = TalentPortfolioFileImage | TalentPortfolioFilePdf

type PortfolioThumbnailProps = {
  file: File
  isActive: boolean
  onThumbnailSelect: (file: File) => void
}

const getThumbnail = (file: File, isActive: boolean) =>
  isPdf(file) ? (
    <DocumentThumbnail file={file} isActive={isActive} />
  ) : (
    <ImageWithLoader
      src={file.image.thumbUrl || ''}
      alt={file.title || ''}
      data-testid='portfolio-image-thumbnail'
    />
  )

const PortfolioThumbnail = ({
  file,
  isActive,
  onThumbnailSelect
}: PortfolioThumbnailProps) => {
  if (!file) {
    return null
  }

  const handleClick = () => {
    onThumbnailSelect(file)
  }

  return (
    <Container
      right='xsmall'
      left='xsmall'
      css={S.thumbnailContainer(isActive, isPdf(file))}
      onClick={handleClick}
      data-testid={`portfolio-thumbnail${isActive ? ':active' : ''}`}
    >
      {getThumbnail(file, isActive)}
    </Container>
  )
}

export default PortfolioThumbnail
