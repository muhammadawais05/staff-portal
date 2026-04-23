const P2P_TYPENAME = 'P2PRequest'
const PUBLICATION_GIG_TYPENAME = 'PublicationGig'

export const mapGigIdToP2P = (gigId: string): string => {
  const [, type, id] = window.atob(gigId).split('-')

  return type === PUBLICATION_GIG_TYPENAME && id
    ? window.btoa(`V1-${P2P_TYPENAME}-${id}`).replace(/=+/, '')
    : gigId
}

export const mapP2PIdToGig = (p2pId: string): string => {
  const [, type, id] = window.atob(p2pId).split('-')

  return type === P2P_TYPENAME && id
    ? window.btoa(`V1-${PUBLICATION_GIG_TYPENAME}-${id}`).replace(/=+/, '')
    : p2pId
}
