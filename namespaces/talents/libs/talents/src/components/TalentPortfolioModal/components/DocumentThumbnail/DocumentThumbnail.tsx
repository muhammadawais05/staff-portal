import React from 'react'
import {
  Container,
  Folder24,
  NumericalAnalysis24,
  Page24,
  PieChart24,
  WhitePaper24,
  TypographyOverflow
} from '@toptal/picasso'
import {
  TalentPortfolioFilePdf,
  TalentPortfolioFilePdfPrimaryContentType
} from '@staff-portal/graphql/staff'

import * as S from './styles'

const getDocumentIcon = (
  primaryContentType: TalentPortfolioFilePdf['primaryContentType']
) => {
  switch (primaryContentType) {
    case TalentPortfolioFilePdfPrimaryContentType.PRESENTATION:
      return PieChart24

    case TalentPortfolioFilePdfPrimaryContentType.NUMERICAL_ANALYSIS:
      return NumericalAnalysis24

    case TalentPortfolioFilePdfPrimaryContentType.WHITE_PAPER:
      return WhitePaper24

    case TalentPortfolioFilePdfPrimaryContentType.PROJECT_PLAN:
      return Page24

    default:
      return Folder24
  }
}

export type Props = {
  file: Pick<TalentPortfolioFilePdf, 'title' | 'primaryContentType'>
  isActive?: boolean
}

const DocumentThumbnail = ({ file, isActive }: Props) => {
  const DocumentIcon = getDocumentIcon(file.primaryContentType)

  return (
    <Container
      flex
      justifyContent='center'
      css={S.documentFileContainer}
      padded='xsmall'
    >
      <DocumentIcon color={isActive ? 'blue' : 'black'} />
      <TypographyOverflow size='xsmall'>{file.title}</TypographyOverflow>
    </Container>
  )
}

export default DocumentThumbnail
