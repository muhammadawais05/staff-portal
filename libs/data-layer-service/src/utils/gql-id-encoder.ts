// Util function to encode/decode url-safe base64 string in V1-TypeName-dbId format
// More details on GQL identifiers can be found
// https://toptal-core.atlassian.net/wiki/spaces/ENG/pages/396296322/GraphQL+Guidelines+for+frontend-backend+communication#IDs

const unescape = (str: string) => {
  return (str + '==='.slice((str.length + 3) % 4))
    .replace(/-/g, '+')
    .replace(/_/g, '/')
}

const escape = (str: string) => {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

export const decodeEntityId = (gqlId: string): { type: string; id: string } => {
  const splitId = atob(unescape(gqlId)).split('-')

  if (splitId.length !== 3) {
    throw new Error('Unexpected format of the GQL id: ' + gqlId)
  }

  const [, type, id] = splitId

  return { type, id }
}

export type SchemaVersionPrefix = 'V1'

export const encodeEntityId = (
  id: string,
  prefixEntityType: string,
  prefixVersion: SchemaVersionPrefix = 'V1'
): string => escape(btoa(`${prefixVersion}-${prefixEntityType}-${id}`))
