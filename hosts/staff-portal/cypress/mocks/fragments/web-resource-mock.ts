import { WebResource } from '@staff-portal/graphql/staff'

export const webResourceMock = (
  node?: Partial<WebResource['webResource']>
): WebResource =>
  ({
    webResource: {
      text: 'Web Resource Text',
      url: 'https://example.com',
      __typename: 'Link',
      ...node
    }
  } as WebResource)
