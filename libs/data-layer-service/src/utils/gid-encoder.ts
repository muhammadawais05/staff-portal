export const encodeGid = (type: string, id: string, host = 'platform') =>
  `gid://${host}/${type}/${id}`

export const decodeGid = (gid: string) => {
  const splitGid = gid.split('/')

  return { host: splitGid[2], type: splitGid[3], id: splitGid[4] }
}
