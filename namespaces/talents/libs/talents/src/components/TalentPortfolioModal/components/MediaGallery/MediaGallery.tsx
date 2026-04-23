import React from 'react'
import { Container } from '@toptal/picasso'
import { PortfolioItemFileImage } from '@staff-portal/graphql/staff'
import { ImageWithLoader } from '@staff-portal/ui'

import PortfolioThumbnail, {
  File
} from '../PortfolioThumbnail/PortfolioThumbnail'
import PdfDocument from '../PdfDocument'
import * as S from './styles'
import { isPdf } from '../../utils'

type Props = {
  files?: File[] | null
  onSelectMedia: (file: File) => void
  currentMedia: File
}

const getMainImageUrl = (file: PortfolioItemFileImage) =>
  file.image.optimizedUrl || file.image.originalUrl

const getMainContent = (file?: File) => {
  if (!file) {
    return
  }

  return isPdf(file) ? (
    <PdfDocument file={file} />
  ) : (
    <ImageWithLoader
      src={getMainImageUrl(file)}
      alt={file.title || ''}
      data-testid='portfolio-main-image'
    />
  )
}

const MediaGallery = ({ files, onSelectMedia, currentMedia }: Props) => {
  if (!files || !currentMedia) {
    return null
  }

  return (
    <Container flex padded='medium' css={S.galleryContainer} direction='column'>
      <Container css={S.mainImageContainer}>
        {getMainContent(currentMedia)}
      </Container>
      <Container css={S.thumbnailsContainer}>
        <Container flex justifyContent='center' css={S.thumbnailsWrapper}>
          {files.map((file, index) => (
            <PortfolioThumbnail
              file={file}
              isActive={currentMedia.id === file?.id}
              onThumbnailSelect={onSelectMedia}
              // No unique id
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            />
          ))}
        </Container>
      </Container>
    </Container>
  )
}

export default MediaGallery
