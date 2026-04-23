import { TalentPortfolioFilePdf } from '@staff-portal/graphql/staff'

import { File } from './components/PortfolioThumbnail/PortfolioThumbnail'

export const isPdf = (document: File): document is TalentPortfolioFilePdf =>
  document?.contentType === 'application/pdf'
