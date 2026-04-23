import { Maybe } from '@staff-portal/graphql/staff'

export const urlActions = ['details', 'downloadPdfUrl', 'downloadHtmlUrl']
export interface GetHref {
  option: string
  downloadHtmlUrl?: Maybe<string>
  downloadPdfUrl?: Maybe<string>
  webResource?: Maybe<{ url?: Maybe<string> }>
}

export const getHref = ({
  option,
  downloadHtmlUrl,
  downloadPdfUrl,
  webResource
}: GetHref) => {
  switch (option) {
    case 'downloadHtmlUrl':
      return downloadHtmlUrl

    case 'downloadPdfUrl':
      return downloadPdfUrl

    case 'details':
      return webResource?.url || ''

    default:
      return undefined
  }
}
