import { ClientOption } from '../ClientMultiSelector'

export const convertClientToItem = (client: ClientOption) => ({
  value: client.id,
  text: client.fullName
})
