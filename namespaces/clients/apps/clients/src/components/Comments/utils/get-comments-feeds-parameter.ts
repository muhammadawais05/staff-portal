import { decodeEntityId, encodeGid } from '@staff-portal/data-layer-service'

const getCommentsFeedsParameter = (companyId: string) => {
  const { type, id } = decodeEntityId(companyId)

  return [[encodeGid(type, id)], ['client_screening']]
}

export default getCommentsFeedsParameter
